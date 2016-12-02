var signupController = angular.module('signupController',[]);
signupController.controller('signupController',function($scope,$state,$http,usersService,$timeout){
    $scope.passwordCheck =function(){
       	if($scope.password !== $scope.checkpassword){
       	    return true
       	}
    }		
    $scope.saveUser = function(){
		//将注册页面的内容上传到数据库
	  usersService.post("http://101.200.34.158:3000/signup",$scope.username,$scope.password)
		          .success(function(req){
		          	angular.element('.exits').text(req)
		          })
    $timeout(function(){
          var text =  angular.element('.exits').text();
          if(text){
                  $state.go('signup')
                }else{
                  $state.go('/')
                }
    },1000);
	}
})