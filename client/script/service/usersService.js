var usersService = angular.module('usersService',[]);
usersService.service('usersService',['$http',function($http){
		this.get=function(getUrl){
			return $http({
				method:'GET',
				url:getUrl
			})
		},
		this.post=function(posturl,username,password,signature,individuals,inSignature,index,id,img){
			return $http({
				method:'post',
				url:posturl,
				data:{username:username,password:password,signature:signature,individuals:individuals,inSignature:inSignature,index:index,id:id,img:img},
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				transformRequest:function(obj){
					var str = [];
					for(var p in obj){
						str.push(encodeURIComponent(p) +"="+encodeURIComponent(obj[p]));
					}
					return str.join('&');
				}
		      })
		},
		this.postFormData=function(posturl,fd){
			return $http({
				method:'post',
				url:posturl,
				data:fd,
				headers:{'Content-Type':undefined}
			})
		}
}])