var send=angular.module("send",[]);send.directive("send",function(e,n,t,a){var s="<li class='clearfix'><p class='addContent'></p><span class='addUsername'></span></li>";return{replace:"true",restrict:"E",template:"<button class='send'>发送</button>",controller:function(e){},link:function(t,l){l.on("click",function(){function l(){n.post("http://localhost:3000/searchUser",t.chatname).success(function(e){var n={from:t.username,toid:e.id,toname:e.username,content:t.sendMsgs},s=localStorage.getItem(n.toname),s=JSON.parse(s);if(s)s.push({sendCo:n.content,sendName:n.from}),localStorage.setItem(n.toname,JSON.stringify(s));else{var s=[];s.push({sendCo:n.content,sendName:n.from}),localStorage.setItem(n.toname,JSON.stringify(s))}a.emit("chat someone",n)})}var o=JSON.parse(localStorage.getItem(t.chatname))?JSON.parse(localStorage.getItem(t.chatname)).length:0,r=t.sendMsgs,c=angular.element(s),i=e(c)(t);angular.element(".chatContent").append(i),angular.element(".chatContent").find("p").eq(o).html(r),angular.element(".addUsername").html(t.username),l()})}}});var ngFiles=angular.module("ngFiles",[]);ngFiles.directive("ngFiles",["$parse",function(e){function n(n,t,a){var s=e(a.ngFiles);t.on("change",function(e){s(n,{$files:e.target.files})})}return{link:n}}]);