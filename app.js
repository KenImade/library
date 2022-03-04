// get the form modal
var formModal = document.getElementById("add-book-modal");

// get the span to close modal
var closeModalBtn = document.getElementsByClassName("close")[0];

//Get button to open the modal
var openModalBtn = document.getElementById("new-book-btn");

// When the user clicks on the button, open the modal
openModalBtn.onclick = function() {
    formModal.style.display = "block"
}

// When the user clicks on span <x>, close the modal
closeModalBtn.onclick = function() {
    formModal.style.display = "none";
}

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.readBook = function(status) {
    if (status == 'yes') {
        return this.readStatus = true;
    } else {
        return this.readStatus = false;
    }
}

function addBookToLibrary() {
  
    var bookName = window.prompt("Enter the name of the book");
    var authorName = window.prompt("Enter name of the author");
    var numberOfPages = window.prompt("How many pages does the book have?");
    var readBook = window.prompt("Have you read the book? yes/no");

    const newBook = new Book(bookName, authorName, numberOfPages);
    newBook.readBook(readBook);

    myLibrary.push(newBook)
}

function displayBooksInLibrary() {
    for (var i = 0; i < myLibrary.length+1; i++) {
        console.log(myLibrary[i]);
    }
}