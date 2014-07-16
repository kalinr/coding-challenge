<?php 
//TODO: validate the results from the queries

//TODO: don't let just anyone in
header('Access-Control-Allow-Origin: *');

//TODO: validate $_REQUEST["func"]
$func= $_REQUEST["func"];
$deckOfCards = new DeckOfCards();


switch ($func) {
  case "shuffle":
    echo $deckOfCards->shuffle();
    break;
  case "draw":
    //TODO: validate $_REQUEST["count"]
    $count = $_REQUEST["count"];
    echo $deckOfCards->draw($count);
    break;
  case "repack":
    echo $deckOfCards->repack();
    break;
  case "discard":
    echo $deckOfCards->discard();
    break;
}

class DeckOfCards {
  
  function shuffle(){
    $deck = $this->getNewDeck();
    shuffle($deck);
    $this->saveDeck( $deck );
    return count($deck);
  }
  
  function draw($count){
    $con = mysqli_connect( "localhost", "root", "", "disney" );
    
    if (!$con) {
      error_log("can't connect!!!");
    }
    
    //get the cards
    $result = mysqli_query($con,"SELECT card FROM deck LIMIT " .$count);
    
    //delete the same number of cards from the deck
    mysqli_query($con, "DELETE FROM deck LIMIT " .$count);
    
    $cards = [];
    $sql = [];
    while($row = mysqli_fetch_array($result)) {
      //turn result into an array
      $cards[] = $row["card"];
      
      //build list to add to player's hand
      $sql[] = '( "' . $row["card"] . '")';
    }
    
    //record player's hand to DB
    mysqli_query($con, 'INSERT INTO hand (card) VALUES '.implode(',', $sql));

    return json_encode( $cards );
  }
  
  function repack(){
    $this->saveDeck( $this->getNewDeck() );    
    return "success";
  }
  
  function discard(){
  
  }
  
  function saveDeck($deck){
    $con = mysqli_connect( "localhost", "root", "", "disney" );
    
    if (!$con) {
      error_log("can't connect!!!");
    }
     
    //remove everything from player's hand
    mysqli_query($con,"TRUNCATE TABLE hand");
    
    //get rid of everything in the deck table
    mysqli_query($con,"TRUNCATE TABLE deck");
    //$deck = $this->getNewDeck();
     
    $sql = array();
    foreach( $deck as $row ) {
      $sql[] = '( "' . $row . '")';
    }
     
    //rebuild the deck table
    mysqli_query($con, 'INSERT INTO deck (card) VALUES '.implode(',', $sql));
     
    return "success";
  }
  
  function getNewDeck(){
    $suits = array('Clubs', 'Diamonds', 'Hearts', 'Spades');
    $cards = array('Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King');
    $deck = [];
     
    for($i=0; $i<count($suits); $i++){
      for($j=0; $j<count($cards); $j++){
        array_push( $deck, $cards[$j] . " of " . $suits[$i] );
      }
    }
    
    return $deck;
  }
  
}

?>