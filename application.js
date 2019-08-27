import Screen        from "zengular/phong/screen/element";
import WindowManager from "zengular/phong/window-manager";
import ZengularApplication   from "zengular/core/application";
import "zengular/phong/style/style.less";

/**
 * @property {Screen} screen
 * @property {WindowManager} windowManager
 */
export default class Application extends ZengularApplication{

	constructor(run = true){
		super(false);
		document.body.replaceWith(document.createElement('body'));
		var screenNode = Screen.create('div', true);
		this.screen = screenNode.controller;
		this.windowManager = this.screen.windowManager;
		document.body.appendChild(screenNode);
		if(run) this.run();
	}

}