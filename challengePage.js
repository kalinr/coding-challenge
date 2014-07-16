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
  //TODO: look into combining these four listeners into a single function
  $( "#btnShuffle" ).click(function( event ) {
    event.preventDefault();
    var oPostData = {"func":"shuffle"};
    $.post( "http://localhost/cardGame.php", oPostData, function( data ) {
      console.log("deck length: " + data);
    });

  });
  
  //TODO: show each card in its own selectable div
  $( "#btnDraw" ).click(function( event ) {
    event.preventDefault();    
    var oPostData = {"func":"draw", "count":$( "#numDraw" ).val()};
    $.post( "http://localhost/cardGame.php", oPostData, function( data ) {
      console.log("new cards: " + data);
    });
  });
  
  $( "#btnRepack" ).click(function( event ) {
    event.preventDefault();
    var oPostData = {"func":"repack"};
    $.post( "http://localhost/cardGame.php", oPostData, function( data ) {
      console.log("result: " + data);
    });
  });
  
  //TODO: remove #numDiscard and instead grab a list of selected card divs and send that list, then delete those divs
  $( "#btnDiscard" ).click(function( event ) {
    event.preventDefault();    
    var oPostData = {"func":"discard", "count":$( "#numDiscard" ).val()};
    $.post( "http://localhost/cardGame.php", oPostData, function( data ) {
      console.log("Your remaining hand: " + data);
    });
  });
  
});