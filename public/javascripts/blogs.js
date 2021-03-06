
(function(){
    var ajax = (function(){
        var request = function(method, value, path, success, failure){
            if(!window.XMLHttpRequest){
                alert('浏览器不支持XMLHttpRequest。换句话说，浏览器太low了，换个吧~');
                return;
            }

            var xhr = new XMLHttpRequest();

            xhr.open(method, path, true);

            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    if((xhr.status === 200)){
                        if(success){
                            success(JSON.parse(xhr.responseText));
                        }
                    }else{
                        if(failure){
                            failure(JSON.parse(xhr.responseText));
                        }
                    }
                }
            };

            //要修改请求内容类型，这样后端才能解析
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(value));
        };
        return {
            get: function(path, success, failure){
                request('get', null, path, success, failure);  
            },
            post: function(value, path, success, failure){
                request('post', value, path, success, failure);
            },
            put: function(value, path, success, failure){
                request('put', value, path, success, failure);
            },
            delete: function(value, path, success, failure){
                request('delete', value, path, success, failure);
            }
        };
    })();

    var km = window.km = new kityminder.Minder();
    km.setup('#minder-view');
    km.disable();

    var pushBlogs = function(blogs){
        var blogsContainer = document.getElementById('blogsContainer');
        blogsContainer.style.display = 'none';

        var blogsHtml = '';

        blogs.forEach(function(blog){
            var createTime = new Date(blog.createDate);
            var updateTime = new Date(blog.updateDate);
            var html = '<p class="time-line">'
                    + '<time datetime="'+blog.createDate+'">' + createTime.toLocaleDateString() + '</time> 创建；  '
                    + '<time datetime="'+blog.updateDate+'">' + updateTime.toLocaleDateString() + '</time>更新'
                    + '</p>'
                    + '<div class="blog-container">'
                        + '<article>' + marked(blog.content) + '</article>'
                    + '</div>';
            blogsHtml += html;
        });

        blogsContainer.innerHTML = blogsHtml;
        blogsContainer.style.display = 'block';
    };

    km.on('selectionchange',function(){
        if(!km.getSelectedNodes().length){
            return;
        }

        ajax.get('/blogs/blog?category='+km.getSelectedNodes()[0].data.text, 
            function(res){
                pushBlogs(res);
            },function(res){
                alert(res.show);
            });
    });
})();

// var ajax = (function(){
//     var request = function(method,url,data){
//         return new Promise(function(resolve,reject){
//             var xhr = new XMLHttpRequest();
//             xhr.open(method, url, true);
//             xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//             xhr.send(JSON.stringify(data));

//             xhr.onreadystatechange = function(){
//                 if(xhr.readyState === 4){
//                     if(/^2\d{2}/.test(xhr.status)){
//                         resolve(JSON.parse(xhr.responseText));
//                     }else if(/^(4|5)\d{2}/.test(xhr.status)){
//                         reject(xhr.status + xhr.statusText);
//                     }
//                 }
//             };
//         });
//     };
//     return {
//         get: function(url){
//             return request('GET', url, null);
//         },
//         post: function(url, data){
//             return request('POST', url, data);
//         },
//         put: function(url, data){
//             return request('PUT', url, data);
//         },
//         delete: function(url, data){
//             return request('DELETE', url, null);
//         }
//     };
// })();