export default function apiCall(route, body = {}, method='GET') {
    const request = new Promise((resolve, reject) => {

      const headers = new Headers({
        'Content-Type': 'application/json',
      });

      const requestDetails = {
        method,
        mode: 'cors',
        headers,
      };

      if(method !== 'GET') requestDetails.body = JSON.stringify(body);

      function handleErrors(response) {
        if(response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      }

      fetch(`${SERVER_URL}/${route}`, requestDetails)
        .then(handleErrors)
        .then(resolve)
        .catch(reject);

    });
}
