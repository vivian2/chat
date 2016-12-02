var mongoose = require('mongoose');
var User = require('../model/user');
var $ = require('cheerio');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var fs=require('fs');
var path = require('path');
var formidable = require('formidable');


exports.signup=function(req,res,next){
  var _username = req.body.username;
  var _password = req.body.password;
    User.findOne({username:_username}).exec(function(err,user){
       if (err) {console.log(err)}
        if(user){
          res.send("用户已存在")
        }else{
            var user = new User({
            username:_username,
            password:_password
            });
            bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
               if (err) {next(err)}
               bcrypt.hash(user.password,salt,null,function(err,hash){
               if (err) {next(err)}
                   user.password = hash;
                   next()
               })
            })
            user.save(function(err,user){
            if (err) {console.log(err)}
            }) 
        }
    })               
}
exports.signin=function(req,res){
	var _username = req.body.username;
  var _password = req.body.password;
	User.findOne({username:_username})
	    .exec(function(err,user){
	    	if (err) {console.log(err)}
	    	if(!user) {
          res.send('not exits')
        }else{
          user.comparePassword(_password,function(err,isMatch){
            if(err){console.log('err'+err)}
            if(isMatch){
                req.session.user = user;
                res.send('exits')
            }else{
              res.send('error')
           }
          }) 
        }
	    })

}
exports.layout=function(req,res){
    delete req.session.user
}
exports.user=function(req,res){
    var _username = req.params.username;
    User.findOne({username:_username}).exec(function(err,user){
      if (err) {console.log(err)}
      res.write(JSON.stringify(user));
      res.end()
    })
   }
exports.searchUser=function(req,res){
    var _username = req.body.username;
    User.findOne({username:_username}).exec(function(err,user){
      if (err) {console.log(err)}
      if(user){
        res.write(JSON.stringify(user));
        res.end()
      }else{
        res.send('not exits')
      }
      
    })
   }
exports.addIndividual=function(req,res){
  var _username = req.body.username;
  var _individual = req.body.individuals;
  var _inSignature = req.body.inSignature;
  var _img = req.body.img;
  User.findOne({username:_username}).exec(function(err,user){
    if(err){console.log(err)}
    user.individuals.push({username:_individual,signature:_inSignature,img:_img})
   var _user = new User(user);
   _user.save(function(err,user){
    if(err) {console.log(err)}
   })
  })
}
exports.delIndividual=function(req,res){
  var _username = req.body.username;
  var index = req.body.index;
  User.findOne({username:_username}).exec(function(err,user){
      if (err) {console.log(err)}
      user.individuals.splice(index,1);  
      var _user = new User(user);
      _user.save(function(err,user){
      if(err) {console.log(err)}
      })   
      res.write(JSON.stringify(user));
      res.end()      
    })
}
exports.addId=function(req,res){
  var _username = req.body.username;
  var id = req.body.id;
    User.findOne({username:_username}).exec(function(err,user){
      if (err) {console.log(err)}
      user.id = id;
      user.save(function(err,user){
        if (err) {
          console.log(err)
        }
      })
    })                
}
exports.saveImg=function(req,res){
  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    for(var key in files){
      var name = key;
      var file = files[key];
    }
    var pathBefore = file.path,
        filename = file.name,
        type = file.type.split('/')[1];
    if(filename){
        var newName = Date.now()+"."+type;
        var newPath = path.join(__dirname,'../../client/public/upload/'+newName);
     var readStream = fs.createReadStream(pathBefore);
     var writeStream = fs.createWriteStream(newPath);
     readStream.on('data',function(chunk){
      writeStream.write(chunk);
     });
     readStream.on('end',function(){
      writeStream.end();
     })
     User.findOne({username:name}).exec(function(err,user){
       if (err) {console.log(err)}
        user.img = '../public/upload/'+newName;
        user.save(function(err,user){
          if (err) {
          console.log(err)
        }
        console.log(user)
       })
    })
    }
  })
}
exports.save=function(req,res){
  var _username = req.body.username;
  var _signature = req.body.signature;
  User.findOne({username:_username}).exec(function(err,user){
       if (err) {console.log(err)}
        user.signature = _signature;
        user.save(function(err,user){
          if (err) {
          console.log(err)
        }
        console.log(user)
       })
    })
}
