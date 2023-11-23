import { GameController } from "./Gamemanager.js";
let fileImages=['./assets/0.jpg','./assets/1.jpg','./assets/2.jpg','./assets/3.jpg','./assets/4.jpg','./assets/5.jpg','./assets/6.jpg','./assets/7.jpg','./assets/8.jpg','./assets/9.jpg','./assets/cover.jpg','./assets/BackGround.jpg',]


function preloadImages(urls) {
    const images = [];
    for (let i = 0; i < urls.length; i++) {
        const img = new Image();
        img.src = urls[i];
        images.push(img);
    }
    return images;
}
let game=new GameController();
const preloadedImages = preloadImages(fileImages,() => {
    game.createCard();
  });
game.createCard();