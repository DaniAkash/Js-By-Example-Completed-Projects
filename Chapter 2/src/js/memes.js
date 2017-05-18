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
    let context = this.$canvas.getContext('2d');

    if (this.$imageInput.files && this.$imageInput.files[0]) {
      console.log('cool');
    }
  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    let inputNodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];

    inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
    inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
  }

}

new Memes();
