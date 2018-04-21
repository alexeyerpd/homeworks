'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    navigator.mediaDevices.getUserMedia(app.config)
      .then(stream => {
        let chunks = [];
        let recorder = new MediaRecorder(stream);
        recorder.addEventListener('dataavailable', event => chunks.push(event.data));
        recorder.addEventListener('stop', (event) => {
          const recorded = new Blob(chunks, {'type': recorder.mimeType});
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = app.preview.videoWidth;
          canvas.height = app.preview.videoHeight;

          ctx.drawImage(app.preview, 0, 0);


          app.preview.srcObject = null;
          stream.getTracks().forEach(track => track.stop());

          canvas.toBlob(blob => {
            done({
              video: recorded,
              frame: blob
            })
          });

        });

        app.mode = 'recording';
        app.preview.srcObject = stream;
        setTimeout(()=> {
          recorder.start();
          stopRec(recorder, app.limit);
        }, 1000)
      })

  }).catch((err) => {
    console.error('Не удалось записать видео');
  });
}

function stopRec(rcrd, limit) {
  setTimeout(() => {
    rcrd.stop();
  }, limit)
}
