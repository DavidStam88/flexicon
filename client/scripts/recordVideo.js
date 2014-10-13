/**

        Deze functionaliteit werkt niet

*/

var videoController = function ($scope) {

var canvas,
    button,
    ctx,
    video,
    startOpenemen,
    recordVideo,
    toonV,
    videoCanvas,
    videoArray = [],
    x = 0;

function onFailure(err) {
    alert("The following error occured: " + err.name);
}

function gewensteMedia() {
    return {
        video : true,
        audio : false
    }
}

var setWaardes = function () {
    videoCanvas = document.getElementById("video-canvas");
    button = document.getElementById("screenshot-button");
    canvas = document.getElementById("video-canvas");
    ctx = canvas.getContext('2d');

    //button.addEventListener('click',snapshot, false);
    video = document.getElementsByTagName("video")[0];
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        if (navigator.getUserMedia) {
            navigator.getUserMedia(gewensteMedia(), function (localMediaStream) {
                    video.src = window.URL.createObjectURL(localMediaStream);

                }, onFailure);
        }
        else {
            alert('OOPS No browser Support');
        }
}

var stopOpnemen = function () {
    clearInterval(startOpenemen);
    clearInterval(recordVideo);
    toonVideo();
}

$scope.record = function () {
    startOpenemen = setTimeout(function() { stopOpnemen(); }, 3000);
    recordVideo = setInterval(function() {
        snapshot();
    }, 20);
}

function tekenFrame () {
    x += 1;
    videoCanvas.width = 270;
    videoCanvas.height = 270;
    var n = videoCanvas.getContext('2d')
    if (x === videoArray.length) {
        clearInterval(recordVideo);
    } else {
    n.putImageData(videoArray[x], 0, 0);
    }
}

function toonVideo () {
    recordVideo = setInterval(function() {
        tekenFrame();
    }, 20);
}

function stop() {
    clearInterval(recordVideo);
    toonVideo();
}

function snapshot() {
    canvas.width = 270;
    canvas.height = 270;
    ctx.drawImage(video, -200, -200);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    videoArray[videoArray.length] = imgData;
}
    setWaardes();
};