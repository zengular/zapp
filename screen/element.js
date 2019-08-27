import Brick         from "zengular/core/brick";
import twig          from "./template.twig";
import "./style.less";

import ScreenHeader from "zengular/phong/screen-header/element";
import ScreenTabbar from "zengular/phong/screen-tabbar/element";
import WindowManager from "zengular/phong/window-manager";

/**
 * @property {WindowManager} windowManager
 * @property {ScreenHeader} header
 * @property {ScreenTabbar} tabbar
 */
@Brick.registerSubBricksOnRender()
@Brick.register('phong-screen', twig)
export default class Screen extends Brick {

	onInitialize() {
		this.windowManager = new WindowManager(this);
	}

	onRender() {
		this.windowContainer = this.$$('window-container').node;
		this.header = this.$$('header').node.controller;
		this.header.screen = this;
		this.tabbar = this.$$('tabbar').node.controller;
		this.tabbar.screen = this;
		this.overlay = this.$$('overlay').node;
	}

	set title(value) { this.header.title = value; }
	set rightbutton(value) { this.header.rightbutton = value; }
	set leftbutton(value) { this.header.leftbutton = value; }

	showHeader() {this.root.classList.add('header');}
	hideHeader() {this.root.classList.remove('header');}
	showTabBar(clear = true) {
		if (clear) this.tabbar.clear();
		this.root.classList.add('footer');
	}

	hideTabBar() {this.root.classList.remove('footer');}

	showOverlay() {this.overlay.classList.add('visible');}
	hideOverlay() {this.overlay.classList.remove('visible');}
}
