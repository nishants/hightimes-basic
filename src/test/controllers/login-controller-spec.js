(function(){
  "user strict"

  var controller,
      $page         = function (){return $("#login-page");},
      $loginButton  = function(){return $("#login-by-id");},
      $idInput      = function(){return $("#login-user-id");},
      loginHml      = '<div id="login-page">                      ' +
                      '   <input id="login-user-id"/>             ' +
                      '   <button id="login-by-id">go</button>    ' +
                      '</div>',

      expectedUser = {id: 1, username: "abc", full_name: "abc"},
      userService = {},
      whenGetUserByIdReturn = function (expectedId, user) {
        userService.userById = function (id) {
          return {
            then: function (success, failure) {if(id == expectedId) success(user);}
          };
        };
      },
      expectedError = "Invalid user id",
      whenGetUserByIdThrowNotFound = function (expectedId) {
        userService.userById = function (id) {
          return {
            then: function (success, failure) {if(id == expectedId) failure(expectedError);}
          };
        };
      };

  QUnit.module('LoginController', {
    setup: function () {
      $("#qunit-fixture").append(loginHml);
    }
  });

  QUnit.test("Should callback on login success", function (assert) {
    $page().hide();
    var done  = assert.async(),
        userFound,
        onLogin = function(user){
          userFound = user;
        };

    controller = new hightimes.LoginController(
        $page(),
        userService,
        onLogin
    );
    assert.ok(support.isVisible($page()), "Should set page to visible on init.");

    whenGetUserByIdReturn(expectedUser.id, expectedUser);
    support.input($idInput(), expectedUser.id);
    support.click($loginButton());

    setTimeout(function(){
      assert.notOk(support.isVisible($page()), "Should hide page on login success");
      assert.deepEqual(userFound, expectedUser, "Should callback onLogin with user object");
      done();
    });

    assert.expect(3);
  });

  QUnit.test("Should show message if invalid user id", function (assert) {
    var
        onLogin = function () {
          assert.ok(false, "Should not callback for login error");
        },
        onError = function (error) {
          assert.equal(error, expectedError, "Should callback onError with error object");
        };

    controller = new hightimes.LoginController(
        $page(),
        userService,
        onLogin,
        onError
    );

    whenGetUserByIdThrowNotFound("1");
    support.input($idInput(), "1");
    support.click($loginButton());

    assert.expect(1);
  });

}).call(this);