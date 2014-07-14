(function($) {
  $.fn.challenge = function() {
	
	/**
	 * sort the names in an array
	 * @param {Array} aItems array of name strings
	 * @return {Array}
     */
    $.fn.challenge.sortItems = function( aItems ) {
      aItems.sort( $.fn.challenge.fullNameSortFunc );
      return aItems;
    };
    
    /**
     * pass this function into array.sort() to alphebatize a list of names
     * @param {String} a 
     * @param {String} b
     * @return {Boolean}
     */
    $.fn.challenge.fullNameSortFunc = function( a, b ) {
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
     * @param {jQuery element} the jquery UL element that will contain the list items
     * @return {null}
     */
    $.fn.challenge.showItems = function( aItems, element ) {
      var l = aItems.length;
      for( var i=0; i<l; i++ ){
        element.append('<li class="name_item">' + aItems[i] + '</li>');
      }
    };
    
    /**
     * enable strikethrough functionality for jQuery elements
     * @param {jQuery element} the item or list items that need strikethrough functionality
     * @return {null}
     */
    $.fn.challenge.enableStrike = function ( element ) {
      element.each(function( index ) {        
        $(this).click(function() {
          $(this).toggleClass("name_item_strike");
        });
      });
    };
    
    /**
     * countdown logs a countdown from num to 0, 
     * showing the step number before the value
     * with a 1 second delay between each log
     * ... or does it? Why?
     * (fixed)
     * @param num The starting number
     */
    $.fn.challenge.countdown = function(num ) {

      //doSetTimeout ensures a distinct copy of "i" is present for each timeout function
      function doSetTimeout(i) {        
        setTimeout(function () {
          console.log((i+1) + ': ' + (num - i));
        }, i * 1000);
      }

      for (var i = 0; i <= num; i++) {
        doSetTimeout(i);
      }
    };
    
    return this;
  }
}($));
$.fn.challenge();