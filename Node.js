
export class Node {
    constructor() {
        this._positionX = 0;
        this._positionY = 0;
        this._src = './assets/BackGround.jpg';
        this._width = 1280;
        this._height = 720;
        this.element = this._createElement();
        this.childrenSprite = [];
        this.childrenLabel = [];
    }
    get positionX() { return this._positionX }
    set positionX(value) {
        this._positionX = value;
        this.element.style.left = this._positionX + 'px';
    }
    get positionY() { return this._positionY }
    set positionY(value) {
        this._positionY = value;
        this.element.style.top = this._positionY + 'px';
    }
    get width() { return this._width }
    set width(value) {
        this._width = value;
        this.element.style.width = this._width + 'px';
    }
    get height() { return this._height }
    set height(value) {
        this._height = value;
        this.element.style.height = this._height + 'px';
    }
    get src() { return this._src }
    set src(value) {
        this._src = value;
        this.element.src = this._src;
    }



    addChildSprite(childNode) {
        this.childrenSprite.push(childNode);
    }

    removeChildSprite(childNode) {
        const index = this.childrenSprite.indexOf(childNode);
        if (index !== -1) {
            document.body.removeChild(childNode.element)
            this.childrenSprite.splice(index, 1);
        }
    }

    addChildLabel(childNode) {
        this.childrenLabel.push(childNode);
    }

    removeChildLabel(childNode) {
        const index = this.childrenLabel.indexOf(childNode);
        if (index !== -1) {
            this.childrenLabel.splice(index, 1);
        }
    }
    _createElement() {
        let element = document.createElement('img');
        element.style.position = 'absolute';
        element.src = this._src;
        element.style.left = this._positionX + 'px';
        element.style.top = this._positionY + 'px';
        element.style.width = this._width + 'px';
        element.style.height = this._height + 'px';
        return element;
    }
    shuffleCard() {
        let valueCards = ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9']
        this.childrenSprite.forEach(card => {
            const randomCard = +Math.floor(Math.random() * valueCards.length)
            card.srcResult = "./assets/" + valueCards[randomCard] + ".jpg";
            valueCards.splice(randomCard, 1);
            //card.active=false;
        });
    }
    draw() {
        document.body.appendChild(this.element);
    }
}
