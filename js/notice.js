var tab = $$('.tab').children;
var notice = $$('#notice');
var study = $$('#studyMaterial');
var news = $$('#news');

notice.addEventListener('touchend', function(e) {
    keyWord = 'notice';
    e.preventDefault();
    set('.notice', 0);
    add(keyWord, '.notice');
    console.log($$('.dropload-down'));
    $('.dropload-down')[0].remove();
    console.log(keyWord);
})

study.addEventListener('touchend', function(e) {
    keyWord = 'studyMaterial';
    e.preventDefault();
    set('.study', 1);
    add(keyWord, '.study');
    console.log($$('.dropload-down'));
    $('.dropload-down')[0].remove();       
    console.log(keyWord);
})

news.addEventListener('touchend', function(e) {
    keyWord = 'news';
    e.preventDefault();
    set('.news', 2);
    add(keyWord, '.news');
    $('.dropload-down')[0].remove();    
    console.log(keyWord);
})


function add(word, area) {
    var page = 1;
    var size = 5;

    $('.content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page += 1;
            var result = '';

            ajax({

                method: 'GET',
                url: 'http://www.pumbf.me/emergencytask/public/index.php/api/Article/'+word+'?page='+page+'&size='+size,
                dataType: 'json',

                success: function(res) {
                    var arrLen = res.data.length;
                    // console.log(res.data);
                    // console.log(res.data.length);
                    if (arrLen > 0) {
                        for (var i = 0; i < arrLen; i++) {
                            result += '<a class="news-link" href="' + res.data[i].target_url + '">' + '<div class="news-img">' + '<img src="' + res.data[i].pictures.photo_src + '" alt="">' + '</div>' + '<div class="news-content">' + '<h2 class="news-title">' + res.data[i].title + '</h2>' + '<p class="news-desc">' + res.data[i].content + '</p>' + '</div>' + '</a>';
                        }
                        // 如果没有数据
                    } else if (arrLen == 0) {
                        console.log(0);
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function() {
                        // 插入数据到页面，放到最后面
                        $(area).append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    }, 1000);
                },

                error: function(xhr, type){
                    console.log('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            })
        }
    });
};
add('notice', '.notice');

function set(ele, num) {
    for (var i = 0; i < 3; i++) {
        $$('.area')[i].style.display = 'none';
        tab[i].className = '';
    }
    $$(ele).style.display = 'block';
    tab[num].className = 'active';
}