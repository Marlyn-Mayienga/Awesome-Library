let getTime;

export default getTime = () => {
  const dateAndTime = luxon.DateTime.now();
  document.querySelector('.date').innerHTML = dateAndTime.toFormat('DD, HH:mm:ss');
};

setInterval(() => {
  getTime();
}, 1000);