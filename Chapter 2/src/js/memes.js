import './general';

const deviceWidth = window.innerWidth;

class Memes {
  constructor() {
      this.$canvas = document.querySelector('#imgCanvas');
      this.$topTextInput = document.querySelector('#topText');
      this.$bottomTextInput = document.querySelector('#bottomText');
      this.$imageInput = document.querySelector('#image');
      this.$downloadButton = document.querySelector('#downloadMeme');

      this.createCanvas();
      this.addEventListeners();
  }

  createCanvas() {
    let canvasHeight = Math.min(480, deviceWidth-30);
    let canvasWidth = Math.min(640, deviceWidth-30);

    this.$canvas.height = canvasHeight;
    this.$canvas.width = canvasWidth;
  }

  createMeme() {
    console.log('rendered');
  }

  addEventListeners() {
    let inputNodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];

    inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
    inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
  }

}

new Memes();
