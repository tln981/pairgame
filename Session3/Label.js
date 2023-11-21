import { Node } from "./Node.js";
export class Label extends Node{
    constructor(text,fontSize=50,color='black'){
        super();
        this._text=text;
        this._fontSize=fontSize;
        this._color=color;
        this.element=this._createElement()
        this._visibility='';
    }
    get text(){return this._text}
    set text(value){
        this._text=value;
        this.element.innerHTML=this.text;
    }
    get fontSize(){return this._fontSize}
    set fontSize(value){
        this._fontSize=value;
        this.element.fontSize=this._fontSize+'px';
    }
    get color(){return this._color}
    set color(value){
        this._color=value;
        this.element.color=this._color;
    }
    get visibility(){return this._visibility}
    set visibility(value){
        this._visibility=value;
        this.element.style.visibility=this._visibility;
    }
    _createElement(){
        let element=document.createElement('div');
        element.style.position='absolute';
        element.style.left=this._positionX+'px';
        element.style.top=this._positionY+'px';
        element.innerHTML=this._text;
        element.style.fontSize=this._fontSize+'px';
        element.style.color=this._color;
        return element;
    }


}