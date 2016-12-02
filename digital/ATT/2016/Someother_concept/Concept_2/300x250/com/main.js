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
    container.addEventListener('mouseover',function(){
        TweenLite.to(cta_fpo, .5, {backgroundPosition:"-400px -100px"});
    })
     container.addEventListener('mouseout',function(){
        TweenLite.to(cta_fpo, .5, {backgroundPosition:"0px 0px"});
    })
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 

    //timeline animation here
    tl
    .set(c2,{opacity:0},0)
    .to(gradient,2.7,{x:-740,y:-250, ease:Power0.easeNone},1.5)
    .to(gradient,2.2,{x:0,y:0, ease:Power0.easeNone },4.2)
    .from(c2a,.5,{opacity:0},4.5)
    .set(c1,{opacity:0},4.2)
    .set(c2,{opacity:1},4.2)
    .from(cta_fpo,1,{opacity:0},4.5)
    //.call(returnTimer)
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