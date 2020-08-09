var express = require('express');
var app = express();
// post의 요청 데이터를 받을 때 bodyParser 이용해야 함
var bodyParser = require('body-parser');

app.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});

// set view engine, 사용할 템플릿 엔진 
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

// 정적 파일을 서비스 하는 법, 'public'이라는 명을 권장
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Controller
app.get('/', (req, res) => {
    res.send('Hello home page');
});
app.get('/cat', (req, res) => {
    res.send('Hello Cat, <img src="/cat.jpg">');
});
app.get('/login', (req, res) => {
    res.send('<h1>Login please</h1>');
});
app.get('/dynamic', (req, res) => {
    var lis = '';
    for (let i = 0; i < 5; i++) {
        lis = lis + '<li>coding' + i + '</li>';
    }
    var date = Date();
    var output = 
    `<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Static Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
        <script src='main.js'></script>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
            ${lis}
        </ul>
        <br/>
        ${date}
    </body>
    </html>`
    res.send(output);
});
app.get('/template', (req, res) => {
    // temp 파일 렌더링해서 전송
    res.render('temp', {time: new Date, title: 'Jade Template'});
});
app.get('/topic/:id', (req, res) => {
    var topics = [
        'javascript is ...',
        'node.js is ...',
        'express.js is ...'
    ];
    var output = `
    <a href="0">JavaScript</a><br>
    <a href="1">NodeJs</a><br>
    <a href="2">ExpressJs</a><br><br>
    <h1>${topics[req.params.id]}</h1>
    `
    res.send(output);
});
app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id + ', ' + req.params.mode);
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.post('/formreceiver', (req, res) => {
    // req.body를 받으려면 require('body-parser'), use(...)
    var title = req.body.title;
    var content = req.body.content;
    
    res.send(title + ', ' + content);
});