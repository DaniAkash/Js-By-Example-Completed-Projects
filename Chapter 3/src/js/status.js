import './general';
import apiCall from './services/api/apiCall';

import Chart from 'chart.js';

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

    this.$errorMessage = document.querySelector('#loadingError');

    this.statisticData;
    this.loadData();
  }

  loadData() {
    apiCall('statistics')
      .then(response => {
        this.statisticData = response;

        this.$loadingIndicator.classList.add('hidden');
        this.$tabArea.classList.remove('hidden');
        this.$chartArea.classList.remove('hidden');
      })
      .catch(() => {
        this.$loadingIndicator.classList.add('hidden');
        this.$errorMessage.classList.remove('hidden');
      });
  }

}

window.addEventListener("load", () => {
  new Status();
});
