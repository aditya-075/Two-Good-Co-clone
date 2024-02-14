function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimation()

function navbarAnimation(){
    var g = gsap.timeline();
    g.to("#nav1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            //markers:true,
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
    })
    gsap.to("#nav2 #links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            //markers:true,
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
    })
}
navbarAnimation()

function videoContAnimation(){
var vcon=document.querySelector("#video-container");
var vbtn=document.querySelector("#play")
vcon.addEventListener("mouseenter",function(){
    //vbtn.style.opacity=1
    //vbtn.style.scale=1
    gsap.to(vbtn,{
        opacity:1,
        scale:1,
    })
})
vcon.addEventListener("mousemove",function(dets){
    gsap.to(vbtn,{
        left:dets.x-70,
        top:dets.y-80,
    })
})
vcon.addEventListener("mouseleave",function(){
    gsap.to(vbtn,{
        opacity:0,
        scale:0,
    })
})
}
videoContAnimation()

function loadingAnimation(){
gsap.from("#page1 h1",{
    y:100,
    opacity:0,
    delay:0.5,
    duration:0.9,
    stagger:0.3,
})
gsap.from("#page1 video",{
    scale:0.8,
    opacity:0,
    delay:1.3,
    duration:0.4,
})
}
loadingAnimation()

function cursorAnimation(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y,
        })
    })
    var imghover = document.querySelectorAll(".child");
    imghover.forEach(function(val){
        val.addEventListener("mouseenter",function(){
                gsap.to("#cursor",{
                    transform: 'translate(-50%,-50%) scale(1)',
                })
        })
        val.addEventListener("mouseleave",function(){
                gsap.to("#cursor",{
                    transform: 'translate(-50%,-50%) scale(0)',
                })
        })    
    })
}
cursorAnimation()

function elemBoxAnimation(){
    var box=document.querySelectorAll("#page2 .elem .box").forEach(function(val){
        val.addEventListener("mouseenter",function(){
            gsap.to(val,{
                height:"220px",
            })
        })
        val.addEventListener("mouseleave",function(){
            gsap.to(val,{
                height:"50px",
            })
        })
    })
}
elemBoxAnimation()


gsap.from("#page2 #elements .elem",{
    opacity:0,
    stagger:0.1,
    x:20,
    scrollTrigger:{
        trigger:"#page2",
        scroller:"#main",
        //markers:true,
        start:"top 60%",
        end:"top 40%",
        scrub:2,
    }
})
gsap.from("#page3 .child",{
    opacity:0,
    stagger:0.2,
    x:-40,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        // markers:true,
        start:"top 50%",
        end:"top 40%",
        scrub:1,
    }
})
var t1=gsap.timeline();
t1.from("#page4 .reviewbox h1",{
    opacity:0,
    y:20,
    stagger:0.5,
    delay:2,
    duration:0.9,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        start:"top 70%",
        //markers:true,
        end:"top 50%",
        scrub:1,
    }
})
var t2=gsap.timeline();
t2.from("#footer #footer-container #flogo svg",{
    opacity:0,
    rotate:90,
    duration:0.9,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        start:"top 20%",
        end:"top 0%",
        //markers:true,
        scrub:1,
    }
})
