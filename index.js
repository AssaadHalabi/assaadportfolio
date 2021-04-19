const express = require('express');
const app = express();
var path = require('path');
const sendMail = require('./mail');
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Assaad.html'));
})

app.get('/Resume', (req, res) => {
  // res.sendFile(path.join(__dirname + "/public/Assaad's Resume.pdf"));
  fs.readFile(__dirname + "./public/Assaad's Resume.pdf" , function (err,data){
    res.contentType("application/pdf");
    res.send(data);
});
  // res.sendFile("./public/Assaad's Resume.pdf");
})
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.post('/',function(req, res){
  // var user_name = req.body.InputName;
  // var password = req.body.InputEmail;
  // var subject = req.body.InputSubject;
  // var message = req.body.InputMessage;
  const { InputName, InputSubject, InputEmail, InputMessage } = req.body;
    console.log('Data: ', req.body);

    sendMail(InputName, InputEmail, InputSubject, InputMessage, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status({ message: 'Email sent!!!' });
        }
    });
    // res.json({ message: 'Message received!!!' })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})