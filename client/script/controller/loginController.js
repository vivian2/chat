var loginController = angular.module('loginController',[]);
loginController.controller('loginController',function($scope,$state,usersService){
	var _req;
	$scope.checklogin = function(){
	    usersService.post("http://101.200.34.158:3000/signin",$scope.username,$scope.password)
		            .success(function(req){
		          	    _req = req	 
		          	    if(_req === "exits"){
                          $scope.notExit=function(){return false}
                          $scope.error=function(){return false}
                          $state.go('users',{username:$scope.username})
		                }
			            if(_req === "not exits"){
                          $scope.notExit=function(){return true}
                          $scope.error=function(){return false}
		                }
		                if(_req === "error"){
		                  $scope.notExit=function(){return false}
			              $scope.error=function(){return true}
		                }             	 
		            })
		
	}
	
})