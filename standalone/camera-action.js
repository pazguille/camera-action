(function(e){'use strict';function t(){this.collection={};this.maxListeners=10}t.prototype.addListener=function(e,t,n){if(e===undefined){throw new Error('jvent - "addListener(event, listener)": It should receive an event.')}if(t===undefined){throw new Error('jvent - "addListener(event, listener)": It should receive a listener function.')}var r=this.collection;t.once=n||false;if(r[e]===undefined){r[e]=[]}if(r[e].length+1>this.maxListeners&&this.maxListeners!==0){throw new Error("Warning: So many listeners for an event.")}r[e].push(t);this.emit("newListener");return this};t.prototype.on=t.prototype.addListener;t.prototype.once=function(e,t){this.on(e,t,true);return this};t.prototype.removeListener=function(e,t){if(e===undefined){throw new Error('jvent - "removeListener(event, listener)": It should receive an event.')}if(t===undefined){throw new Error('jvent - "removeListener(event, listener)": It should receive a listener function.')}var n=this.collection[e],r=0,i;if(n!==undefined){i=n.length;for(r;r<i;r+=1){if(n[r]===t){n.splice(r,1);break}}}return this};t.prototype.off=t.prototype.removeListener;t.prototype.removeAllListeners=function(e){if(e===undefined){throw new Error('jvent - "removeAllListeners(event)": It should receive an event.')}delete this.collection[e];return this};t.prototype.setMaxListeners=function(e){if(isNaN(e)){throw new Error('jvent - "setMaxListeners(n)": It should receive a number.')}this.maxListeners=e;return this};t.prototype.listeners=function(e){if(e===undefined){throw new Error('jvent - "listeners(event)": It should receive an event.')}return this.collection[e]};t.prototype.emit=function(){var e=Array.prototype.slice.call(arguments,0),t=e.shift(),n,r=0,i;if(t===undefined){throw new Error('jvent - "emit(event)": It should receive an event.')}if(typeof t==="string"){t={type:t}}if(!t.target){t.target=this}if(this.collection[t.type]!==undefined){n=this.collection[t.type];i=n.length;for(r;r<i;r+=1){n[r].apply(this,e);if(n[r].once){this.off(t.type,n[r]);i-=1;r-=1}}}return this};if(typeof e.define==="function"&&e.define.amd!==undefined){e.define("Jvent",[],function(){return t})}else if(typeof module!=="undefined"&&module.exports!==undefined){module.exports=t}else{e.Jvent=e.EventEmitter=t}})(this);
(function (window) {
    'use strict';

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
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('camera', [], function () {
            return Camera;
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = Camera;

    // Default
    } else {
        window.Camera = Camera;
    }
}(this));