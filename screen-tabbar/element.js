import Brick from "zengular/core/brick";
import twig  from "./template.twig";
import "./style.less";

import Screen from "zengular/phong/screen/element";

/**
 * @property {Array} buttons
 * @property {Screen} screen
 */
@Brick.register('phong-screen-tabbar', twig)
export default class ScreenTabbar extends Brick {

	onInitialize() {
		this.buttons = [];
	}

	clear() {
		this.buttons = [];
		this.root.innerHTML = '';
	}

	addButton(text, event = '', selected = false, data = null) {
		this.buttons.push({text, event, selected, data});

		let button = document.createElement('button');
		if (selected) {
			button.classList.add('selected');
			if (selected) button.setAttribute('disabled', 'disabled');
		}
		button.dataset.index = this.buttons.length.toString();
		button.innerHTML = text;
		this.root.appendChild(button);
		button.addEventListener('click', () => this.screen.windowManager.window.fire(event, data));
	}

	selectButton(index, disable = true) {
		this.$('button.selected').each(btn => btn.classList.remove('selected'));
		this.$(`button[data-index="${index}"]`).first(btn => btn.classList.add('selected'));
		if (disable) this.disableButton(index)
	}

	disableButton(index) { this.$(`button[data-index="${index}"]`).first(btn => btn.setAttribute('disabled', 'disabled'));}

	enableButton(index = null) {
		if (index === null) this.$(`button`).each(btn => btn.removeAttribute('disabled'));
		else this.$(`button[data-index="${index}"]`).first(btn => btn.removeAttribute('disabled'));
	}

}
