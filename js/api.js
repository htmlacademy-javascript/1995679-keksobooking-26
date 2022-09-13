const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {onSuccess(data);})
    .catch((err) => {onFail(err);});
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {onSuccess();}
      else {onFail();}
    })
    .catch((err) => {onFail(err);});
};

export { getData, sendData };

