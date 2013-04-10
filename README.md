# Camera-action

Camera-action is a component to ease camera (getusermedia) management.

It's cross-browser compatible:

- Firefox
- Google Chrome
- Opera

Note: `getUserMedia` has to be enabled in Firefox by setting the `media.peerconnection.enabled` option to `true` in about:config.

## Installation

    $ component install pazguille/camera-action

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version:
```html
<script src="../standalone/camera-action.js"></script>
```

## How-to

First, defines the camera's `container` and its `options` (see the API):
```js
var container = document.querySelector('#container'),
    options = {
        'width': 640,
        'height': 480
    };
```

Now, requires and creates a new instance of `camera-action`:
```js
var Camera = require('camera-action'),
    camera = new Camera(container, options);
```

Then, starts to use it!:
```js
camera.action();
```

![Camera... Action!](http://i1356.photobucket.com/albums/q731/pazguille/ScreenShot2013-03-29at112306AM_zps05a1bccd.png?t=1364567391)

## API

### Camera#action()
Adds the camera to its container and starts to record.
```js
camera.action();
```

### Camera#pause()
Pause the camera.
```js
camera.pause();
```

### Camera#takePhoto(options)
Takes a snapshot from the camera.
- `width`: (number) [optional] The size width of the photo. The default value is camera's width.
- `height`: (number) [optional] The size height of the photo. The default value is camera's height.
- `type`: (string) [optional] URL containing a representation of the image in the format specified. The default value is `image/png`.
- `download` (boolean) [optional] Force to download the image. The default value is `false`.
- `jpegquality`: (string) [optional] The quality level of a JPEG image in the range of 0.0 to 1.0.

```js
camera.takePhoto({
    'width': 640,
    'height': 480,
    'download': true
});
```

### Camera#cut()
Removes the camera from its container.
```js
camera.cut();
```

### Options
- `width`: (number) The size width of the camera. The default value is `320`.
- `height`: (number)The size height of the camera. The default value is `240`.
- `hd`: (boolean) Turn on HD to capture in 720p (works only in Chrome). The default value is `false`.

Recommended sizes:

- 1280x720
- 960x720
- 640x360
- 640x480
- 320x240
- 320x180

### Events
- `action`: emitted when the camera is started.
- `pause`: emitted when the camera is paused.
- `cut`: emitted when the camera is removed.
- `photo`: emitted when the camera take a photo. Also, receive as parameter the dataURI of the taken photo.
- `fail`: emitted when the browser doesn\'t support the camera feature.

## Contact
- Guille Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
### The MIT License
Copyright (c) 2012 [@pazguille](http://twitter.com/pazguille)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.