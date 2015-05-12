window.support = {
  click: function($e){
    $e.trigger("onmousedown")
  },

  clickAction: function(callack){
    return {
      on: function($e){
        $e.off("onmousedown");
        return $e.on("onmousedown", callack);
      }
    };
  },

  input: function ($e, value) {
    return $e.is("input") ? $e.val(value) : $e.html();
  },

  read: function($e){
    return $e.is("input") ? $e.val() : $e.html();
  },

  isVisible: function($e){
    return $e.is(":visible");
  },

  hide: function($e){
    return $e.hide();
  },

  getImageUrlOf: function($e){
    return $e.css("background-image").replace("url(", "").replace(")", "");
  },

  setImage: function(url){
    var bgValue = "url(<url>)".replace("<url>", url);
    return {
      on: function($e){
        $e.css("background-image", bgValue);
      }
    };
  },

  setValue: function(value){
    return {
      on: function($e){
        $e.html(value);
      }
    };
  }
};