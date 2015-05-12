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

  input: function($e, value){
    $e.val(value);
  },

  read: function($e){
    return $e.val();
  },

  isVisible: function($e){
    return $e.is(":visible");
  },

  hide: function($e){
    return $e.hide();
  }
};