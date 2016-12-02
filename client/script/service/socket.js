var socket = angular.module('socket',[]);
socket.factory('socket',function($rootScope){
	var socket = io.connect('http://101.200.34.158:3000');
	return {
		on:function(eventName,callback){
		    socket.on(eventName,function(){
		    	var args = arguments;
		    	$rootScope.$apply(function(){
		    		callback.apply(socket,args)
		    	});
		    });
		},
		emit:function(eventName,data,callback){
			socket.emit(eventName,data,function(){
                 var args = arguments;
                 $rootScope.$apply(function(){
                 	if(callback){
                 		callback.apply(socket,args)
                 	}
                 })
			})
		}
	};
})