import '../css/styles.css';

window.addEventListener('load', () => {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);
}

function errorPosition(error) {
  console.error(error);
}
