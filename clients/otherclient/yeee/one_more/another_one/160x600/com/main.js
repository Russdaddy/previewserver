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

    //timeline animation here
    tl
    .set(queso,{y:60})
    .set(chip,{y:60})    
    .set(light,{scale:2})
    .set(lightFlash,{width:dimensions.width,height:dimensions.height,backgroundColor:"white"})
    .from(copy1,.4,{scale:0,ease:Back.easeOut})
    .set(light,{x:-10,y:350,transformOrigin:'50% 50%'})
    .add('together','+=2')
    .to(rotel,.5,{y:50,ease:Power3.easeOut},'together')
    .to(velveeta,.5,{y:-50,ease:Power3.easeOut},'together')
    .to(copy1,.4,{scale:0,ease:Back.easeIn},'together')
    .add('morph','-=.4')
    .fromTo(lightFlash,.2,{opacity:0},{opacity:.8},"morph+=.1")
    .set([velveeta,rotel],{opacity:0},"morph+=.2")
    .to(lightFlash,.2,{opacity:0},"morph+=.3")
    .from(queso,.5,{scale:0,ease:Back.easeOut},'morph+=.3')
    .from(light,.3,{scale:0},'morph+=.3')
    .add(lightRotate,'morph+=.3')
    .from(crowd1,.8,{x:dimensions.width,ease:Power3.easeOut},'crowd')
    .from(crowd2,.8,{x:-dimensions.width,ease:Power3.easeOut})
    .from(crowd3,.6,{y:dimensions.height,ease:Power3.easeOut})
    .from(ef_velveeta,.5,{x:-dimensions.width,ease:Power3.easeOut},'crowd')
    .from(ef_rotel,.5,{x:dimensions.width,ease:Power3.easeOut},'crowd')
    .from(chip,.2,{opacity:0},'crowd')
    .from(copy2,.5,{opacity:0})
    .to(copy2,.5,{opacity:0},"+=2")
    .add('ef')
    .from(ef_copy,.5,{opacity:0},'ef')
    .from(ef_bg,.5,{opacity:0},'ef')
    .to(light,.5,{opacity:0},'ef')
    .to(queso_group,.5,{scale:.7,x:10,y:105},'ef')
    .to(ef_group,.5,{y:3},'ef')
    .from(cta,.3,{scale:0,ease:Back.easeOut})
    .call(returnTimer)
}

function lightRotate(){
    TweenLite.to(light,10,{rotationZ:80})
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