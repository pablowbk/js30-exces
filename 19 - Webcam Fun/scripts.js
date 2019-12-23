const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(localMediaStream => {
    console.log(localMediaStream)
    video.srcObject = localMediaStream;
    video.play();
  })
  .catch(err => console.log(err))
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0,0,width,height);
    // pixels = redEffect(pixels); //redfilter
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0,0)

  }, 16)
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0; //resets sound 
  snap.play();

  // take data out from canvas
  const data = canvas.toDataURL('image/jpeg'); // returns a base64 image format
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Person"/>`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;// red channel
    pixels.data[i + 1] = pixels.data[i + 1] - 50;// green channel
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;// blue channel
    // pixels[i + 3] // alpha channel
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // red channel
    pixels.data[i + 500] = pixels.data[i + 1]; // green channel
    pixels.data[i - 550] = pixels.data[i + 2]; // blue channel
    // pixels[i + 3] // alpha channel
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = [];

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas)