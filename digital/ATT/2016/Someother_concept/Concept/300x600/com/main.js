//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;

//INITIALIZE
function init(){
    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();
    
    animate();
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */

    legal_hotspot.addEventListener('click',function(){
        showLegals();
    })

    x.addEventListener('click',function(){
        hideLegals();
    });

    cta.addEventListener('mouseover',function(){
        TweenLite.to(cta_bg,.2,{scale:1.1})
    })
    cta.addEventListener('mouseleave',function(){
        TweenLite.to(cta_bg,.2,{scale:1})
    })

    // LEGALS scroll buttons
    $(".legalPopUp  .scrollUp").mousedown(function(){
        scrollUpButtonPressed = true;
        callScrollLegals("down");
        
    });
    $(".legalPopUp  .scrollUp").mouseup(function(){
        scrollUpButtonPressed = false;
    });

    $(".legalPopUp  .scrollDown").mousedown(function(){
        scrollDownButtonPressed = true;
        callScrollLegals("up");
    });
    $(".legalPopUp  .scrollDown").mouseup(function(){
        scrollDownButtonPressed = false;
    });


    $(".legalPopUp  .scrollUp").mouseup(function(){
        scrollUpButtonPressed = false;
    });

    $(".legalPopUp .textWrapper").mouseover(function(event){
        $_mouseIsOverLegalTextToScroll = true;
    });
    $(".legalPopUp .textWrapper").mouseout(function(event){
        $_mouseIsOverLegalTextToScroll = false;
    });

    $(".legalPopUp .textWrapper").mouseout(function(event){
        $_mouseIsOverLegalTextToScroll = false;
    });


    var elementDetectingScroll = document.getElementById("legalTextWrapper");
     if (elementDetectingScroll.addEventListener) {
      // IE9, Chrome, Safari, Opera
      elementDetectingScroll.addEventListener("mousewheel", MouseWheelHandler, false);
      // Firefox
      elementDetectingScroll.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
     }
     // IE 6/7/8
     else elementDetectingScroll.attachEvent("onmousewheel", MouseWheelHandler);

}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 

    //timeline animation here
    tl
    .set(legal_hotspot,{display:'none'})
    .from(copy1,.5,{opacity:0})
    .to(copy1,.5,{opacity:0},'+=2')
    .from(copy2,.5,{opacity:0})
    .to(copy2,.5,{opacity:0},'+=2')
    .from(copy3,.5,{opacity:0})
    .to(copy3,.5,{opacity:0},'+=2')
    .from(copy4,.5,{opacity:0})
    .from(ef_bg,.5,{opacity:0},'+=2')
    .staggerFrom([ef_copy,card,[cta,legal]],.5,{opacity:0},.2,"+=.2")
    .set(legal_hotspot,{display:'block'})

    //.call(returnTimer)
}

//LEGAL CODE
function showLegals(){
    $(".legalPopUp").css("display","block");
    TweenLite.to("#legalOverlay", 0.4, {alpha:0.85, ease:Expo.easeOut});
    document.getElementById("legalOverlay").style.display = "block";
    document.getElementById("legal_hotspot").style.display = "none";

    TweenLite.set($(".legalPopUp"), {x: 10, y:518, width:0, height:0, alpha:0});
 
    TweenLite.to($(".legalPopUp"), 0.5, {alpha: 1 ,ease:Expo.easeOut});
    TweenLite.to($(".legalPopUp"), 0.5, {x: 0, y: 0, width:270, height:518 , ease:Expo.easeOut});

    TweenLite.to($(".legalPopUp .textWrapper .legalText"), 0.2, {alpha:1 , ease:Expo.easeOut, delay:0.5});
    TweenLite.to($(".legalPopUp .x"), 0.5, {alpha:1 , ease:Expo.easeOut, delay:0.4});
    TweenLite.to($(".legalPopUp .scrollUp"), 0.5, {alpha:1 , ease:Expo.easeOut, delay:0.4});
    TweenLite.to($(".legalPopUp .scrollDown"), 0.5, {alpha:1 , ease:Expo.easeOut, delay:0.4});

}

