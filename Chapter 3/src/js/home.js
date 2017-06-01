import './general';

class Home {
  constructor() {
    this.$form = document.querySelector('#registrationForm');
    this.$username = document.querySelector('#username');
    this.$email = document.querySelector('#email');
    this.$phone = document.querySelector('#phone');
    this.$age = document.querySelector('#age');
    this.$profession = document.querySelector('#profession');
    this.$experience = document.querySelector('#experience');
    this.$comment = document.querySelector('#comment');
    this.$submit = document.querySelector('#submit');
    this.$loadingIndicator = document.querySelector('#loadingIndicator');

    this.$form.addEventListener('submit', event => {
      this.onFormSubmit(event);
    });
  }

  getFormValues() {
    return {
      username: this.$username.value,
      email: this.$email.value,
      phone: this.$phone.value,
      age: this.$age.value,
      profession: this.$profession.value,
      experience: this.$experience.value,
      comment: this.$comment.value,
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const formValues = this.getFormValues();
  }


}

window.addEventListener("load", () => {
  new Home();
});
