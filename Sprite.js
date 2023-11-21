import { Node } from "./Node.js";
export class Sprite extends Node{
    constructor(x,y,src){
        super();
        this._positionX=x;
        this._positionY=y;
        this._src=src;
        this._srcResult='';
        this._visibility='';
        this._scaleX=1;
        this._scaleY=1;
        this._active=true;
        this._width=140;
        this._height=160;
        this.element=this._createElement();
        
    }
    get visibility(){return this._visibility}
    set visibility(value){
        this._visibility=value;
        this.element.style.visibility=this._visibility;
    }
    get srcResult(){return this._srcResult}
    set srcResult(value){
        this._srcResult=value;
    }
    get scaleX(){return this._scaleX}
    set scaleX(value){
        this._scaleX=value;
        this.element.style.transform=`scaleX(${this._scaleX})`;
    }
    get scaleY(){return this._scaleY}
    set scaleY(value){
        this._scaleY=value;
        this.element.style.transform=`scaleY(${this._scaleY})`;
    }
    get active(){return this._active}
    set active(value){
        this._active=value;
        this.element.src = value?this._src:this._srcResult;
    }
    draw(){
        document.body.appendChild(this.element);
    }
}