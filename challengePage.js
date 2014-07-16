 $(document).ready( function() {
  //challenge 2:
  var aNames = ['Gabriel Ba', 'John Adams', 'Kieth Richards', 'Prince', 'John Adams McKensie'];    	
  aNames = $.fn.challenge.sortItems( aNames );
  $.fn.challenge.showItems( aNames, $("#sorted_names") );
  
  //challenge 3:
  $.fn.challenge.enableStrike( $("#sorted_names li") );
  
  //challenge 4:
  $.fn.challenge.countdown(5);
  
  //challenge 5:
  //normally all the vars in a function would be declared at the top, but this is more readable
  var aNumbers = [[141,151,161], 2, 3, [101, 202, [303, 404]]];
  var nHighest = $.fn.challenge.getMaxInArray(aNumbers);
  console.log("Challenge 5 output: " + nHighest);
  
  //challenge 6:
  var aStrings = ["a", "bcd", "efgh", "ij", ""];
  var sLongest = $.fn.challenge.getLongestStringInArray(aStrings);
  console.log("Challenge 6 output: " + sLongest);
  
  //challenge 7:      
  $( "#contact_form" ).submit(function( event ) {
	  event.preventDefault();
	  var sPhoneNumber = $.fn.challenge.validatePhone( $( "#txtPhone" ).val() ),
	    sResult = "";
	  
	  if( sPhoneNumber ){
		  sResult = "Your validated phone number: " + sPhoneNumber
		  $("#phone_result").text(sResult);
		  console.log(sResult);
	  }else{
		  sResult = "Invalid phone number";
		  $("#phone_result").text(sResult);
		  throw sResult;
	  }
	});
  
  //challenge 8:      
  $( "#btnShuffle" ).click(function( event ) {
    event.preventDefault();

    $.post( "http://localhost/cardGame.php", "shuffle", function( data ) {
      console.log("result: " + data);
    });

  });
  
  $( "#btnDraw" ).click(function( event ) {
    event.preventDefault();
    console.log("draw the cards");
  });
  
  $( "#btnRepack" ).click(function( event ) {
    event.preventDefault();
    console.log("repack the cards");
  });
  
  $( "#btnDiscard" ).click(function( event ) {
    event.preventDefault();
    console.log("discard the cards");
  });
  
});