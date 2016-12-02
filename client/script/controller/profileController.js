var profileController = angular.module('profileController',['ui.router']);
profileController.controller('profileController',function($scope,$stateParams,usersService,$timeout,$state){
    $scope.usenameProfile = $stateParams.username;
    usersService.get('http://101.200.34.158:3000/user/'+$stateParams.username)
                .success(function(data){
                	$scope.signatureProfile = data.signature || "编辑个性签名";
                	$scope.loadimg = data.img;
                })
    $scope.save=function(){
    	usersService.post("http://101.200.34.158:3000/save",$stateParams.username,null,$scope.signatureProfile)
    	            .success(function(data){console.log(data)})
        $state.go('users',{username:$stateParams.username})
    }
    $scope.getTheFiles = function($files){
    	var formdata = new FormData();
           formdata.append($stateParams.username,$files[0]);
       $scope.saveFormData=function(){  
    	usersService.postFormData("http://101.200.34.158:3000/saveImg",formdata)
    	            .success(function(data){console.log(data)})
    	$timeout(function() {
    		usersService.get('http://101.200.34.158:3000/user/'+$stateParams.username)
                    .success(function(data){
                	$scope.load = data.img
                })  
    	}, 1000);     	 	
        }    
    }     
})