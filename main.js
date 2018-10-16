console.log(
    "%cJohn Misirlakis - Welcome to my site!",
    "font-family:cursive; font-size:36px; color:goldenrod;"
  );
  
  // ====== ES6 Class ======
  class TypeWriter {
    // constructor is just a method that runs when the object is intanciated from the class (ex. new TypeWriter(x, y);
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement; // set to what is passed in
      this.words = words; // words from the array that are passed in
      this.txt = ""; // the current word that is typed
      this.wordIndex = 0; // need to know the index of the word (which word we are on)
      this.wait = parseInt(wait, 10); // making sure it is an Int (second param is the base => Base 10
      this.type(); // declaring method 'type()'
      this.isDeleting = false; // that state if it is deleting
    }
  
    // create a method within the class
    type() {
      // console.log("===> inside TypeWriter.type() method");
      // get the current index of the word
      const current = this.wordIndex % this.words.length;
      // console.log(current);
  
      //get full text of current word
      const fullTxt = this.words[current];
      // console.log(fullTxt);
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      // output whatever is in this.txt
      // console.log(this.txt);
  
      // Insert txt into element (another span tag)
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; // using a tempate literal instead of concat
  
      // Initial Type Speed - setting value
      let typeSpeed = 300;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // See if the word is complete (if it matches whatever is in this.txt, move to the next word)
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set isDeleteing to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed); // each time a char is typed or deleted this is running; call this.type every 500ms
    }
  }
  
  // Init on DOM Load => so we need an event handeler ex. window.onLoad.. etc.
  document.addEventListener("DOMContentLoaded", init); // init will init our app
  
  // Init App
  function init() {
    // grabbing the selectors and settings them to vars
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words")); // parse it instead on just getting the string
    const wait = txtElement.getAttribute("data-wait");
  
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
  