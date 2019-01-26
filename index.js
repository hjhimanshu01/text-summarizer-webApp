var express = require('express');
var app = express();

app.get('/',(req,res)=>{
    res.send('goto http://localhost:3000/home')
})

app.get('/home',(req,res)=>{
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./script.py"])
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    })
})

app.listen(3000, function() {
    console.log('server running on port 3000');
} )