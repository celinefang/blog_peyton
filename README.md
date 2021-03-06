个人网站 ([暗流](http://www.peytonzhao88.cn))
===

## 特点
* 引用了“百度脑图”项目，将脑图和博文融为一体。脑图的优势为将知识结构化、可视化地结合在一起，非常适合于知识之间关系的表达；而博客文章则是可以讨论前因后果，从而可以将某个知识点讲得很细。本网站将两者结合起来，脑图使得我的知识体系得到较好的梳理和组织，而对具体的某个知识点则可以用博客文章的形式全面的展现出来。
* 动态页面。本个人网站有供用户访问的前台页面，也有方便我进行内容维护后台的管理页面。两者出于不同的考虑，采用了不同的架构方式。如前台页面没有用AngularJS等框架，只在某些页面应用了bootstrap包，包括ajax等请求都是自己写的，这是出于性能的考量。而后台页面为了方便对内容进行管理，采用了AngularJS来实现，这是出于方便项目搭建的考量。
* 响应式设计。在设计期间，笔者便考虑到了制作响应式的界面，所以很多地方采用了flexbox来考虑响应式。但是flexbox有时对于某些情况也无能为力，比如页面过窄时，结构要发生大的变化时，flexbox是无能为力的，此时应该进行媒体查询，应用相关的结构。媒体查询目前做的并不足够，日后会慢慢补上的。
* 安全：可以启用HTTPS，来保证用户和笔者的安全。对于用户而言，可以选择是否使用HTTPS，其实基本不存在安全问题。而对于笔者而言，在登录界面则是强制要求使用HTTPS，来保证密码的安全传输。好吧，其实应该没什么人会黑我的这个个人网站吧，没价值呀。
* 状态。使用Cookie来进行管理员状态的管理。
* 后端出于构建方便的考虑，采用了Node.js来做后端。博文及脑图数据等，大量都是文本或者JSON格式，所以不适合使用传统的sql数据库，因而采用了和Node.js配合良好的MongoDB来实现持久化。
* 服务器，用了腾讯云的云服务器和域名，只要1块钱呀！真是是太爽了，感谢腾讯。话说，真的好想去腾讯呀。

## 其他
* 兼容性：兼容性考虑的并不多，目前兼容性越来越不是问题了。我在使用属性的时候，也会去can i use去查询，大范围应用的属性就直接用了。不支持IE。。因为我很多时候用Chrome或者火狐。个人网站，不考虑那么多兼容性也无所谓啦，任性一下。
* 还有两个页面没有完成，一个是储物室，一个是留言。留言准备下一步就做吧。储物室现在想想有些鸡肋，有可能改成其他的，或者干脆不要了。
