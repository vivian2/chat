var myapp=angular.module("myapp",["ui.router","usersService","loginController","signupController","userController","chatPaneController","socket","send","profileController","ngFiles"]);myapp.config(function(e,l){l.otherwise("/"),e.state("/",{url:"/",templateUrl:"./views/login.html",controller:"loginController"}).state("signup",{url:"/signup",templateUrl:"./views/signup.html",controller:"signupController"}).state("users",{url:"/users/{username}",views:{"":{templateUrl:"./views/user.html",controller:"userController"},"chatPane@users":{templateUrl:"./views/chatPane.html",controller:"chatPaneController"}}}).state("profile",{url:"/users/{username}/profile",templateUrl:"./views/profile.html",controller:"profileController"})});