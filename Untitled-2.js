As you have seen, createCanvas creates an HTML5 Canvas, a special element you can draw graphics into. However, using the p5.dom add-on library, p5.js can also be used to create and interact with HTML elements outside of the graphics canvas. This tutorial will explain more about how to use p5.dom.

## Including the p5.dom library

First, you will need to include the p5.dom.js file in your HTML. If you are using the example project it should already be there, you just need to uncomment the line in index.html that links to it. Otherwise, [download](https://github.com/processing/p5.js/blob/master/lib/addons/p5.dom.js) the file and add this line to your HTML header:

```html
<script type='text/javascript' src='relative/path/to/your/p5.dom.js'>
```

## Storing pointers and calling methods

When you call `createCanvas(w, h)` you create a graphics canvas to draw into with the specified width and height. However, you can also store the canvas you create in a variable, this is called a pointer or reference. With this pointer we can call methods of the element itself, to set the position, id or class, for instance. A full listing of methods is [here](http://p5js.org/reference/#/p5.Element). Not all of these methods listed will work or make sense for every element, so you have to use your judgment a bit. For example, calling `value()` on a slider returns or sets its value, but calling it on canvas would have no effect.

```javascript
let canvas;

function setup() {
  // We are still calling createCanvas like in the past, but now 
  // we are storing the result as a variable. This way we can 
  // call methods of the element, to set the position for instance.
  canvas = createCanvas(600, 400);

  // Here we call methods of each element to set the position 
  // and id, try changing these values.
  // Use the inspector to look at the HTML generated from this 
  // code when you load the sketch in your browser.
  canvas.position(300, 50);
  canvas.class("lemon");
}

function draw() {
  // These commands are applied to the graphics canvas as normal.
  background(220, 180, 200);
  ellipse(width/2, height/2, 100, 100);
  ellipse(width/4, height/2, 50, 50);
}
```

There is one important distinction between working with elements on an element level, vs calling methods like `rect()` or `fill()` to draw directly into the canvas. When drawing in canvas while the loop is running, you typically need to redraw everything in the scene every frame. For example, if you want a rectangle to continue to appear on the screen, you include the command `rect()` in draw, which redraws this rectangle many times per second.

However, when you are working with elements, they hold a static state that you can change at any time by calling one of their methods. In the example above, the canvas is positioned at (300, 50) relative to the upper left corner. This method is called only once in setup, after that it stays in position and does not need to be reset every frame.


### Using parent()

When a new element is added using one of the create methods (either a canvas, div, img, etc), you may notice that it doesn't show up in the upper left corner (0,0), but instead appends to the end of the page. The elements are also affected by any existing CSS styling you may have set for the page. The guiding idea here is that p5 does as little as possible to mess with your page, so elements follow the flow of the page rather than disrupting anything. Then, if you'd like to arrange things differently, you can use p5 methods or CSS styling.

If you would like to specify a location for the element, rather than appending directly to the end, you can use the `.parent()` method. In the `<body>` of your HTML file, create a container where you would like your canvas to get inserted, with ID of your choice:

```html
<div id='myContainer'></div>
```

Then use a variable to store a pointer to the element you created, and call `.parent()` on this variable:

```javascript
function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');
}
```


### Using position()

Maybe you don't care which div container your elements end up in, but just want to set their position on the page. In this case you could use `.position(x, y)`. Calling this method overrides the default positioning of the element (by applying a CSS style `position:absolute`), allowing you to give it a position relative to the upper left of the window (0,0). The example below creates a <div> element and positions it at (100,100).

```javascript
function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.position(100, 100);
}
```

Note that the examples above refer to createCanvas(), but they work the same for any of the createXX() methods.




## Creating other HTML elements

In addition to ```createCanvas(w, h)```, there are a number of other methods like `createDiv()`, `createP()`, `createA()`, etc (see the [reference](http://p5js.org/reference/#/libraries/p5.dom) for full listing). In the example below, a div with text is created, in addition to the graphics canvas, and the position is set for each.

```javascript
var canvas, txt;

function setup() {
  canvas = createCanvas(600, 400);
  canvas.position(300, 50);

  txt = createDiv('This is an HTML string!');
  txt.position(50, 50);
}

function draw() {
  background(220, 180, 200);

  ellipse(width/2, height/2, 100, 100);
  ellipse(width/4, height/2, 50, 50);
}
```
![screenshot](http://i.imgur.com/VqFxvTU.png)

In the previous example we are just placing a text string into the element, but the element can really contain any HTML. Try replacing this line and notice how some of the text becomes clickable.

```javascript
var txt = createDiv("Here is some text and <a href='http://i.imgur.com/WXaUlrK.gif'>this is an HTML link</a>!");
```

Each of these methods create a p5.Element, which is a wrapper around an HTML element, giving simplified access to many of its main properties. However, if you want to access the underlying HTML element, you can use the `.elt` property. There is a reference for all properties of the element [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

## Creating HTML images

If want to create an image specifically you can use createImg(src). An HTML image differs from one drawn in the canvas using `image()`. You don't need to use `loadImage()`, and you don't need to draw it every frame; once you create it, the image exists on the page until you remove it. Also note that this image is a single element in itself, and if you drag your mouse over it you will notice that it's highlightable. This means that you can attach handlers for mouse events directly to this element, but more on that later. In the example below we create an image and a canvas, setting the position and size for each. 

```javascript
var img;
var canvas;

function setup() {

  img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");
  canvas = createCanvas(400, 400);

  img.position(190, 50);
  img.size(200, 200);
  canvas.position(300, 50);
}

function draw() {
  noStroke();
  background(220, 180, 200);
  fill(180, 200, 40);
  strokeWeight(6);
  stroke(180, 100, 240);
  for (var i = 0; i < width; i += 15) {
    line(i, 0, i, height);
  }
}
```
![screenshot](http://imgur.com/fqk89sj.png)


## Creating HTML media elements

There are also create methods for adding elements that deal with media—`createVideo()`, `createAudio()`, and `createCapture()`. These methods create a p5.MediaElement, which has some [additional methods](http://p5js.org/reference/#/p5.MediaElement) beyond those of a normal p5.Element. Again, while many features of HTML5 media are made accessible through the p5.dom API, there is [more native functionality](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement). Remember that you can use `.elt` to access the underlying element and access any of the native properties.

The example below demonstrates toggling a video with a button, see it running [here](http://p5js.org/examples/dom-video.html).

```javascript
var playing = false;
var fingers;
var button;

function setup() {
  fingers = createVideo('assets/fingers.mov');
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

function mousePressed() {
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}
```
Not all browsers will support these media capabilities, you can lookup which are supported by each browser at [caniuse.com](http://caniuse.com/).

## Using createElement()

The [p5.dom API](http://p5js.org/reference/#/libraries/p5.dom) supports a subset of all the HTML elements possible. If you'd like to add an element that does not have a specific create method, you can use the general `createElement()` method. The first argument to createElement is the tag name, and the second, optional argument is the content to be placed within the element. In the example before, an H1 heading element is created.

```
var h1;
var canvas;

function setup() {
  h1 = createElement('h1', 'this is some heading text');
  canvas = createCanvas(400, 400);
}
```

See [this page](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list) for a full list of HTML elements you can create.


## Element specific listeners

Every element has its own `mouseOver()`, `mouseOut()` methods that get called when you move the mouse over or off of the individual element. To program a specific action to happen when one of these events occurs, you pass in either a function or the name of a function as the argument to these methods. 

In the example below, we are attaching a behavior that hides the uniforn image when you mouse over the canvas, and shows it again when you mouse out (off of) the canvas.

```javascript
var img;
var canvas;

function setup() {
  canvas = createCanvas(400, 400);
  img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");

  img.position(190, 50);
  img.size(200, 200);

  canvas.position(300, 50);
  // Attach listeners for mouse events related to canvas
  canvas.mouseOver(uniHide);
  canvas.mouseOut(uniShow);
}

function draw() {
  // All drawing happens in the canvas.
  noStroke();
  background(220, 180, 200);
  fill(180, 200, 40);
  strokeWeight(6);
  stroke(180, 100, 240);
  for (var i = 0; i < width; i += 15) {
    line(i, 0, i, height);
  }
}

// Create functions for hiding and showing uni image. These will be hooked into mouse events related to canvas above.
function uniHide() {
  img.hide();
}

function uniShow() {
  img.show();
}
```

In the example above, we pass in the function names uniHide and uniShow. You could achieve the same result by passing in a whole function without a name, this nameless function is known as an "anonymous function".

```javascript
canvas.mouseOver(function() {
	img.hide();
})
```

### Element vs global listeners

Elements also have `mousePressed()` methods that let you connect functions to the mousePressed event on a per element level. Important: this is different than using the global `mousePressed()` method, which gets triggered anytime the mouse is clicked anywhere. With these element specific handlers, the function is __only__ called when you click directly on the element.

```javascript
var img;
var canvas;

function setup() {
  canvas = createCanvas(400, 400);
  img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");

  img.position(190, 50);
  img.size(200, 200);
  // Attach listeners for mouse events related to img.
  img.mousePressed(uniHide);

  canvas.position(300, 50);
}

function draw() {
  noStroke();
  background(220, 180, 200);
  fill(180, 200, 40);
  strokeWeight(6);
  stroke(180, 100, 240);
  for (var i = 0; i < width; i += 15) {
    line(i, 0, i, height);
  }
}

// Create functions for hiding and showing uni image. 
// These will be hooked into mouse events related to canvas above.
function uniHide() {
  img.hide();
}

function uniShow() {
  img.show();
}

// Define global keyPressed behavior. This one doesn't need to be hooked in, it's a global listener, automatically fired on key press.
function keyPressed() {
  uniShow();
}
```

Here is one more example illustrating the difference between global and element specific listeners. In this example, every click on the page anywhere makes the background lighter. However, only clicks directly on the canvas change the size of the ellipse.

```javascript
var gray = 0;
var diameter = 5;

function setup(){
  var canvas = 	createCanvas(200, 200);
  canvas.mousePressed(incDiameter);
}

function draw() {
  background(gray);
  ellipse(width/2, height/2, diameter, diameter);
}

function mousePressed() {
  gray = gray + 10;
}

function incDiameter() {
	diameter = diameter + 5;
}

```

### Searching for elements

Assigning an element a class or id may be useful in styling the element with a CSS stylesheet, or for finding the element on the page.

You can use `.class()` to assign the element to a named class. It is up to you what name you choose for the class. Multiple elements in a document can have the same class value. You can use `.id()` to assign an id to the element. It is up to you what name you choose for the id. The id name must be unique in the document, meaning no other element on the page should have the same id.

There are a couple of methods for finding elements already on the page.  `select(#id)` returns the element on the page with given id or null if none is found, while `selectAll(.className)` returns an array of all elements with given className, or an empty array if none are found.

```javascript
var myDiv0;
var myDiv1;
var myDiv2;

function setup() {

  myDiv0 = createDiv('this is div 0');
  myDiv1 = createDiv('this is div 1');
  myDiv2 = createDiv('this is div 2');

  // Here we call methods of each element to set the position and class.
  // Let's give the first two canvases class donkey, and the third class yogurt.
  myDiv0.position(50, 50);
  myDiv0.class('donkey');
  myDiv1.position(300, 50);
  myDiv1.class('donkey');
  myDiv2.position(550, 50);
  myDiv2.class('yogurt');
}

// On key press, hide all elements with class donkey.
function keyPressed() {
  // selectAll() returns an array of elements with class donkey. 
  // If none are found, it returns an empty array [].
  var donkeys = selectAll('.donkey');
  // We can then iterate through the array and hide all the elements.
  for (var i = 0; i < donkeys.length; i++) {
    donkeys[i].hide();
  }
}
```

Note that with these methods, when we say "returns an element", we mean it returns a p5.Element object. If you want to access the underlying HTML element, you can use the `.elt` property. There is a reference for all properties of the element [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).



## Setting style

Unlike a canvas, which you draw into to affect the way it looks, other HTML elements can be styled using what is called [CSS (Cascading Style Sheets)](https://developer.mozilla.org/en-US/docs/Web/CSS). CSS is a language used to describe the presentation of HTML elements rendered on screen, allowing you to set things like background color, font size, font color, padding, etc.

In p5.js, you can use a `style()` method on any element to set CSS properties. See the [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) for a full listing of properties you can set.

```javascript
var text;
var canvas;

function setup() {
  text = createP("This is an HTML string with style!");
  canvas = createCanvas(600, 400);

  text.position(50, 50);
  text.style("font-family", "monospace");
  text.style("background-color", "#FF0000");
  text.style("color", "#FFFFFF");
  text.style("font-size", "18pt");
  text.style("padding", "10px");
  canvas.position(150, 150);
}

function draw() {
  background(220, 180, 200);
  ellipse(width/2, height/2, 100, 100);
  ellipse(width/4, height/2, 50, 50);
}
```
![screenshot](http://i.imgur.com/8vujAih.png)


Alternatively, you can also input all CSS properties as one, as a single string separated by semicolons.

```javascript
text.style("font-family:monospace; background-color:#FF0000; color:#FFFFFF; font-size:18pt; padding:10px;");
```

### Using a CSS stylesheet

Another way to incorporate this into your sketch is by creating your own stylesheet. To do this, create a file called something like style.css. Add a link to this file in the head of your HTML file.

```html
<link rel="stylesheet" type="text/css" href="style.css">
```

In the CSS file, you add what are called "rules", or lines that determine how various elements are presented. You can define these rules based on the HTML tag (p, div, span, etc), an element class (prefaced with "."), or an element id (prefaced with "#"). The below example renders the same as the previous example, but uses a CSS stylesheet instead of the `.style()` method. Note that in this case, no quotes are placed around either the property names or the values.

```javascript
var text;
var canvas;

function setup() {
  text = createP("This is an HTML string with style!");
  canvas = createCanvas(600, 400);
  text.position(50, 50);
  text.class("lemon"); // assign a class to be used by the CSS sheet
  canvas.position(150, 150);
}

function draw() {
  background(220, 180, 200);
  ellipse(width/2, height/2, 100, 100);
  ellipse(width/4, height/2, 50, 50);
}
```

In style.css:

```css
.lemon {
	font-family: monospace;
	background-color: #FF0000;
	color: #FFFFFF;
	font-size: 18pt;
	padding: 10px;
}
```

### More CSS resources

Here are some more resources for looking up and learning about CSS:
+ [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
+ [CSS basics overview](http://html.net/tutorials/css/lesson2.php)
+ [W3Schools CSS overview](http://www.w3schools.com/css/css_howto.asp)
+ [MDN CSS tutorial](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started)
+ [HTML & CSS book](http://htmlandcssbook.com/)

## Removing things

You can remove any element by calling its `.remove()` method. This removes any event handlers connected to the element, and removes the element from the page.

```javascript
var myDiv = createDiv('this is some text');
myDiv.remove();
```

`removeElements()` will remove all elements created by p5, except any canvas / graphics elements created by createCanvas or createGraphics. Any event handlers will be removed from these elements, and the element is removed from the page.

```javascript
function setup() {
  createCanvas(100, 100);
  createDiv('this is some text');
  createP('this is a paragraph'); 
}
function mousePressed() {
  removeElements(); // this will remove the div and p, not canvas
}
```

Also, you can remove the entire p5 sketch by calling `remove()`. This will remove the canvas and any elements created by p5.js or the p5.dom library. It will also stop the draw loop, remove any event listeners, and unbind any properties or methods from the window global scope. One variable, `p5` will be left in case you wanted to use it to create a new sketch. If you like, you can set `p5 = null` to remove all traces.

```javascript
function setup() {
  createCanvas(200, 200);
}

function draw() {
  ellipse(width/2, height/2, 0, 0);
}

function mousePressed() {
  remove(); // remove whole sketch on mouse press
}
```
## HTML5 Video

In p5.js we can create an HTML5 <video> element in the DOM for simple playback of audio/video using the `createVideo()` function.
  
  ```javascript
  var vid;
  function setup(){
    vid = createVideo(['small.mp4', 'small.ogv', 'small.webm'], vidLoad);
  }
  // This function is called when the video loads
  function vidLoad() {
    vid.play();
  }
  ```
  
Shown by default, the video element can be hidden with `.hide()`. The video element is appended to the container node if one is specified, otherwise it is appended to `<body>`. The first parameter can be either a single string path to a video file, or an array of string paths to different formats of the same video. This is useful for ensuring that your video can play across different browsers, as each supports different formats.
Syntax :

```javascript
 // src: File path of the video
 // callback (optional): callback function, called when video is loaded
  createVideo(src, callback)
```

This function requires you include the p5.dom library. Add the following into the `<head>` of your index.html file: 

```html
<script language="javascript" type="text/javascript" src="path/to/p5.dom.js"></script>
```

[More about HTML5 audio and video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video) & [More about createVideo()](https://p5js.org/reference/#/p5/createVideo).

If we want to draw on top of the video we could create a transparent canvas element. However, in some projects it may be advantageous to copy the pixels of a video into a canvas rather than display the video element itself on the page. This can be accomplished by loading the video into an object and sending that object to the `image()` function.

```javascript
  // Create a global variable
  var vid;  
  function setup() {
    createCanvas(800,800); // load the canvas
    background(0);   
    vid = createVideo('movie.mp4'); // load the video (movie.mp4) and attach it to the global variable 
    vid.play();  // play the video
    vid.hide();  // hide the video
  }
  function draw() {
    image(vid, 0, 0, 200, 200); // Draw the video in the canvas 
  }
```
[More about p5.MediaElement](https://p5js.org/reference/#/p5.MediaElement)


## Capture Live Video

You can create a new `<video>` element that contains the audio/video feed from a webcam using the `createCapture()` function. This can be drawn onto the canvas in a similar manner as we did above.
  
```javascript
//create a global variable
var capture;

//Get a stream of video from the user and store attach it to capture
function setup() {
  createCanvas(200,200);
  capture = createCapture(VIDEO)
  capture.size(200,200)
}

//Continously draw the pixels on th canvas using the data stored in capture
function draw() {
  //Original video slides horizontally
  capture.position(mouseX,0);

  //pixels drawn on canvas using image function remains static and inverted(filter);
  image(capture,0,0,200,200);
  filter(INVERT);
}
```

More specific properties of the feed can be passed in a `Constraints` object. See the [W3C spec](w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints) for possible properties. Note that not all of these are supported by all browsers.

Security note: A new browser security specification requires that `getUserMedia`, which is behind `createCapture()`, only works when you're running the code locally, or on HTTPS. Learn more [here](https://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https) and [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

This function requires you include the p5.dom library. Add the following into the `<head>` of your index.html file:

```html
<script language="javascript" type="text/javascript" src="path/to/p5.dom.js"></script>
```

Syntax

```javascript
createCapture(type, callback)
```

`type`    : String|Constant|Object:type of capture, either VIDEO or AUDIO if none specified, default both, or a Constraints object.

`callback`: Function: (optional) function to be called once stream has loaded.

`Returns` : Object|p5.Element: capture video p5.Element .

[Further information here](https://p5js.org/reference/#/libraries/p5.dom).




## What next?

* There is a lot more you can do with this library than is covered here, so explore the methods and classes you find in the [reference](http://p5js.org/reference/#/libraries/p5.dom). 
* See more examples in the DOM section on the [examples page](http://p5js.org/examples/).
* If you'd like to learn more about HTML and the DOM in general, see this [intro to HTML and CSS](https://github.com/processing/p5.js/wiki/Intro-to-HTML-and-CSS)
* This library is a bit experimental and in development, so if you find bugs or have suggestions please [post an issue](https://github.com/processing/p5.js/issues). 
* The [forum](http://forum.Processing.org/two/) is the best place for more general programming questions.