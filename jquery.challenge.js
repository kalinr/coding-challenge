(function($) {
  $.fn.challenge = function() {
	$.fn.challenge.sortAndAddItems = function(aItems, sElementID) {
      aItems = $.fn.challenge.sortItems(aItems);
      $.fn.challenge.showItems(aItems, sElementID);
    };
    
    $.fn.challenge.sortItems = function( aItems ) {
      return aItems;
    };
    
    $.fn.challenge.showItems = function( aItems, sElementID ) {
      var l = aItems.length;
      for(var i=0; i<l; i++){
        $("#" + sElementID).append('<li><div class="no_strike">' + aItems[i] + '</div></li>');
      }
    };
    
    return this;
  }
}($));
$.fn.challenge();