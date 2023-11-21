export class Tween {

    flip(object) {
        const duration = 0.5;
        gsap.to(object, { scaleX: 0, duration, onComplete: () => object.active = false });
        gsap.to(object, { scaleX: 1, duration, delay: duration });

    }
    flipOff(object1, object2) {
        const duration = 0.5;
        gsap.to(object1, { scaleX: 0, duration, delay: duration * 2, onComplete: () => object1.active = true });
        gsap.to(object1, { scaleX: 1, duration, delay: duration * 3 });
        gsap.to(object2, { scaleX: 0, duration, delay: duration * 2, onComplete: () => object2.active = true });
        gsap.to(object2, { scaleX: 1, duration, delay: duration * 3 });
    }

    zoomOut(object1, object2) {
        const duration = 0.5;
        object1.element.style.zIndex = "999";
        object2.element.style.zIndex = "999";
        gsap.to(object1.element, { scale: 2, opacity: 0, duration, delay: duration * 2, onComplete: () => object1.visibility = 'hidden' });
        gsap.to(object2.element, { scale: 2, opacity: 0, duration, delay: duration * 2, onComplete: () => object2.visibility = 'hidden' });

    }

    distributeCard(cards){
        const duration = 0.2;
        cards.forEach((card,index) => {
            let tempX=card.positionX;
            let tempY=card.positionY;
            card.positionX=300;
            card.positionY=300;
            gsap.to(card, { positionX: tempX, positionY:tempY , duration, delay: duration * (index+1) });
            gsap.to(card.element,{rotation :720, duration, delay: duration * (index+1) });
        });
    }
}