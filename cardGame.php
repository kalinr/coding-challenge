<?php
/*
 * To use you must create a database named "disney" with two tables: "deck" and "hand",
 *  each with a "card" text column then put this file at the root of your localhost
 * 

//TODO: provide for multiple users and multiple hands. Reduce card strings to two characters so that whole list can fit on one row
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
    echo $deckOfCards->draw( $count );
    break;
  case "repack":
    echo $deckOfCards->repack();
    break;
  case "discard":
    //TODO: validate $_REQUEST["count"]
    $count = $_REQUEST["count"];
    echo $deckOfCards->discard( $count );
    break;
}

class DeckOfCards {  
  
  const DB_NAME = "disney";
  private $connection; 
  
  /**
   * shuffle the cards that remain in the deck
   * @return {Number} the current length of the deck
   */
  function shuffle(){
    $this->startConnection();
    
    //get all cards
    $result = mysqli_query($this->connection,"SELECT card FROM deck");
    
    $deck = [];
    $sql = [];
    while($row = mysqli_fetch_array($result)) {
      //turn result into an array
      $deck[] = $row["card"];
    }

    shuffle($deck);

    $this->saveDeck( $deck, false );
    return count($deck);
  }
  
  /**
   * draw a certain number of cards. Put in the user's hand and remove from the deck.
   * @param {Number} $count the number of cards to draw
   * @return {Array} the list of cards drawn
   */
  function draw($count){
    $this->startConnection();
    
    //get the cards
    $result = mysqli_query($this->connection,"SELECT card FROM deck LIMIT " .$count);
    
    //delete the same number of cards from the deck
    mysqli_query($this->connection, "DELETE FROM deck LIMIT " .$count);
    
    $cards = [];
    $sql = [];
    while($row = mysqli_fetch_array($result)) {
      //turn result into an array
      $cards[] = $row["card"];
      
      //build list to add to player's hand
      $sql[] = '( "' . $row["card"] . '")';
    }
    
    //record player's hand to DB
    mysqli_query($this->connection, 'INSERT INTO hand (card) VALUES '.implode(',', $sql));

    return json_encode( $cards );
  }
  
  /**
   * Repack the deck, removing the player's hand and put in factory order.
   * @return {Boolean}
   */
  function repack(){
    $this->saveDeck( $this->getNewDeck() );    
    return "success";
  }
  
  /**
   * discard a certain number of cards from player's hand
   * @param {Number} $count the number of cards to discard
   * @return {Array} list of cards still remaining in the player's hand
   */
  //TODO: modify to receive a list of cards instead of counting them off from the end
  function discard( $count ){
    $this->startConnection();
    
    //delete the number of cards from the hand
    mysqli_query($this->connection, "DELETE FROM hand LIMIT " .$count);
    
    //get remaining cards
    $result = mysqli_query($this->connection,"SELECT card FROM hand");
    
    $cards = [];
    while($row = mysqli_fetch_array($result)) {
      //turn result into an array
      $cards[] = $row["card"];
    }

    return json_encode( $cards );
  }
  
  /**
   * begin a database connection
   * @return {Boolean} true if successful or already connected
   */
  function startConnection(){
    if ( !$this->connection ) {
      $this->connection = mysqli_connect( "localhost", "root", "", DeckOfCards::DB_NAME );
       if ( !$this->connection ) {
        error_log("can't connect!!!");
        return false;
      }
    }
    return true;
  }

  /**
   * save a deck of cards to the database
   * @param {Array} $deck list of cards to insert into the deck table
   * @param {Boolean} $isRepack list of cards to insert into the deck table
   * @return {Boolean} true if successful
   */
  function saveDeck( $deck, $isRepack = true ){
    $this->startConnection();

    if( $isRepack ){
      //remove everything from player's hand
      mysqli_query($this->connection,"TRUNCATE TABLE hand");
    }

    //remove everything from the deck table
    mysqli_query($this->connection,"TRUNCATE TABLE deck");

    $sql = array();
    foreach( $deck as $row ) {
      $sql[] = '( "' . $row . '")';
    }

    //rebuild the deck table
    mysqli_query($this->connection, 'INSERT INTO deck (card) VALUES '.implode(',', $sql));

    return true;
  }
  
  /**
   * create a new, factory ordered set of playing cards
   * @return {Array} the complete deck
   */
  //TODO: add boolean param for jokers
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

  /**
   * get a new, shuffled deck of cards. A little more efficient than calling repack() then shuffle().
   * not currently being used
   * @return {Array} the complete shuffled deck
   */
  function repackAndshuffle(){
    $deck = $this->getNewDeck();
    shuffle($deck);
    $this->saveDeck( $deck );
    return count($deck);
  }
}

?>