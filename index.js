var express = require('express');
var app = express();
var multer = require('multer');
var exphbs = require('express-handlebars')
var path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/home',(req,res)=>{
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./script.py"])
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    })
})
const multerConfig = {

    storage: multer.diskStorage({

      //specify destination
      destination: function(req, file, next){
        next(null, './public/images');  //images uploaded here
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        const filename = 'image'+ '.'+ext;

    
        next(null, filename);
      }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }


        // only permit image mimetypes
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('pic uploaded');
          next(null, true);
        }else{
          console.log("file not supported")

          //TODO:  A better message response to user on failure.
          return next();
        }
    }
  };



  app.post('/upload', multer(multerConfig).single('file'),function(req, res){

      console.log('pic uploaded');
      res.send('uploaded');


  }

);
app.listen(3000, function() {
    console.log('server running on port 3000');
} )