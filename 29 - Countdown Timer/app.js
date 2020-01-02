let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing intervals
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) { //condition to stop the interval
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft)
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = `Countdown Timer - ${display}`
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))


function handleSubmit(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60)
  this.reset();
}

document.customForm.addEventListener('submit', handleSubmit)