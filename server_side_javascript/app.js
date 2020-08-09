const express = require('express');
const app = express();

// 정적 파일을 서비스 하는 법, 'public'이라는 명을 권장
app.use(express.static('public'));

// router
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

app.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});