import Brick from "zengular/core/brick";
import twig  from "./template.twig";
import "./style.less";
import Screen from "zengular/phong/screen/element";

/**
 * @property {Screen} screen
 */
@Brick.register('phong-screen-header', twig)
export default class ScreenHeader extends Brick{

	constructor(root){
		super(root);
		this.buttonEvents = {
			left : {
				event: null,
				data : null
			},
			right: {
				event: null,
				data : null
			}
		};
	}

	onRender(){
		['left', 'right'].forEach(button => {
			this.root.querySelector('.button-' + button).addEventListener('click', () => {
				let btn = this.buttonEvents[button];
				if(btn.event !== null) this.screen.windowManager.window.fire(btn.event, btn.data, true);
			});
		});
	}

	set title(title){
		let subtitle = "";
		if(typeof title !== 'string'){
			subtitle = title.subtitle;
			title = title.title;
		}
		let inactive = this.root.querySelector('h1 div.inactive');
		let active = this.root.querySelector('h1 div:not(.inactive)');
		if(active.innerHTML !== title || active.dataset.subtitle !== subtitle){
			inactive.innerHTML = title;
			inactive.dataset.subtitle = subtitle;
			inactive.classList.remove('inactive');
			active.classList.add('inactive');
		}
	}

	set leftbutton(icon){ this.setbutton(icon, 'left'); }

	set rightbutton(icon){ this.setbutton(icon, 'right'); }

	setbutton(params, button){

		var icon;
		var event = 'phong.header.button.' + button + '.click';
		var data = null;

		if(typeof params === 'string'){
			icon = params;
		}else if(params === null){
			icon = null;
			event = null;
		}else if(typeof params === 'object'){
			icon = params.icon;
			if(typeof params.event !== "undefined") event = params.event;
			if(typeof params.data !== "undefined") data = params.data;
		}

		this.buttonEvents[button].event = event;
		this.buttonEvents[button].data = data;

		let buttonClass = '.button-' + button;
		let btn = this.root.querySelector(buttonClass);
		let inactive = btn.querySelector('i.inactive');
		let active = btn.querySelector('i:not(.inactive)');

		if(!active || active.className !== icon){
			if(active) active.classList.add('inactive');
			inactive.className = icon;
			if(icon !== null){
				btn.classList.remove('hidden');
			}else{
				btn.classList.add('hidden');
			}
		}
	}

}
