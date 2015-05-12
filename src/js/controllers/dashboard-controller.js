(function(){
  "user strict"

  var $image        = function(){return $("#user-profile-pic");},
      $nameLabel    = function(){return $("#userfullname");},
      DashboardController = function($page, user){
        $page.show();
        support.setImage(user.profile_picture).on($image());
        support.setValue(user.full_name).on($nameLabel());
      };

  hightimes.DashboardController = DashboardController;
}).call(this);