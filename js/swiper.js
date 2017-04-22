var swiper = $$('.swiper');
var banner = $$('.banner');
var button = $$('.indicator').children;
var startPoint;
var endPoint;
var disX;
var startEle = 0;
var index = 0;
var dis = 0;

ajax({
        method: 'GET',
        url: 'http://www.pumbf.me/emergencytask/public/index.php/api/Article/hotArticle?page=1&size=3',
        dataType: 'json',
        success: function(res) {
            var imgs = '';
            var imgArr = res.data;
            var btn;
            for (var i = 0; i < imgArr.length; i++) {
                imgs += '<div class="banner"><a href="' + imgArr[i].target_url + ' alt="">'
                        + '<img src="'+ imgArr[i].pictures[0].photo_src + ' alt="">'
                        + '<p class="img-des">' + imgArr[i].title + '</p>' + '</div>' + '</a>';
            }
            swiper.style.width = 10 * imgArr.length + 'rem'; 
            swiper.innerHTML = imgs;
        }    
})

swiper.addEventListener('touchstart', function (e) {
    startPoint = e.changedTouches[0].pageX;
    startEle = trans(swiper, "translateX");
}); 
swiper.addEventListener('touchmove', function(e) {
    endPoint = e.changedTouches[0].pageX;
    disX = endPoint - startPoint;
    trans(swiper, "translateX", (disX + startEle) / 75 + dis);
});
swiper.addEventListener('touchend', function (e) {
    if (disX < 0 && dis > -10*(banner.length-1)) {
        dis = dis - 10;
        index++;
    } else if (disX > 0 && dis < 0) {
        dis = dis + 10;
        index--;
    } 
    buttonChange(button);
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

function buttonChange(ele) {
    swiper.style.transition = "300ms";
    trans(swiper, "translateX", dis);
    for(var i = 0; i < ele.length; i++) {
        ele[i].className = "";
    };
    ele[index].className = "on";
}
ajax({

    method: 'GET',
    url: 'http://www.pumbf.me/emergencytask/public/index.php/api/Article/notice?page=1&size=5',
    dataType: 'json',

    success: function(res) {
        var arrLen = res.data.length;
        // console.log(res.data);
        // console.log(res.data.length);
        var result = '';
        if (arrLen > 0) {
            for (var i = 0; i < arrLen; i++) {
                result += '<a class="news-link" href="' + res.data[i].target_url + '">' + '<div class="news-img">' + '<img src="' + res.data[i].pictures.photo_src + '" alt="">' + '</div>' + '<div class="news-content">' + '<h2 class="news-title">' + res.data[i].title + '</h2>' + '<p class="news-desc">' + res.data[i].content + '</p>' + '</div>' + '</a>';
            }
        $$('.notice').innerHTML = result;
        }
    }
});
