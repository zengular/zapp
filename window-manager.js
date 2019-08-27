import Screen from "zengular/phong/screen/element";
import Window from "zengular/phong/window/element"

/**
 * @property {Screen} screen
 * @property {Array} history
 * @property {Window} window
 */
export default class WindowManager{

	constructor(screen){
		this.screen = screen;
		this.history = [];
		this.window = null;
	}


	prev(movement = null){
		if(movement === null) movement = 'right';
		this.history.pop();
		let historyItem = this.history.pop();
		if(historyItem){
			this.show(historyItem.Window, historyItem.args, movement);
			this.window.scrollTop = historyItem.scrollTop; // TODO: let it work
			return true;
		}else{
			return false;
		}
	}

	/**
	 *
	 * @param {typeof Window} Window
	 * @param args
	 * @param movement
	 * @param resethistory
	 */
	show(Window, args, movement = null, resethistory = false){
		if(movement === null) movement = 'left';
		if(resethistory) this.windowHistory = [];
		let outClass = movement === 'left' ? 'out-left' : 'out-right';
		let inClass = movement === 'left' ? 'out-right' : 'out-left';

		if(this.window){
			if(this.history.length) this.history[this.history.length - 1].scrollTop = this.window.scrollTop;
			this.window.classList.add(outClass);
			let offWindow = this.window;
			setTimeout(() => {this.screen.windowContainer.removeChild(offWindow);}, 700);
		}

		let window = Window.create('div', true);
		/** @type {Window} */
		let windowController = window.controller;
		windowController.setupWindow(args, this.screen);
		window.classList.add(inClass);
		this.screen.windowContainer.appendChild(window);
		this.history.push({Window, args});
		this.window = window;
		setTimeout(() => window.classList.remove(inClass), 100);
	}

}