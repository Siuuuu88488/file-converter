/* Utility function to update progress bar and text */
function updateProgress(progressBarId, progressTextId, percent, text) {
  var progressBar = document.getElementById(progressBarId);
  var progressText = document.getElementById(progressTextId);
  if (progressBar) {
    progressBar.style.width = percent + "%";
  }
  if (progressText) {
    progressText.textContent = text;
  }
}

/* ----------------------- */
/* Image Compressor */
/* ----------------------- */
var imageInput = document.getElementById('imageInput');
var compressBtn = document.getElementById('compressBtn');
var downloadLink = document.getElementById('downloadLink');
var imgFile;

if(imageInput) {
  imageInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if(file) {
      imgFile = file;
    }
  });
}

if(compressBtn) {
  compressBtn.addEventListener('click', function() {
    if(!imgFile) {
      return alert('Please select an image file first.');
    }
    updateProgress("progressCompressor", "progressTextCompressor", 30, "Inserted");
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        updateProgress("progressCompressor", "progressTextCompressor", 60, "Compressing");
        var canvas = document.createElement('canvas');
        canvas.width = img.width * 0.8;
        canvas.height = img.height * 0.8;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        updateProgress("progressCompressor", "progressTextCompressor", 100, "Done");
        if(downloadLink) {
          downloadLink.href = compressedDataUrl;
        }
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(imgFile);
  });
}

/* ----------------------- */
/* PDF Converter */
/* ----------------------- */
var pdfInput = document.getElementById('pdfInput');
var convertBtn = document.getElementById('convertBtn');
var downloadPdfLink = document.getElementById('downloadPdfLink');

if(convertBtn) {
  convertBtn.addEventListener('click', function() {
    if(!pdfInput.files[0]) {
      return alert('Please select a file to convert.');
    }
    updateProgress("progressPDF", "progressTextPDF", 30, "Inserted");
    var file = pdfInput.files[0];
    if(file.type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var imgData = event.target.result;
        var pdf = new window.jspdf.jsPDF();
        var img = new Image();
        img.onload = function() {
          updateProgress("progressPDF", "progressTextPDF", 60, "Processing");
          var pdfWidth = pdf.internal.pageSize.getWidth();
          var pdfHeight = pdf.internal.pageSize.getHeight();
          var imgWidth = img.width;
          var imgHeight = img.height;
          var ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          imgWidth = imgWidth * ratio;
          imgHeight = imgHeight * ratio;
          var x = (pdfWidth - imgWidth) / 2;
          var y = (pdfHeight - imgHeight) / 2;
          pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
          var pdfData = pdf.output('datauristring');
          updateProgress("progressPDF", "progressTextPDF", 100, "Done");
          if(downloadPdfLink) {
            downloadPdfLink.href = pdfData;
          }
        }
        img.src = imgData;
      }
      reader.readAsDataURL(file);
    } else if(file.type === 'application/pdf') {
      var reader = new FileReader();
      reader.onload = function(event) {
        updateProgress("progressPDF", "progressTextPDF", 100, "Done");
        if(downloadPdfLink) {
          downloadPdfLink.href = event.target.result;
        }
      }
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file type.');
    }
  });
}

/* ----------------------- */
/* Image Format Converter */
/* ----------------------- */
var imgFormatInput = document.getElementById('imgFormatInput');
var formatSelect = document.getElementById('formatSelect');
var convertFormatBtn = document.getElementById('convertFormatBtn');
var downloadFormatLink = document.getElementById('downloadFormatLink');
var imgFormatFile;

if(imgFormatInput) {
  imgFormatInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if(file) {
      imgFormatFile = file;
    }
  });
}

if(convertFormatBtn) {
  convertFormatBtn.addEventListener('click', function() {
    if(!imgFormatFile) {
      return alert('Please select an image file first.');
    }
    updateProgress("progressImgFormat", "progressTextImgFormat", 30, "Inserted");
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        updateProgress("progressImgFormat", "progressTextImgFormat", 60, "Converting");
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var outputFormat = formatSelect.value;
        var ext = "converted";
        if(outputFormat === "image/jpeg") ext = "jpg";
        else if(outputFormat === "image/png") ext = "png";
        else if(outputFormat === "image/webp") ext = "webp";
        var convertedDataUrl = canvas.toDataURL(outputFormat);
        updateProgress("progressImgFormat", "progressTextImgFormat", 100, "Done");
        if(downloadFormatLink) {
          downloadFormatLink.href = convertedDataUrl;
          downloadFormatLink.download = "converted." + ext;
        }
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(imgFormatFile);
  });
}

/* ----------------------- */
/* Audio Converter (Placeholder) */
/* ----------------------- */
var audioInput = document.getElementById('audioInput');
var convertAudioBtn = document.getElementById('convertAudioBtn');
var audioResultMsg = document.getElementById('audioResultMsg');

if(convertAudioBtn) {
  convertAudioBtn.addEventListener('click', function() {
    if(!audioInput.files[0]) {
      return alert('Please select an audio file.');
    }
    updateProgress("progressAudio", "progressTextAudio", 30, "Inserted");
    setTimeout(function(){
      updateProgress("progressAudio", "progressTextAudio", 100, "Done");
      if(audioResultMsg) {
        audioResultMsg.textContent = "Audio conversion feature is under development. Stay tuned!";
      }
    }, 1000);
  });
}

/* ----------------------- */
/* Video Converter (Placeholder) */
/* ----------------------- */
var videoInput = document.getElementById('videoInput');
var convertVideoBtn = document.getElementById('convertVideoBtn');
var videoResultMsg = document.getElementById('videoResultMsg');

if(convertVideoBtn) {
  convertVideoBtn.addEventListener('click', function() {
    if(!videoInput.files[0]) {
      return alert('Please select a video file.');
    }
    updateProgress("progressVideo", "progressTextVideo", 30, "Inserted");
    setTimeout(function(){
      updateProgress("progressVideo", "progressTextVideo", 100, "Done");
      if(videoResultMsg) {
        videoResultMsg.textContent = "Video conversion feature is under development. Stay tuned!";
      }
    }, 1000);
  });
}
