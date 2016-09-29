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
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime();

    var easing = Strong.easeInOut;
    var delay = "+=2";
    var timing = .8;
    //timeline animation here
    tl
    .set(cta,{display:'none'})
    .from(copy1,timing,{x:-dimensions.width,ease:easing})
    .add("seq01",delay)
    .to(copy1,timing,{x:dimensions.width,ease:easing},"seq01")
    .from(copy2,timing,{x:-dimensions.width,ease:easing},"seq01")
    .add("seq02",delay)
    .to(copy2,timing,{x:dimensions.width,ease:easing},"seq02")
    .from(copy3,timing,{x:-dimensions.width,ease:easing},"seq02")
    .add("seq03",delay)
    .to(copy3,timing,{x:dimensions.width,ease:easing},"seq03")
    .from(copy4,timing,{x:-dimensions.width,ease:easing},"seq03")
    .add("seq04","+=2.5")
    .to(copy4,timing,{x:dimensions.width,ease:easing},"seq04")
    .add("efseq","-=.5")
    .from(logo,.5,{scale:2,opacity:0,ease:easing},"efseq")
    .from(mohegan,.5,{y:dimensions.height,ease:easing})
    .set(cta,{display:'block'})
    .staggerFrom([date,cta],.5,{opacity:0})
    .call(returnTimer)
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