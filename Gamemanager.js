import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";
import { Label } from "./Label.js";
import { Tween } from "./Tween.js";

let stackCard=[];
let game = new Node();
let animationController=new Tween()
let countResult=0;
let pointValue=10000;
createCard(game);
game.childrenSprite.forEach((card)=>card.element.addEventListener('click',openCard));
//game.shuffleCard();
let point=new Label("$"+pointValue);
point.positionX=1050;
point.positionY=5;
game.addChildLabel(point);
game.draw();
 animationController.distributeCard(game.childrenSprite);


function openCard() {
    let currentCard = game.childrenSprite.find((card) => card.element == this);
    animationController.flip(currentCard);
    if (stackCard.length == 0) {
        stackCard.push(currentCard);
    } else {
        let previousCard = game.childrenSprite.find((card) => card == stackCard[0]);
        if (previousCard.srcResult != currentCard.srcResult) {
            setTimeout(() => {
                animationController.flipOff(currentCard,previousCard);
            }, 500)
            pointValue-=500;
            if(pointValue<=0){
                point.visibility='hidden';
                let message = new Label('Bạn đã thua', 50, "red");
                message.positionX = 100;
                message.positionY = 300;
                message.draw()
            }
        } else {
            if (currentCard === previousCard) {
                animationController.flipOff(currentCard,previousCard);
                pointValue-=500;
            } else {
                setTimeout(() => {
                    animationController.zoomOut(currentCard,previousCard);
                }, 500)
                countResult++;
                pointValue+=1000;
            }
        }
        stackCard.pop();
    }
    point.text="$"+pointValue;
    if(countResult==10){
        point.visibility='hidden';
        let message=new Label('Bạn đã hoàn thành trò chơi với số điểm '+pointValue,50,"red");
        message.positionX=100;
        message.positionY=300;
        message.draw()
    }
    
}
function createCard(game) {
    let paramPositionX = 0;
    let paramPositionY = -1;
    for (let indexCard = 0; indexCard < 20; indexCard++) {
        paramPositionX = indexCard % 5;
        paramPositionY = indexCard % 5 === 0 ? paramPositionY + 1 : paramPositionY;
        let card = new Sprite((145 * paramPositionX) + 10, (paramPositionY * 165) + 5, './assets/cover.jpg');
        card.srcResult = "./assets/" + Math.floor(indexCard / 2) + ".jpg";
        game.addChildSprite(card);
    }
}