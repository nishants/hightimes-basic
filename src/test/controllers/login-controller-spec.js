(function(){
  "user strict"
  var controller,
      $page         = function (){return $("#login-page");},
      $loginButton  = function(){return $("#login-by-id");},
      $idInput      = function(){return $("#login-user-id");},
      loginHml =  '<div id="login-page">                      '+
                  '   <input id="login-user-id"/>             '+
                  '   <button id="login-by-id">go</button>    '+
                  '</div>',

      expectedUser = {id: 1, username: "abc", full_name: "abc"},
      userService = {},
      whenGetUserByIdReturn = function (expectedId, user) {
        userService.userById = function (id) {
          return {
            then: function (success, failure) {if(id == expectedId) success(user);}
          };
        };
      };

  QUnit.module('LoginController', {
    setup: function () {
      $("#qunit-fixture").append(loginHml);
    }
  });

  QUnit.test("Should set page to visible if not already visible", function (assert) {
    var page = $page();

    page.hide();
    controller = new hightimes.LoginController(
        $page(),
        {},
        function(){}
    );

    assert.ok(support.isVisible(page), "Should set page to visible on init.");
  });

  QUnit.test("Should callback on login success", function (assert) {
    var onLogin = function(user){
          assert.deepEqual(user, expectedUser, "Should callback onLogin with user object");
        };

    controller = new hightimes.LoginController(
        $page(),
        userService,
        onLogin
    );

    whenGetUserByIdReturn(expectedUser.id, expectedUser);
    support.input($idInput(), expectedUser.id);
    support.click($loginButton());

    assert.expect(1);
  });

}).call(this);