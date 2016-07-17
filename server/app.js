var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');

// routes模块的功能是将所有模块加载到内存中
var routes = require('./routes/routes');

var app = express();

// 设置监听端口
app.set('port', 3000);

// view engine setup 设置视图组件从哪来
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

var server = http.createServer(app);
server.listen(app.get('port'));

server.on('listening', () => {
    console.log('------ Listening on port' + app.get('port') + '------');
});

// 简单的错误处理
server.on('error', (error) => {
    switch (error.code) {
        case 'EACCES':
            console.error('需要权限许可');
            process.exit(1);
            break;
        case 'ADDRINUSE':
            console.error('端口已被占用');
            process.exit(1);
            break;
        default:
            throw error;
    }

});

// 加载路由
async.waterfall([
    callback => {
        routes(app);
        callback(null);
    },
    () => {
        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.render('404/error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('404/error', {
                message: err.message,
                error: {}
            });
        });
    }
]);
