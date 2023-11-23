import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";
import { Label } from "./Label.js";
import { Tween } from "./Tween.js";

export class GameController {
    constructor() {
        this.stackCard = [];
        this.game = new Node();
        this.animationController = new Tween()
        this.countResult = 0;
        this.pointValue = 10000;
        this.isStart = false;
    }


    createCard() {
        let paramPositionX = 0;
        let paramPositionY = -1;
        for (let indexCard = 0; indexCard < 20; indexCard++) {
            paramPositionX = indexCard % 5;
            paramPositionY = indexCard % 5 === 0 ? paramPositionY + 1 : paramPositionY;
            let card = new Sprite((145 * paramPositionX) + 10, (paramPositionY * 165) + 5, './assets/cover.jpg');
            card.srcResult = "./assets/" + Math.floor(indexCard / 2) + ".jpg";
            this.game.addChildSprite(card);
        }
        this.game.childrenSprite.forEach((card) => card.element.addEventListener('click', (event) => this.openCard(event)));
        //this.game.shuffleCard();
        let point = new Label("$" + this.pointValue);
        point.positionX = 1050;
        point.positionY = 5;
        this.game.addChildLabel(point);
        this.game.draw();
        this.animationController.distributeCard(this.game.childrenSprite,this.isStart);
        setTimeout(() => {
            this.isStart = true;
        }, 4200)
    }

    openCard(event) {
        if (this.isStart == true) {
            let currentCard = this.game.childrenSprite.find((card) => card.element == event.currentTarget);
            this.animationController.flip(currentCard);
            if (this.stackCard.length == 0) {
                this.stackCard.push(currentCard);
            } else {
                this.isStart=false;
                let previousCard = this.game.childrenSprite.find((card) => card == this.stackCard[0]);
                if (previousCard.srcResult != currentCard.srcResult) {
                    setTimeout(() => {
                        this.animationController.flipOff(currentCard, previousCard);
                    }, 500)
                    setTimeout(() => {
                        this.isStart=true;
                    }, 2000)
                    this.pointValue -= 500;
                    if (this.pointValue <= 0) {
                        this.point.visibility = 'hidden';
                        let message = new Label('Bạn đã thua thua!!!', 50, "red");
                        message.positionX = 100;
                        message.positionY = 300;
                        message.draw()
                    }
                } else {
                    if (currentCard === previousCard) {
                        this.animationController.flipOff(currentCard, previousCard);
                        setTimeout(() => {
                            this.isStart=true;
                        }, 2000)
                        this.pointValue -= 500;
                    } else {
                        setTimeout(() => {
                            this.animationController.zoomOut(currentCard, previousCard);
                        }, 500)
                        setTimeout(() => {
                            this.isStart=true;
                        }, 2000)
                        this.countResult++;
                        this.pointValue += 1000;
                    }
                }
                this.stackCard.pop();
            }
            this.game.childrenLabel[0].text = "$" + this.pointValue;
            if (this.countResult == 10) {
                point.visibility = 'hidden';
                let message = new Label('Bạn đã hoàn thành trò chơi với số điểm ' + this.pointValue, 50, "red");
                message.positionX = 100;
                message.positionY = 300;
                message.draw()
            }
        }
    }
}









