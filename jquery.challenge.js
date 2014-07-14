(function($) {
  $.fn.challenge = function() {
	
	/**
	 * sort the names in an array
	 * @param {Array} aItems array of name strings
	 * @return {Array}
     */
    $.fn.challenge.sortItems = function( aItems ) {
      aItems.sort($.fn.challenge.fullNameSortFunc)
      return aItems;
    };
    
    /**
     * pass this function into array.sort() to alphebatize a list of names
     * @param {String} a 
     * @param {String} b
     * @return {Boolean}
     */
    $.fn.challenge.fullNameSortFunc = function( a, b ){
      var aIndex = a.lastIndexOf(" ") + 1;
      var bIndex = b.lastIndexOf(" ") + 1;
      var A = a.charAt(aIndex).toUpperCase();
      var B = b.charAt(bIndex).toUpperCase();
      
      //TODO: check if A===B and if so, loop further into string until they are different
      return A>B;
    }
    
    /**
     * display a list of strings in a UL
     * @param {Array} aItems array of srtings
     * @param {String} sElementID the ID of the UL element that will contain the list items
     * @return {null}
     */
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