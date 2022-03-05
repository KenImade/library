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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if(event.target == formModal) {
        formModal.style.display = "none";
    }
}

// get button to submit form
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("submit-btn").addEventListener("click", addBookToLibrary);
});

// Array to store books
let myLibrary = [];

// Book object
function Book(title, author, pages, readStatus) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Read Status of book
Book.prototype.readBook = function(status) {
    if (status == 'yes') {
        return this.readStatus = true;
    } else {
        return this.readStatus = false;
    }
}

// function to add book to library
const addBookToLibrary = (ev) => {
    ev.preventDefault();
    var bookName = document.getElementById("title").value;
    var authorName = document.getElementById("author").value;
    var numberOfPages = document.getElementById("pages").value;
    var readBook = document.querySelector('input[name="readStatus"]:checked').value;

    console.log(bookName)
    console.log(authorName)
    console.log(numberOfPages)
    console.log(readBook)
    
    const newBook = new Book(bookName, authorName, numberOfPages);
    newBook.readBook(readBook);

    myLibrary.push(newBook)
    document.querySelector('form').reset();
    formModal.style.display = "none";
}

function displayBooksInLibrary() {
    for (var i = 0; i < myLibrary.length+1; i++) {
        console.log(myLibrary[i]);
    }
}

// function to create book card
const createBookCard = (book) => {
    const card = docment.createElement("div");
    card.className = "book-card";

    const title = document.createElement("h3");
    title.className = "book-title";
    title.innerText = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.innerText = book.author;

    const pages = document.createElement("p");
    pages.className = "no-of-pages";
    pages.innerText = book.pages + " pages";

    const bookButtons = document.createElement("div");
    bookButtons.className = "card-btns";

    const readStatusButton = document.createElement("button");
    readStatusButton.className = "read-status";
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";

    // append buttons to card-btns
    bookButtons.appendChild(readStatusButton);
    bookButtons.appendChild(deleteButton);

    // append book properties to card 
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages)
    card.appendChild(bookButtons);
}