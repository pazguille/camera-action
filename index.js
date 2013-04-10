/**
 * Module dependencies.
 */
var Jvent = require('jvent'),
    navigator = window.navigator,
    document = window.document,
    URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
    constraints = {
        'mandatory': {
            'minWidth': '1280',
            'minHeight': '720'
        }
    };

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


function Camera(el, options) {
    this.init(el, options);

    return this;
}

Camera.prototype = new Jvent();

Camera.prototype.init = function (el, options) {
    // Normalize options
    options = options || {};
    options.hd = (options.hd !== undefined) ? options.hd : false;
    options.width = options.width || 320;
    options.height = options.height || 240;

    this.el = el;
    this.width = options.width;
    this.height = options.height;
    this._constraints = options.hd ? constraints : true;

    this._canvas = document.createElement('canvas');

    this._createVideo();

    return this;
};

Camera.prototype._createVideo = function () {

    var video = document.createElement('video');

    video.autoplay = 'autoplay';
    video.width = this.width;
    video.height = this.height;

    this._video = video;

    return this;
};

Camera.prototype.action = function () {

    var that = this;

    if (this._stream !== undefined) {

        this._video.play();

    } else {

        this.el.appendChild(this._video);

        navigator.getUserMedia({'video': this._constraints, 'audio': false}, function (LocalMediaStream) {
            that._success(LocalMediaStream);
        }, that._fail);
    }

    return this;
};

Camera.prototype._success = function (LocalMediaStream) {

    this._video.src = URL ? URL.createObjectURL(LocalMediaStream) : LocalMediaStream;
    this._video.play();
    this._stream = LocalMediaStream;

    this.emit('action');

    return this;

};

Camera.prototype._fail = function () {
    this.emit('fail');

    return this;
};

Camera.prototype.pause = function () {
    this._video.pause();

    this.emit('pause');

    return this;
};

Camera.prototype.cut = function () {
    this._video.src = "";
    this._stream.stop();
    this._stream = undefined;
    this.el.removeChild(this._video);

    this.emit('cut');

    return this;
};

Camera.prototype.takePhoto = function (options) {
    var strImage;

    options = options || {};

    options.type = options.type || 'image/png';
    options.width = this._canvas.width = options.width || this.width;
    options.height = this._canvas.height = options.height || this.height;
    options.download = (options.download !== undefined) ? options.download : false;

    this._canvas.getContext('2d').drawImage(this._video, 0, 0, options.width, options.height);

    strImage = this._canvas.toDataURL(options.type, options.jpegquality);

    if (options.download) {
        document.location.href = strImage.replace(options.type, 'image/octet-stream');
    }

    this.emit('photo', strImage);

    return strImage;
};

/**
 * Expose Camera
 */
exports = module.exports = Camera;