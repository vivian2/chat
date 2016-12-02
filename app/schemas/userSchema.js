var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var UserSchema = new Schema({
	username:{
		type:String,
		required:true
	  },
	id:String,
	signature:String,
	password:String,
	individuals:Array,
	groups:Array,
	img:{
		type:String,
		default:"../public/upload/default.jpg"
	},
	meta:{
      createAt:{
      	type:Date,
      	default:Date.now()
      },
      updateAt:{
      	type:Date,
      	default:Date.now()
      }
	}
})

UserSchema.pre('save',function(next){
	if(this.isNew){
	  this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
	  this.meta.updateAt = Date.now();
	}
	next()
})
UserSchema.methods = {
	comparePassword:function(_password,cb){
	 var user = this;
	  bcrypt.compare(_password,user.password,function(err,isMatch){
	  	if (err) { cb(err) }
	  	cb(null,isMatch)
	  })
	}
}

UserSchema.statics = {
	fetch:function(cb){
		return this
		  .find({})
		  .sort('meta.updateAt')
		  .exec(cb)
	},
	findById:function(id,cb){
	  return this
	    .findOne({_id:id})
	    .exec(cb)
	}
}
module.exports = UserSchema;
