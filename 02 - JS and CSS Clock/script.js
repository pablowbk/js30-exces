const secondsHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hoursHand = document.querySelector('.hour-hand');
const hands = document.getElementsByClassName('hand');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDeg = ((seconds / 60) * 360) + 90;
  secondsHand.style.transform = `translateY(-2px) rotate(${secondsDeg}deg)`;

  const mins = now.getMinutes();
  const minsDeg = ((mins / 60) * 360) + 90;
  minutesHand.style.transform = `translateY(-3.5px) rotate(${minsDeg}deg)`;

  const hours = now.getHours();
  const hoursDeg = ((hours / 12) * 360) + 90;
  hoursHand.style.transform = `translateY(-5px) rotate(${hoursDeg}deg)`;

}

setInterval(setDate, 500);
