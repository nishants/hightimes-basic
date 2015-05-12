(function() {
  'use strict';
  var $loginButton  = function(){return $("#login-by-id");},
      $idInput      = function(){return $("#login-user-id");};

  var LoginController= function($page, userService, onLoginSuccess, onLoginError){
    var
        destroy = function () {
          support.hide($page);
        },
        onSuccess = function (user) {
          destroy();
          onLoginSuccess(user);
        };

    $page.show();
    support.clickAction(function(){
      var userId = support.read($idInput());
      userService.userById(userId).then(onSuccess, onLoginError);
    }).on($loginButton());
  };

  window.hightimes.LoginController = LoginController;
}).call(this);