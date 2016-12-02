var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    $ = require('cheerio'),
    path=require('path'),
    bodyParser = require('body-parser'),
    session= require('express-session'),
    MongoStore = require('connect-mongo')(session),
    port = process.env.PORT||3000,
    cookieParser = require('cookie-parser'),
    bcrypt = require('bcrypt-nodejs'),
    fs = require('fs'),                       
    path = require('path'),
    app = express();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    var dbUrl = 'mongodb://101.200.34.158/chat';
mongoose.connect(dbUrl);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
var User = require('./app/controller/user');
//关于can not get /socket.io/ 要看清express与socket.io,这里是server,不是app
server.listen(port,function(){
	console.log(port)
});
app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Credentials',true)
  next()
})
app.use(express.static(path.join(__dirname,'client')));
app.use(session({
	resave:false,
	saveUninitialized:true,
	secret:'chat',
	store:new MongoStore({
		url:dbUrl
	})
}))
io.on('connection',function(socket){
      socket.on('login',function(username){
        socket.emit('login',{userid:socket.id,username:username,message:username+'已登录'})
      })
      socket.on('chat someone',function(msg){        
        socket.broadcast.to(msg.toid).emit('chat msg',msg)
      })
})
app.post('/signup',User.signup);
app.post('/signin',User.signin);
app.get('/layout',User.layout);
app.get('/user/:username',User.user)
app.post('/searchUser',User.searchUser)
app.post('/addIndividual',User.addIndividual)  
app.post('/delIndividual',User.delIndividual)  
app.post('/addId',User.addId) 
app.post('/saveImg',User.saveImg)
app.post('/save',User.save)