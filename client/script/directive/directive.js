var send=angular.module('send',[]);
send.directive('send',function($compile,usersService,$http,socket){
	var html="<li class='clearfix'><p class='addContent'></p><span class='addUsername'></span></li>";
	return {
		replace:'true',
		restrict:'E',
		template:"<button class='send'>发送</button>",
		controller:function($scope){

		},
		link:function($scope,element){
			element.on('click',function(){     			    
			    var length = JSON.parse(localStorage.getItem($scope.chatname))?JSON.parse(localStorage.getItem($scope.chatname)).length:0;       
				var content = $scope.sendMsgs;
				var template = angular.element(html);
                var compiled = $compile(template)($scope);
                angular.element('.chatContent').append(compiled);
                angular.element('.chatContent').find('p').eq(length).html(content);
                angular.element('.addUsername').html($scope.username);
                emitSomething()                 
                function emitSomething(){
                	usersService.post("http://101.200.34.158:3000/searchUser",$scope.chatname)
                                .success(function(data){
                                   var msg={
                  	                 from:$scope.username,
                                     toid:data.id,
                                     toname:data.username,
                                     content:$scope.sendMsgs
                                    };
                                var items = localStorage.getItem(msg.toname);
                                var items = JSON.parse(items);
                                if(items){
                                	items.push({sendCo:msg.content,sendName:msg.from})
                                	localStorage.setItem(msg.toname,JSON.stringify(items))
                                }else{
                                	var items=[];
                                    items.push({sendCo:msg.content,sendName:msg.from})
                                    localStorage.setItem(msg.toname,JSON.stringify(items))
                                }
                                socket.emit('chat someone',msg)
                    }) 
                }
			})
		}
	}
})
var ngFiles = angular.module('ngFiles',[]);
ngFiles.directive('ngFiles',['$parse',function($parse){
    function fn_link(scope,element,attrs){
        var onChange = $parse(attrs.ngFiles);
        element.on('change',function(event){
            onChange(scope,{$files:event.target.files});
        });
    };
    return {
        link:fn_link
    }
}])
var ngChanges = angular.module('ngChanges',[]);
ngChanges.directive('ngChanges',['$parse',function($parse){
   function fn_link(scope,element,attrs){
        element.on('change',function(event){
            angular.element('.exits').text('')
        });
    };
    return {
        link:fn_link
    } 
}])