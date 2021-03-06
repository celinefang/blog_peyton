var express = require('express');
var router = express.Router();

var Models = require('../database/db.js');

//主界面
router.get('/',function(req, res){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        res.render('blogs_peyton', { layout: 'main_peyton', sources: [
                { source: "https://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" },
                { source: "https://cdn.bootcss.com/codemirror/4.8.0/codemirror.min.css" },
                { source: "/bower_components/hotbox/hotbox.css" },
                { source: "/bower_components/kityminder-core/dist/kityminder.core.css" },
                { source: "/bower_components/color-picker/dist/color-picker.min.css" },
                { source: "/bower_components/kityminder-editor/dist/kityminder.editor.min.css"},
                { source: "/css/blogs_peyton.css" }
            ]});
    }else{
        Models.Minder.findOne({name: 'minder'}, function(err,minder){
            if(err){
                console.log(err);
                res.status(400).send('{"show":"数据未成功获取~"}');
            }else{
                res.render('blogs',{ sources: [
                        { source: "https://cdn.bootcss.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" },
                        { source: "/css/blogs.css"}
                    ], minderData: minder.content });
            }
        });
    }
    
});

//获取脑图数据
router.get('/minder', function(req, res, next){
    Models.Minder.findOne({name: 'minder'}, function(err,minder){
        if(err){
            console.log(err);
            res.status(400).send('{"show":"数据未成功获取~"}');
        }else{
            res.status(200).send(minder.content);
        }
    });
});

//新增脑图数据，只有peyton可以
router.post('/minder', function(req, res, next){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        var minderNew = new Models.Minder({
            name: req.body.root.data.text,
            content: JSON.stringify(req.body)
        }).save(function(err){
            if(err){
                console.log(err);
                res.status(400).send('{"show":"保存数据出错~"}');
            }else{
                res.status(200).send('{"show":"数据已保存~"}');
            }
        });
    }
});

//更新脑图数据，只有peyton可以
router.put('/minder', function(req, res, next){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        Models.Minder.update({name: 'minder'}, {
            content: JSON.stringify(req.body)
        },{},function(err){
            if(err){
                res.status(400).send('{"show":"保存数据出错~"}');
            }else{
                res.status(200).send('{"show":"数据已保存~"}');
            }
        });
    }
});


//获取博文
router.get('/blog', function(req,res,next){
    Models.Post.find({ category: req.query.category }, function(err, posts){
        if(err){
            console.log(err);
            res.status(400).send('{"show":"数据未成功获取~"}');
        }else{
            res.status(200).send(JSON.stringify(posts));
        }
    });
});

//新增博文，peyton
router.post('/blog', function(req, res, next){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        //category是否存在？
        var postNew = new Models.Post({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        }).save(function(err, post){
            if(err){
                console.log(err);
                res.status(400).send('{"show":"保存数据出错~"}');
            }else{
                res.status(200).send(JSON.stringify(post));
            }
        });
    }
});

//更新博文，peyton
router.put('/blog', function(req,res,next){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        Models.Post.update({_id: req.body.id }, {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        },{},function(err){
            if(err){
                res.status(400).send('{"show":"请检查标题是否重复~"}');
            }else{
                res.status(200).send('{"show":"更新成功"}');
            }
        });
    }
});

//删除博文
router.delete('/blog', function(req,res,next){
    if(req.query.user === "peyton"){
        var cookie = req.signedCookies.signed_permit;
        if(cookie !== 'sudo'){
            res.redirect('https://' + req.hostname + '/login');
        }

        Models.Post.remove({_id: req.query.id},function(err){
            if(err){
                res.status(500).send('{"show":"出现错误"}');
            }else{
                res.status(200).send('{"show":"删除成功"}');
            }
        });
    }
});

module.exports = router;