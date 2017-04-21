const $$ = function (selector) {
    if (document.querySelectorAll(selector).length === 1) {
        return document.querySelector(selector);
    } else {
        return document.querySelectorAll(selector);
    }
};

let swiper = $$('.swiper');
let banner = $$('.banner');
let tab = $$('.indicator').children;
let startPoint;
let endPoint;
let disX;
let startEle = 0;
let index = 0;
let dis = 0;

swiper.addEventListener('touchstart', (e) => {
    startPoint = e.changedTouches[0].pageX;
    startEle = trans(swiper, "translateX");
}); 
swiper.addEventListener('touchmove', (e) => {
    endPoint = e.changedTouches[0].pageX;
    disX = endPoint - startPoint;
    trans(swiper, "translateX", (disX + startEle) / 75 + dis);
});
swiper.addEventListener('touchend', (e) => {
    if (disX < 0 && dis > -20) {
        dis = dis - 10;
        index++;
    } else if (disX > 0 && dis < 0) {
        dis = dis + 10;
        index--;
    } 
    tabChange(tab);
});

function trans(ele, attr, val) {
    if (!ele.transform) {
        ele.transform = {};
    };

    if (arguments.length > 2) {

        ele.transform[attr] = val;
        var sval = "";
        for(var s in ele.transform){
            if(s == "translateX"){
                sval += s + "("+ele.transform[s] +"rem)";
            }
            ele.style.WebkitTransform = ele.style.transform = sval;
        }
    } else {
        val = ele.transform[attr];
        if (typeof val == "undefined") {
            if (attr == "translateX") {
                val = 0;
            }
        };
        return val;
    } 
}

function tabChange(ele) {
    swiper.style.transition = "300ms";
    trans(swiper, "translateX", dis);
    for(let i = 0; i < ele.length; i++) {
        ele[i].className = "";
    };
    ele[index].className = "on";
}
