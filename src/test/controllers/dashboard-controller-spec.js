(function(){
  "user strict"

  var controller,
      $page         = function (){return $("#dashboard-page");},
      $image        = function(){return $("#user-profile-pic");},
      $nameLabel    = function(){return $("#userfullname");},
      dashboardHtml =   '<div id="dashboard-page">                  '+
                        '   <div id="user-profile-pic"></div>       '+
                        '   <p id="userfullname"></p>    '+
                        '</div>',
      user = {
        id: 1,
        username: "abc",
        full_name: "tester singh",
        profile_picture: "https://domain/profile-pic-url"
      };

  QUnit.module('DashboardController', {
    setup: function () {
      $("#qunit-fixture").append(dashboardHtml);
    }
  });

  QUnit.test("Should show user image and fullname on dashboard page", function (assert) {
    $page().hide();
    controller = new hightimes.DashboardController(
        $page(),
        user
    );

    assert.ok(support.isVisible($page()), "Should set page to visible on init.");
    assert.equal(support.read($nameLabel()), user.full_name, "Should show user name");
    assert.equal(support.getImageUrlOf($image()), user.profile_picture, "Should show user image");
  });

}).call(this);