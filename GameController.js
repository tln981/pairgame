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
        this.point=this.createPoint();
        this.start=this.createStartGame();
        this.preplay=this.creatReplay();
        this.message=this.createMessage();
    }
    createCard() {
        this.isStart=false;
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
        this.animationController.distributeCard(this.game.childrenSprite);
        this.draw();
        setTimeout(() => {
            this.isStart = true;
        }, 4300)
    }

    openCard(event) {
        if (this.isStart == true) {
            let currentCard = this.game.childrenSprite.find((card) => card.element == event.currentTarget);
            this.animationController.flip(currentCard);
            if (this.stackCard.length == 0) {
                this.stackCard.push(currentCard);
            } else {
                this.isStart = false;
                let previousCard = this.game.childrenSprite.find((card) => card == this.stackCard[0]);
                if (previousCard.srcResult != currentCard.srcResult) {
                    setTimeout(() => {
                        this.animationController.flipOff(currentCard, previousCard);
                    }, 500)
                    setTimeout(() => {
                        this.isStart = true;
                    }, 2000)
                    this.pointValue -= 500;
                    if (this.pointValue <= 0) {
                        this.point.visibility = 'hidden';
                        this.message.visibility='';
                        this.message.text='Bạn đã thua thua!!!';
                        this.message.element.style.zIndex="999";
                        this.message.draw()
                    }
                } else {
                    if (currentCard === previousCard) {
                        this.animationController.flipOff(currentCard, previousCard);
                        setTimeout(() => {
                            this.isStart = true;
                        }, 2000)
                        this.pointValue -= 500;
                    } else {
                        setTimeout(() => {
                            this.animationController.zoomOut(currentCard, previousCard);
                        }, 500)
                        setTimeout(() => {
                            this.isStart = true;
                        }, 2000)
                        this.countResult++;
                        this.pointValue += 1000;
                    }
                }
                this.stackCard.pop();
            }
            this.point.text = "$" + this.pointValue;
            if (this.countResult == 10) {
                this.point.visibility = 'hidden';
                this.message.visibility='';
                this.message.text='Bạn đã hoàn thành trò chơi với số điểm ' + this.pointValue;
                this.message.element.style.zIndex="999";
                this.message.draw()
            }
        }
    }
    createPoint(){
        let point = new Label("$" + this.pointValue);
        point.positionX = 1050;
        point.positionY = 5;
        point.visibility='hidden';
        //this.game.addChildLabel(point);
        return point;
    }
    createStartGame(){
        let labelStartGame = new Label("STAR GAME",50,"rgb(255,254,189)");
        labelStartGame.positionX = 550;
        labelStartGame.positionY = 360;
        labelStartGame.element.style.cursor="pointer";
        labelStartGame.element.addEventListener('click',(event) =>this.startGame(event));
        return labelStartGame;
    }
    createMessage(){
        let labelMessage = new Label("q",50,"red");
        labelMessage.positionX = 100;
        labelMessage.positionY = 300;
        labelMessage.visibility='hidden';
        return labelMessage;
    }
    
    startGame(event){
        this.game.childrenSprite.forEach(card=>{
            this.game.removeChildSprite(card);
        })
        this.start.visibility='hidden';
        this.point.visibility='';
        this.preplay.visibility='';
        this.createCard();
        this.draw();
    }
    creatReplay(){
        let labelPrePlay = new Label("REPLAY",50);
        labelPrePlay.positionX = 550;
        labelPrePlay.positionY = 660;
        labelPrePlay.visibility='hidden'
        labelPrePlay.element.style.cursor="pointer";
        labelPrePlay.element.addEventListener('click',(event) =>this.replayGame(event));
        return labelPrePlay;
    }
    replayGame(event){
        console.log(this);
        if (this.isStart == true) {
            this.stackCard=[];
            this.countResult = 0;
            this.pointValue = 10000;
            this.isStart=false;
            this.message.visibility='hidden';
            this.animationController.collectCard(this.game.childrenSprite);
            this.point.text="$" + this.pointValue;
            setTimeout(()=>{this.startGame()},2500);
            this.draw();
        }
    }
    draw(){
        document.body.appendChild(this.game.element);
        document.body.appendChild(this.start.element);
        document.body.appendChild(this.point.element);
        document.body.appendChild(this.preplay.element);
        document.body.appendChild(this.message.element);
        this.game.childrenSprite.forEach(child => { child.draw() });
        this.game.childrenLabel.forEach(child => { child.draw() });
    }
}