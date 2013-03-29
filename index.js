/**
 * Module dependencies.
 */
var navigator = window.navigator,
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

Camera.prototype.init = function (el, options) {
    // Normalize options
    options = options || {};
    options.hd = (options.hd !== undefined) ? options.hd : false;
    options.width = options.width || 320;
    options.height = options.height || 240;

    this.el = container;
    this.width = options.width;
    this.height = options.height;
    this._constraints = options.hd ? constraints : true;

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
}

Camera.prototype.action = function () {

    var that = this;

    if (this._stream !== undefined) {

        this._video.play();

    } else {

        this.el.appendChild(this._video);

        navigator.getUserMedia({'video': this._constraints, 'audio': false}, function (LocalMediaStream) {
            that._success(LocalMediaStream);
        }, function () {
            that._fail();
        });
    }

    return this;
};

Camera.prototype._success = function (LocalMediaStream) {

    this._video.src = URL ? URL.createObjectURL(LocalMediaStream) : LocalMediaStream;
    this._video.play();
    this._stream = LocalMediaStream;

    return this;

};

Camera.prototype._fail = function () {
    console.log('Your browser doesn\'t support this feature.');

    return this;
};

Camera.prototype.cut = function () {
    this._video.pause();

    return this;
};

Camera.prototype.remove = function () {
    this._video.src = "";
    this._stream.stop();
    this._stream = undefined;
    this.el.removeChild(this._video);

    return this;
};

/**
 * Expose Camera
 */
exports = module.exports = Camera;