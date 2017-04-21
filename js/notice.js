var ajax = function (conf) {
    var method = conf.method;
    var url = conf.url;
    var data = conf.data;
    var success = conf.success;
    var dataType = conf.dataType;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (method == 'GET' || method == 'get') {
        xhr.send(null);
    } else if (method == 'POST' || method == 'post') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            success(JSON.parse(xhr.responseText));

        }
    };
    
}

$(function() {
    var page = 1;
    var size = 5;

    $('.content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page += 1;
            var result = '';

            ajax({

                method: 'GET',
                url: 'http://www.pumbf.me/emergencytask/public/index.php/api/Article/notice?page='+page+'&size='+size,
                dataType: 'json',

                success: function(res) {
                    // console.log(page);
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
                        $('.article').append(result);
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
});