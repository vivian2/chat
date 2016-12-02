var userController = angular.module('userController',['ui.router']);
userController.controller('userController',function($scope,$state,$stateParams,
  $http,usersService,socket,$timeout){
  usersService.get('http://101.200.34.158:3000/user/'+$stateParams.username)
              .success(function(data){
                parseUser(data)
                socket.emit('login',data.username)
              })
  var User=function(msg){
      this.userid = msg.userid;
      this.username = msg.username;
      socket.on('chat msg',function(msgs){
          var items = localStorage.getItem(msgs.from);
          var items = JSON.parse(items);
          if(msgs.from == $scope.chatname){          
              var index =  items?items.length:0; 
              var html="<li class='clearfix'><p class='reply'></p><span class='replayname'></span></li>";
              angular.element('.chatContent').append(html);
              angular.element('.chatContent').find('p').eq(index).html(msgs.content);
              angular.element('.replayname').html(msgs.from);
              if(items){
                items.push({content:msgs.content,username:msgs.from})
                localStorage.setItem(msgs.from,JSON.stringify(items))
                }else{
                  var items=[];
                  items.push({content:msgs.content,username:msgs.from})
                  localStorage.setItem(msgs.from,JSON.stringify(items))
                }
          }else{
              if(items){
                  items.push({content:msgs.content,username:msgs.from})
                  localStorage.setItem(msgs.from,JSON.stringify(items))
              }else{
                  var items=[];
                  items.push({content:msgs.content,username:msgs.from})
                  localStorage.setItem(msgs.from,JSON.stringify(items))
                }
          }           
      })          
  }
        
  socket.on('login',function(msg){
      var user = new User(msg);
      usersService.post("http://101.200.34.158/addId",user.username,null,null,null,null,null,user.userid)
                  .success(function(data){console.log(data)})
  })
  $scope.layout = function(){
    usersService.get("http://101.200.34.158:3000/layout")
  }
  $scope.change=function(){
  	$state.go('profile',{username:$stateParams.username,signature:$scope.signature})
  }
  $scope.search=function(){
  	usersService.post("http://101.200.34.158:3000/searchUser",$scope.otherPerson)
  	            .success(function(data){
  	            	if(data === "not exits"){
  	            		$scope.exit=function(){return false}
  	            		$scope.tip="用户不存在"
  	            	}else{
  	            		$scope.exit=function(){return true}
  	            		$scope.othersignature=data.signature|| "编辑个性签名";
  	            		$scope.tip="";
                    $scope.otherImg = data.img;
  	            	}
  	            })
  }
  $scope.addIt=function(){
  	usersService.post('http://101.200.34.158:3000/addIndividual',$stateParams.username,null,null,$scope.otherPerson,$scope.othersignature,null,null,$scope.otherImg)
  	            .success(function(data){
  	            	console.log(data)
  	            })
    $timeout(function() {
      usersService.get('http://101.200.34.158:3000/user/'+$stateParams.username)
                  .success(function(data){parseUser(data)})
            }, 500);
    $scope.exit=function(){return false}
  }
  $scope.del=function(index){
  	usersService.post('http://101.200.34.158:3000/delIndividual',$stateParams.username,null,null,null,null,index)
  	            .success(function(data){
  	            	parseUser(data)
  	            })
  }
  function parseUser(data){
      $scope.username=data.username;
      $scope.individual=data.individuals;
      $scope.group = data.groups;
      $scope.signature = data.signature || "编辑个性签名";
      $scope.load = data.img;
  }
  $scope.chatWith=function(index){
    usersService.get('http://101.200.34.158:3000/user/'+$stateParams.username)
                .success(function(data){
                    $scope.chatname = data.individuals[index].username;
                    angular.element('.chatContent').find('li').remove()
                    chatStorage = JSON.parse(localStorage.getItem($scope.chatname))?JSON.parse(localStorage.getItem($scope.chatname)):[];
                    if(toJudge(chatStorage,$stateParams.username)){
                        $scope.cons = chatStorage
                    }
                })
  }
  function toJudge(chatStorage,username){
    for(i=0;l=chatStorage.length,i<l;i++){
      if(chatStorage[i] && chatStorage[i].sendName === username){
         console.log(chatStorage[i]+"&"+username)
         return true
      }
    }
  }
})