function hideLegals(){
    document.getElementById("legal_hotspot").style.display = "block";
    TweenLite.to($(".legalPopUp .textWrapper .legalText"), 0.1, {alpha:0 , ease:Expo.easeOut, delay:0.2});
    TweenLite.to($(".legalPopUp .x"), 0.1, {alpha:0 , ease:Expo.easeOut, delay:0.2});
    TweenLite.to($(".legalPopUp .scrollUp"), 0.1, {alpha:0 , ease:Expo.easeOut, delay:0.2});
    TweenLite.to($(".legalPopUp .scrollDown"), 0.1, {alpha:0 , ease:Expo.easeOut, delay:0.2});

    
    TweenLite.to($(".legalPopUp"), 0.5, {x: 10, y:518, width:0, height:0, delay:0.2, onComplete:setDisplayNoneToLegalPopup});
    TweenLite.to($(".legalPopUp"), 0.4, {alpha: 1 ,ease:Expo.easeOut, delay:2});
    TweenLite.to("#legalOverlay", 0.5, {alpha:0, ease:Quad.easeOut, delay:0.2, onComplete:setDisplayNoneTolegalOverlay});

}


function setDisplayNoneTolegalOverlay(){$("#legalOverlay").css("display","none")};
function setDisplayNoneToLegalPopup(){$(".legalPopUp").css("display","none")};

// -> scroll
var callScrollLegals_timeoutID;
var scrollUpButtonPressed = false;
var scrollDownButtonPressed = false;
var $_mouseIsOverLegalTextToScroll = false;

function callScrollLegals(_direction)
{
    if(scrollUpButtonPressed || scrollDownButtonPressed)
    {
        scrollLegals(_direction);
        callScrollLegals_timeoutID = setTimeout(callScrollLegals, 50, _direction);
    }
    else 
    {
        //clearTimeout(callScrollLegals_timeoutID);
    }

}

function scrollLegals(_direction)
{
    _elementToScroll_height = $(".legalPopUp .textWrapper .legalText").height();
    _currentTop = $(".legalPopUp .textWrapper .legalText").position().top;
    _currentOffsetTop = $(".legalPopUp .textWrapper .legalText").offset().top;
    _currentOffsetLeft = $(".legalPopUp .textWrapper .legalText").offset().left;
    _elementToScroll_lineHeight = 12;
    

    if(_direction == "down" && _currentTop < 0)
    {   //console.debug("moving down"+_currentTop+$_elementToScroll_lineHeight);
        //TweenLite.to($(".legalPopUp .textWrapper .legalText"), 0.05, {y: _currentTop+_elementToScroll_lineHeight , ease:Expo.easeOut, overwrite:true });
        $(".legalPopUp .textWrapper .legalText").offset({ top: _currentOffsetTop+_elementToScroll_lineHeight, left: _currentOffsetLeft });
    }
    else if(_direction == "up" && _elementToScroll_height+_currentTop > $(".legalPopUp .textWrapper").height())
    {
        //TweenLite.to($(".legalPopUp .textWrapper .legalText"), 0.05, {y: _currentTop-_elementToScroll_lineHeight , ease:Expo.easeOut, overwrite:true });
        $(".legalPopUp .textWrapper .legalText").offset({ top: _currentOffsetTop-_elementToScroll_lineHeight, left: _currentOffsetLeft });
    }
}


function MouseWheelHandler(event)
{
 var delta = 0;
 
    if (!event) event = window.event;
 
    // normalize the delta
    if (event.wheelDelta) {
 
        // IE and Opera
        delta = event.wheelDelta / 60;
 
    } else if (event.detail) {
 
        // W3C
        delta = -event.detail / 2;
    }

    if(delta > 0)
    {
     scrollLegals("down");
    }
    else 
    {
     scrollLegals("up");
    }
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};