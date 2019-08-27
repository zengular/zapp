import Brick from "zengular/core/brick"

import "./style.less";

@Brick.renderOnConstruct(false)
@Brick.addClass('phong-window')
export default class Window extends Brick{

	constructor(root){
		super(root);
		this.title = '';
	}

	setupWindow(args, screen){
		this.screen = screen;
		return this.render(args).then(()=>this.setupScreen());
	}

	setupScreen(){
		this.screen.header.title = this.title;
		this.screen.header.leftbutton = null;
		this.screen.header.rightbutton = null;
	}
}