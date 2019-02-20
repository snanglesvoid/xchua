/*!
 * jQuery Tools v1.2.5 - The missing UI library for the Web
 * 
 * scrollable/scrollable.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */

/**
 * .disableTextSelect - Disable Text Select Plugin
 *
 * Version: 1.1
 * Updated: 2007-11-28
 *
 * Used to stop users from selecting text
 *
 * Copyright (c) 2007 James Dempster (letssurf@gmail.com, http://www.jdempster.com/category/jquery/disabletextselect/)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 **/

/**
 * Requirements:
 * - jQuery (John Resig, http://www.jquery.com/)
 **/
(function($) {
    if ($.browser.mozilla) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : 'none'
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : ''
                });
            });
        };
    } else if ($.browser.msie) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('selectstart.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('selectstart.disableTextSelect');
            });
        };
    } else {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('mousedown.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('mousedown.disableTextSelect');
            });
        };
    }
})(jQuery);


(function($) {

	$.fn.linedtextarea = function(options) {
		
		// Get the Options
		var opts = $.extend({}, $.fn.linedtextarea.defaults, options);
		
		
		/*
		 * Helper function to make sure the line numbers are always
		 * kept up to the current system
		 */
		var fillOutLines = function(codeLines, h, lineNo){
			while ( (codeLines.height() - h ) <= 0 ){
				if ( lineNo == opts.selectedLine )
					codeLines.append("<div class='lineno lineselect'>" + lineNo + "</div>");
				else
					codeLines.append("<div class='lineno'>" + lineNo + "</div>");
				
				lineNo++;
			}
			return lineNo;
		};
		
		
		/*
		 * Iterate through each of the elements are to be applied to
		 */
		return this.each(function() {
			var lineNo = 1;
			var textarea = $(this);
			
			/* Turn off the wrapping of as we don't want to screw up the line numbers */
			textarea.attr("wrap", "off");
			textarea.css({resize:'none'});
			var originalTextAreaWidth	= textarea.outerWidth();

			/* Wrap the text area in the elements we need */
			textarea.wrap("<div class='linedtextarea'></div>");
			var linedTextAreaDiv	= textarea.parent().wrap("<div class='linedwrap' style='width:" + originalTextAreaWidth + "px'></div>");
			var linedWrapDiv 			= linedTextAreaDiv.parent();
			
			linedWrapDiv.prepend("<div class='lines' style='width:50px'></div>");
			
			var linesDiv	= linedWrapDiv.find(".lines");
			linesDiv.height( textarea.height() + 6 );
			
			
			/* Draw the number bar; filling it out where necessary */
			linesDiv.append( "<div class='codelines'></div>" );
			var codeLinesDiv	= linesDiv.find(".codelines");
			lineNo = fillOutLines( codeLinesDiv, linesDiv.height(), 1 );

			/* Move the textarea to the selected line */ 
			if ( opts.selectedLine != -1 && !isNaN(opts.selectedLine) ){
				var fontSize = parseInt( textarea.height() / (lineNo-2) );
				var position = parseInt( fontSize * opts.selectedLine ) - (textarea.height()/2);
				textarea[0].scrollTop = position;
			}

			
			/* Set the width */
			var sidebarWidth					= linesDiv.outerWidth();
			var paddingHorizontal 		= parseInt( linedWrapDiv.css("border-left-width") ) + parseInt( linedWrapDiv.css("border-right-width") ) + parseInt( linedWrapDiv.css("padding-left") ) + parseInt( linedWrapDiv.css("padding-right") );
			var linedWrapDivNewWidth 	= originalTextAreaWidth - paddingHorizontal;
			var textareaNewWidth			= originalTextAreaWidth - sidebarWidth - paddingHorizontal - 20;

			textarea.width( textareaNewWidth );
			linedWrapDiv.width( linedWrapDivNewWidth );
			

			
			/* React to the scroll event */
			textarea.scroll( function(tn){
				var domTextArea		= $(this)[0];
				var scrollTop 		= domTextArea.scrollTop;
				var clientHeight 	= domTextArea.clientHeight;
				codeLinesDiv.css( {'margin-top': (-1*scrollTop) + "px"} );
				lineNo = fillOutLines( codeLinesDiv, scrollTop + clientHeight, lineNo );
			});


			/* Should the textarea get resized outside of our control */
			textarea.resize( function(tn){
				var domTextArea	= $(this)[0];
				linesDiv.height( domTextArea.clientHeight + 6 );
			});

		});
	};

  // default options
  $.fn.linedtextarea.defaults = {
  	selectedLine: -1,
  	selectedClass: 'lineselect'
  };
})(jQuery);

(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return m.add(n)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.children(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(1,a)},prev:function(a){return f.move(-1,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children("."+e.clonedClass+":last").before(b),h.children("."+e.clonedClass+":first").replaceWith(b.clone().addClass(e.clonedClass))):h.append(b),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}}),f.seekTo(0,0,function(){})}var m=c(b,e.prev).click(function(){f.prev()}),n=c(b,e.next).click(function(){f.next()});!e.circular&&f.getSize()>1&&(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(m.toggleClass(e.disabledClass,b<=0),n.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||m.addClass(e.disabledClass)),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var o={};h[0].ontouchstart=function(a){var b=a.touches[0];o.x=b.clientX,o.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=o.x-b.clientX,d=o.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(e.keyboard&&!b.altKey&&!b.ctrlKey&&!a(b.target).is(":input")){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);