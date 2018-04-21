'use strict';
const app = document.querySelector('.app');
const button = document.getElementById('take-photo');
button.style.marginBottom = '4%';

const audio = document.createElement('audio');
const source = document.createElement('source');
source.src = './audio/click.mp3';
source.setAttribute('type', 'audio/mp3');
audio.appendChild(source);

const controls = document.querySelector('.controls');
controls.style.textAlign = 'center';

const list = document.querySelector('.list');
const video = document.createElement('video');
video.id = 'video';
video.setAttribute('autoplay', '');

app.appendChild(video);

navigator.mediaDevices.getUserMedia({video:true})
  .then(stream => {
    const video = document.getElementById('video');
    controls.style.display = 'flex';
    video.src = URL.createObjectURL(stream);
    button.addEventListener('click', act)
  });

function act(event) {
  event.preventDefault();
  audio.currentTime = 0;
  audio.play();

  const image = document.createElement('img');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  image.src = canvas.toDataURL();

  const resultImg = renderingEngine(create(image.src));
  setEventListener(resultImg);


  list.insertBefore(resultImg, list.querySelector('figure'))

  const newPrevImg = createImgForPrev(image);

  hasPrevImg(image, newPrevImg);

  video.style.display = 'none';
}

function fileUpload(event) {
  const img = event.target.closest('FIGURE').querySelector('img');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  ctx.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append('image', blob);

    fetch(`https://neto-api.herokuapp.com/photo-booth`, {
      body: formData,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((request) => {
      if (request.status !== 200) {
        throw `Ошиюка соединения: ${request.status}`
      }
    }).catch( err => {
      console.error(err)
    })
  });
}


function hasPrevImgInList() {
  if (!list.querySelector('figure img')) {
    return;
  }

  const prevImg = document.querySelector('.prev');
  const test = Array.from(list.querySelectorAll('figure img')).some(el => el.src === prevImg.src);

  if (!test) {
    prevImg.src = list.querySelector('figure img').src;
  }

}

function hasPrevImg(canvasImg, newImg) {
  if (app.querySelector('.prev')) {
    app.querySelector('.prev').src = canvasImg.src;
  } else {
    app.appendChild(newImg);
  }
}

function createImgForPrev(canvasImg) {
  const img = document.createElement('img');
  img.width = video.clientWidth;
  img.height = video.clientHeight;
  img.src = canvasImg.src;
  img.classList.add('prev');

  return img;
}
function deleteListImg(event) {
  event.preventDefault();
  const img = event.target.closest('figure');
  img.parentElement.removeChild(img);
  hasImg();
  hasPrevImgInList();
}

function hasImg() {
  if (list.querySelector('figure')) {
    return;
  } else {
    const prev = document.querySelector('.prev');
    prev.parentElement.removeChild(prev);
    video.style.display = 'flex';
  }
}

function setEventListener(imgNode) {
  imgNode.querySelectorAll('a').forEach(button => {
    if (button.textContent === 'file_upload') {
      button.addEventListener('click', fileUpload);
    }

    if (button.textContent === 'delete') {
      button.addEventListener('click', deleteListImg);
    }
  })
}

function create(src) {
  return {
    tag: 'figure',
    childs: [
      {
        tag: 'img',
        atr: {
          src: `${src}`
        }
      },
      {
        tag: 'figcaption',
        childs: [
          {
            tag: 'a',
            atr: {
              href: `${src}`,
              download: `snapshot.png`
            },
            childs: [
              {
                tag: 'i',
                cls: 'material-icons',
                childs: `file_download`
              }
            ]
          },
          {
            tag: 'a',
            childs: [
              {
                tag: 'i',
                cls: 'material-icons',
                childs: `file_upload`
              }
            ]
          },
          {
            tag: 'a',
            childs: [
              {
                tag: 'i',
                cls: 'material-icons',
                childs: `delete`
              }
            ]
          }
        ]
      }
    ]
  }
}

function renderingEngine(block) {
  if((typeof block === 'string') || (block === true) || (typeof block === 'number')) {
    return document.createTextNode(block)
  }

  if (typeof block === 'undefined' || block === null || block === false) {
    return document.createTextNode('');
  }

  if (Array.isArray(block)) {
    return block.reduce((f, elem) => {
      f.appendChild(renderingEngine(elem));
      return f;
    }, document.createDocumentFragment())
  }

  const element = document.createElement(block.tag);
  [].concat(block.cls).filter(Boolean).forEach( className => element.classList.add(className));

  if (block.atr) {
    Object.keys(block.atr).forEach( key => {
      element.setAttribute(key, block.atr[key])
    })
  }
  element.appendChild(renderingEngine(block.childs));
  return element;
}




