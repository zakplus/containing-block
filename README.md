# containing-block
This utility will find and return the containing block of a DOM element.  
Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block

## Install
```npm install --save containing-block```

## Usage
Just load the script in your HTML page and a global ```cb``` object will be available in the global namespace.
Use the function ```cb.get(element)``` to retrieve the element containing block.

## Full example
In this example we search for the containing block of the ```#my-el``` element which is a absolute positioned ```<i>``` element.  
The ```cb.get()``` function will return the ```#main``` element here.

```html
<!doctype html>

<html>
  <head>
    <script type="text/javascript" src="path/to/cb.min.js"></script>

    <style type="text/css">
      #main {
        position: relative;
      }

      #my-el {
        position: absolute;
        left: 50%;
      }
    </style>
  </head>

  <body>
    <div id="main">
      <div id="sub">
        <i id="my-el">Hello!</i>
      </div>
    </div>

    <script type="text/javascript">
      (function() {
        var el = document.getElementById('my-el');
        var containingBlock = cb.get(el);   // << important stuff is here

        // Print the results
        if(!containingBlock) console.error("Containing block not found!");
        else {
          console.log("Containing block is:");
          console.log(containingBlock);
        }
      })()
    </script>
  </body>
</html>
```

## license

```
MIT License

Copyright (c) 2018 Valerio Bianchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```