(function(){
  "user strict"

  var controller,
      $page         = function (){return $("#dashboard-page");},
      $image        = function(){return $("#user-profile-pic");},
      $nameLabel    = function(){return $("#userfullname");},
      dashboardHtml     =   '<div id="dashboard-page">                  '+
                        '   <div id="user-profile-pic"></div>       '+
                        '   <p id="userfullname"></p>    '+
                        '</div>',
      loggedInUser = {
        id: 1,
        username: "abc",
        full_name: "abc",
        profile_picture: "https://domain/profile-pic-url"
      };

  QUnit.module('DashboardController', {
    setup: function () {
      $("#qunit-fixture").append(dashboardHtml);
    }
  });

  QUnit.test("Should show dashboard page", function (assert) {
    $page().hide();
    controller = new hightimes.DashboardController(
        $page()
    );

    assert.ok(support.isVisible($page()), "Should set page to visible on init.");
  });

}).call(this);