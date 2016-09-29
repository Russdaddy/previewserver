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
    .set(hand1,{transformOrigin:"0% 0%",scale:1.7})
    .set(hand2,{transformOrigin:"0% 100%",scale:1.4,x:83,y:100})
    .set(hand3,{transformOrigin:"0% 100%",scale:1.4,x:50,y:120})
    .set(hand5,{transformOrigin:"0% 0%",scale:1.8,y:90})
    .set(ef_group,{x:5})
    .set(plateNapkin,{x:5,scale:1.2})
    .set(chipsBasket,{x:-5,scale:1.2})
    // .set(cheese,{scale:1.4})
    // .set(melted_cheese,{scale:1.45})
    .from(velveeta,.5,{x:-dimensions.width,ease:Power3.easeOut})
    .from(cheese,.3,{scale:0,ease:Back.easeOut},"+=.2")
    .add("hand","+=.8")
    .from(hand_group,.3,{y:-20,x:parseInt(getComputedStyle(hand_top).width)},"hand")
    .from(rotel,.3,{y:-40,x:parseInt(getComputedStyle(hand_top).width) / 2},"hand+=.1")
    .to([hand_top,hand_bottom],.3,{y:-20,x:parseInt(getComputedStyle(hand_top).width),ease:Quad.easeIn},"+=1")
    // .to([rotel,cheese],.4,{opacity:0},"melt")
    .from(melted_cheese,.4,{opacity:0},"-=.2")
    // .from(melted_cheese,.6,{scale:.8},"melt")
    .to(velveeta,.5,{x:-dimensions.width,ease:Power3.easeIn},"melt")
    .add("partyProps")
    // .from(soda,.3,{scale:0,ease:Back.easeOut},"partyProps")
    .from(chipsBasket,.3,{scale:0,ease:Back.easeOut},"partyProps+=.4")
    .from(plateNapkin,.3,{scale:0,ease:Back.easeOut},"partyProps+=.1")
    // .from(cup2,.3,{scale:0,ease:Back.easeOut},"partyProps+=.3")

    .add("handsIn")
    .from(hand1,.5,{x:-dimensions.width,y:-dimensions.height,ease:Power3.easeOut},"handsIn")
    .to(hand1,.5,{x:-dimensions.width,y:-dimensions.height,ease:Power3.easeIn},"handsIn+=.5")
    .to(hand1,.5,{x:-10,y:0,ease:Power3.easeOut},"handsIn+=2")
    .to(hand1,.5,{x:-dimensions.width,y:-dimensions.height,ease:Power3.easeIn},"handsIn+=2.8")
    .to(hand1,.5,{x:0,y:0,ease:Power3.easeOut},"handsIn+=3.9")
    
    .from(hand2,.5,{x:dimensions.width,ease:Power3.easeOut},"handsIn+=.2")
    .to(hand2,.5,{x:dimensions.width,ease:Power3.easeIn},"handsIn+=1.1")
    .to(hand2,.5,{x:83,ease:Power3.easeOut},"handsIn+=1.6")
    .to(hand2,.5,{x:dimensions.width,ease:Power3.easeIn},"handsIn+=2.7")
    
    .from(hand3,.5,{x:dimensions.width,ease:Power3.easeOut},"handsIn+=.8")
    .to(hand3,.5,{x:dimensions.width,ease:Power3.easeIn},"handsIn+=1.4")
    .to(hand3,.5,{x:50,rotation:8,ease:Power3.easeOut},"handsIn+=2")
    .to(hand3,.5,{x:dimensions.width,ease:Power3.easeIn},"handsIn+=3")
    .to(hand3,.5,{x:50,ease:Power3.easeOut},"handsIn+=3.5")
    
    // .from(hand4,.5,{y:dimensions.height,ease:Power3.easeOut},"handsIn+=.2")
    // .to(hand4,.5,{y:dimensions.height,ease:Power3.easeIn},"handsIn+=1.8")
    // .to(hand4,.5,{y:0,ease:Power3.easeOut},"handsIn+=2.4")
    // .to(hand4,.5,{y:dimensions.height,ease:Power3.easeIn},"handsIn+=3.4")
    
    .from(hand5,.5,{x:-dimensions.width,ease:Power3.easeOut},"handsIn+=.8")
    .to(hand5,.5,{x:-dimensions.width,ease:Power3.easeIn},"handsIn+=1.5")
    .to(hand5,.5,{x:0,rotation:8,ease:Power3.easeOut},"handsIn+=2.3")
    .to(hand5,.5,{x:-dimensions.width,ease:Power3.easeIn},"handsIn+=3")
    .to(hand5,.5,{x:0,ease:Power3.easeOut},"handsIn+=3.8")    
    
    .from(bg2,.5,{opacity:0},"-=1")
    .fromTo(ef_queso,.3,{scale:0,ease:Back.easeOut},{scale:1.5,x:-6,y:12,ease:Back.easeOut},"ef")
    .add("ef","+=.4")
    .to(ef_queso,.3,{scale:1,y:4},"ef")
    .to(logos,.5,{opacity:0},"ef")
    .from(ef_velveeta,.5,{x:-dimensions.width,ease:Power3.easeOut},"ef")
    .from(ef_rotel,.5,{x:dimensions.width,ease:Power3.easeOut},"ef")
    .from(cta,.3,{scale:0,ease:Back.easeOut},"ef")
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