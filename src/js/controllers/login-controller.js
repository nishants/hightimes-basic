(function() {
  'use strict';
  var $loginButton  = function(){return $("#login-by-id");},
      $idInput      = function(){return $("#login-user-id");};

  var LoginController= function($page, userService, onLogin){
    var onLoginSuccess = function(user){
      onLogin(user);
    };

    $page.show();
    support.clickAction(function(){
      var userId = support.read($idInput());
      userService.userById(userId).then(onLoginSuccess);
    }).on($loginButton());
  };

  window.hightimes.LoginController = LoginController;
}).call(this);