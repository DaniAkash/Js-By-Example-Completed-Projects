import './general';

class Status {
  constructor() {
    this.$experienceTab = document.querySelector('#experienceTab');
    this.$professionTab = document.querySelector('#professionTab');
    this.$ageTab = document.querySelector('#ageTab');

    this.$ageCanvas = document.querySelector('#ageChart');
    this.$professionCanvas = document.querySelector('#professionChart');
    this.$experienceCanvas = document.querySelector('#experienceChart');

    this.$loadingIndicator = document.querySelector('#loadingIndicator');
    this.$tabArea = document.querySelector('#tabArea');
    this.$chartArea = document.querySelector('#chartArea');

    this.statisticData;
  }

}
