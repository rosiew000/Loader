/**
* Represents a loading bar and text.
* @constructor
*/
var Loader = function() {    
    // default variables
    var _duration = 2;      // in seconds
    var _time_left = _duration * 1000;  // in milliseconds    
    var _has_text = false;

    var _dom_loader_container = document.createElement("div");
    var _dom_loader = document.createElement("div");
    var _dom_status = document.createElement("span");
    var _dom_status_after = document.createElement("text");
    var _dom_status_after_2 = document.createElement("text");

    var _dom_status_text = document.createElement("p");
    _dom_status_text.innerHTML = "&nbsp;";

    _dom_status.appendChild(_dom_status_after);
    _dom_status.appendChild(_dom_status_after_2);
    _dom_loader.appendChild(_dom_status);
    _dom_loader_container.appendChild(_dom_loader);


    var _status_style = _dom_status.style;
    var _loader_style = _dom_loader.style;
    var _status_after_style = _dom_status_after.style;
    var _status_after_2_style = _dom_status_after_2.style;

    _loader_style.height = '10px';
    _loader_style.position = 'relative';
    _loader_style.background = '#555';
    _loader_style.borderRadius = '25px';
    _loader_style.padding = '10px';
    _loader_style.boxShadow = 'inset 0 -1px 1px rgba(255, 255, 255, 0.3)';

    _status_style.width = '100%';
    _status_style.display = 'block';
    _status_style.height = '100%';
    _status_style.borderTopRightRadius = '8px';
    _status_style.borderBottomRightRadius = '8px';
    _status_style.borderTopLeftRadius = '20px';
    _status_style.borderBottomLeftRadius = '20px';
    _status_style.backgroundColor = 'rgb(43, 194, 83)';
    _status_style.backgroundImage = 'linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%)';
    _status_style.boxShadow = 'inset 0 2px 9px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4)';
    _status_style.position = 'relative';
    _status_style.overflow = 'hidden';

    _status_after_style.content = "";
    _status_after_style.position = 'absolute';
    _status_after_style.top= '0'; _status_after_style.left= '0'; _status_after_style.bottom= '0'; _status_after_style.right= '0';
    _status_after_style.backgroundImage= 'linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent)';
    _status_after_style.zIndex= '1';
    _status_after_style.backgroundSize= '50px 50px';
    _status_after_style.animation= 'move 2s linear infinite';
    _status_after_style.borderTopRightRadius= '8px';
    _status_after_style.borderBottomRightRadius= '8px';
    _status_after_style.borderTopLeftRadius= '20px';
    _status_after_style.borderBottomLeftRadius= '20px';
    _status_after_style.overflow= 'hidden';

    _status_style.animationName = 'move';
    _status_style.animationDuration = _duration+'s';
    _status_style.animationTimingFunction = 'linear';
    _status_style.animationIterationCount = '1';
    _status_after_style.animationName = 'slide';
    _status_after_style.animationDuration = '1s';
    _status_after_style.animationTimingFunction = 'linear';
    _status_after_style.animationIterationCount = '3';

    var keyframeprefix = "";
    var keyframes = '@' + keyframeprefix + 'keyframes move { '+
                    '0% {' + keyframeprefix + 'width: 0 } '+
                    '100% {' + keyframeprefix + 'width: 100% }'+
                    '} '
                    +
                    '@' + keyframeprefix + 'keyframes slide { '+
                    '0% {' + keyframeprefix + 'left: -50px } '+
                    '100% {' + keyframeprefix + 'left: 0 }'+
                    '} ';
        var s = document.createElement( 'style' );
        s.innerHTML = keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );


    // Public methods


    /**
    * Creates an instance of Loader and puts it inside the pageElement.
    *
    * @param {Node} pageElement Node of element to put the loader inside.
    */
    this.showLoader = function(pageElement) {
        pageElement.appendChild(_dom_loader_container);
    }



    /**
    * Sets the duration of the animation and length of time for text to display.
    *
    * @param {Integer} duration The number of seconds for the animation to complete.
    */
    this.setAnimationDuration = function(duration) {
        _duration = duration;
        _status_style.animationDuration = _duration+'s';
        _time_left = duration * 1000;
    }


    /**
    * Sets the color of the loading bar.
    *
    * @param {string} color The color of the Loader bar; either: Red|Green|Orange|rgb value
    */
    this.setLoaderColor = function(color) {
        var patt = /rgb/;
        if (color == "Red")
        {
            _status_style.backgroundImage = 'linear-gradient(to bottom, #f0a3a3, #f42323)';
            _status_style.backgroundColor = '#f42323';
        }
        else if (color == "Orange")
        {
            _status_style.backgroundImage = 'linear-gradient(to bottom, #f1a165, #f36d0a)';
            _status_style.backgroundColor = '#f36d0a';
        }
        else if (color == "Green")
        {
            _status_style.backgroundImage = 'linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%)';
            _status_style.backgroundColor = 'rgb(43, 194, 83)';
        }
        else if (patt.test(color)) {
            _status_style.backgroundImage = 'linear-gradient(to bottom, '+ color +' 37%, '+ color +' 69%)';
            _status_style.backgroundColor = color;
        }
    }

    /**
    * Sets the background color of the loading bar.
    *
    * @param {string} color The color of the Loader bar; either: initial|rgb value
    */
    this.setLoaderBackgroundColor = function(color) {
        _loader_style.background = color;
    }



    /**
    * Sets the class of the text below the loading bar
    *
    * @param {class} className Name of the class to give to the text.
    */
    this.setTextClass = function(className){

        if (_has_text == false) {
            _dom_loader_container.appendChild(_dom_status_text);
            _has_text = true;
        }
        _dom_status_text.className = className;
    }


    /**
    * Sets text to display below the bar
    *
    * @param {string[]} text_to_show Array of Strings to display.
    * @param {String} [mode=last_show_before_end] Adjust the timing of the text display. 
    *                  Options are: 
    *                   last_show_before_end - shows the last string before the time is up
    *                   last_show_after_end - shows the last string once the time is up
    */
    this.setTextChange = function(text_to_show, mode = 'last_show_before_end') {

        if (_has_text == false) {
            _dom_loader_container.appendChild(_dom_status_text);
            _has_text = true;
        }

        var _t = 0;
        if (mode == 'last_show_before_end'){
            var _switch_every = parseInt(_time_left / text_to_show.length);
            _dom_status_text.textContent = text_to_show[_t];
        }
        else if (mode == 'last_show_after_end') {
            if (text_to_show.length > 1){
                var _switch_every = parseInt(_time_left / (text_to_show.length - 1));
                _dom_status_text.textContent = text_to_show[_t];}
            else 
                var _switch_every = _time_left;
        }
        else console.log("invalid mode type. check documentation.");
        //var _switch_every = parseInt(_time_left / text_to_show.length);
        var _switch = _time_left - _switch_every;

        function last_show_before_end() {
            _time_left -= 10;
            if (_time_left <= 0){
                _dom_status_text.textContent = text_to_show[_t];
                clearInterval(i);
            }
            else if (_time_left < _switch) {
                _t ++;
                 _dom_status_text.textContent = text_to_show[_t];
                _switch -= _switch_every;
            }
        };
        function last_show_after_end() {
            _time_left -= 10;
            if (_time_left <= 0){

                if (text_to_show.length != 1) _t ++;

                _dom_status_text.textContent = text_to_show[_t];
                console.log("last text " + _dom_status_text.textContent);
                clearInterval(i);
            }
            else if (_time_left < _switch) {
                 _t ++;
                 _dom_status_text.textContent = text_to_show[_t];
                _switch -= _switch_every;
            }
        };
        if (mode == 'last_show_before_end'){
            var i = setInterval(last_show_before_end, 10);}
        else if (mode == 'last_show_after_end') {
            var i = setInterval(last_show_after_end, 10);}
        else console.log("invalid mode type. check documentation.");


    }
}