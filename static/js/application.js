$(function() {

  // Randomly returns true with a certain chance (a percentage)
  function chance( percentage ) {
    return Math.floor( Math.random() * 100 ) < percentage;
  }


  // Capitalizes a word
  function capitalize( str ) {
    return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
  }


  // Returns a random word
  function randomWord() {
    var meats = ["andouille", "bacon", "ball", "beef", "belly", "biltong", "boudin", "bresaola", "brisket", "capicola", "chicken", "chop", "chuck", "corned", "cow", "drumstick", "fatback", "filet", "flank", "frankfurter", "ground", "ham", "hamburger", "hock", "jerky", "jowl", "kielbasa", "leberkas", "loin", "meatball", "meatloaf", "mignon", "pancetta", "pastrami", "pig", "pork", "prosciutto", "ribeye", "ribs", "round", "rump", "salami", "sausage", "shank", "shankle", "short", "shoulder", "sirloin", "spare", "speck", "steak", "strip", "swine", "t-bone", "tail", "tenderloin", "tip", "tongue", "tri-tip", "turducken", "turkey", "venison"];
    return meats[ Math.floor( Math.random() * meats.length ) ];
  }


  function randomSentenceEnding() {
    // Characters to end a sentence with. Repeat for frequencies (i.e. most sentences end in a period)
    var endings = "................................??!";
    var i = Math.floor( Math.random() * endings.length );
    return endings.substring( i, i + 1 );
  }


  // Returns a sentence of random words.
  function randomSentence( numWords ) {
    var sentence = [capitalize( randomWord() ) ];
    for (var i = 0; i < numWords - 2; i++) {
      sentence.push( randomWord() );
    }
    return sentence.join( " " ) + randomSentenceEnding();
  }


  // Returns a sentence of random words, sometimes with extra punctuation.
  function randomSentence2( numWords ) {
    var sentence = [ capitalize( randomWord() ) ];
    var part1 = 0;

    if (chance( 50 )) {
      // Insert a comma or other punctuation within the sentence
      part1 = Math.floor( Math.random() * numWords - 2 );
      for (var i = 0; i < part1; i++) {
        sentence.push( randomWord() );
      }
      sentence.push( sentence.pop() + "," );
    }

    for (var i = 0; i < numWords - part1 - 1; i++) {
      sentence.push( randomWord() );
    }

    return sentence.join( " " ) + randomSentenceEnding();
  }


  // Returns a random paragraph.
  function randomParagraph( length ) {
    var w, numWords;
    var para = [];

    if (length == "long")
      wordFloor = 80;
    else if (length == "medium")
      wordFloor = 50;
    else
      wordFloor = 20;

    numWords = Math.floor( Math.random() * 30 ) + wordFloor;

    while (numWords > 0) {
      if (numWords > 10) {
        w = Math.floor( Math.random() * 12 ) + 2;
        para.push( randomSentence2( w ) );
        numWords = numWords - w;
      } else {
        para.push( randomSentence2( numWords ) );
        numWords = 0;
      }
    }

    return para.join( " " );
  }


  function genText( numParas, length, loremStart ) {
    var text = "";
    for (var i = 0; i < numParas; i++) {
      if (i == 0 && loremStart)
        text = "<p>Bacon ipsum dolor sit amet. " + randomParagraph( length ) + "</p>";
      else
        text += "<p>" + randomParagraph( length ) + "</p>";
    }
    return text;
  }


  function selectText( element ) {
    var text = document.getElementById( element );
    if ($.browser.msie) {
      var range = document.body.createTextRange();
      range.moveToElementText( text );
      range.select();
    } else if ($.browser.mozilla || $.browser.opera) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents( text );
      selection.removeAllRanges();
      selection.addRange( range );
    } else if ($.browser.safari) {
      var selection = window.getSelection();
      selection.selectAllChildren( text );
    }
  }


  $('#bacon-form').submit(function() {

    var numParas = parseInt( $('#paragraphs').val() );
    if (isNaN( numParas ) || numParas < 1) {
      $('#paragraphs').parent().parent().addClass( 'error' );
      $('#paragraphs-error').show();
      return false;
    } else {
      $('#paragraphs').parent().parent().removeClass( 'error' );
      $('#paragraphs-error').hide()
    }

    var length = $('#length').val();
    var loremStart = $('#loremstart').is( ':checked' );

    var text = genText( numParas, length, loremStart );
    $('#ipsum-text').html( text );

    return false;
  });


  $('#highlight-text').click(function() {
    selectText( 'ipsum-text' );
  });
});
