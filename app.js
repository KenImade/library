class Library {

    constructor() {
        this.bookArray = [];
    };
    addBook = (book) => {
        this.bookArray.push(book);
    };

    getBooks = () => {
        return this.bookArray;
    };
};

class Book {
    readStatus;

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    readBook = (status) => {
        if (status = 'yes') {
            return readStatus = true;
        } else {
            return this.readStatus = false;
        }
    }
}


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
function Book(title, author, pages) {
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

    console.log(readBook);

    if (validateUserInput(bookName, authorName, numberOfPages)) {
        const newBook = new Book(bookName, authorName, numberOfPages);
        newBook.readBook(readBook);

        myLibrary.push(newBook)
        document.querySelector('form').reset();
        formModal.style.display = "none";

        displayBooksInLibrary()
    } else {
        alert("Invalid Input");
        document.querySelector('form').reset();
        formModal.style.display = "block";
    }
}

function validateUserInput(title, author, pages) {
    if (title === "" || author === "" || pages === "") {
        return false;
    } else {
        return true;
    }
}

function displayBooksInLibrary() {
    var cardList = document.getElementById("cards-carousel");
    cardList.textContent = "";

    for (var i = 0; i < myLibrary.length+1; i++) {
        var book = myLibrary[i];
        const bookCard = createBookCard(book);
        cardList.appendChild(bookCard);
    }
}

// function to create book card
const createBookCard = (book) => {
    const card = document.createElement("div");
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

    if (book.readStatus === true) {
        console.log("Getting into if condition")
        readStatusButton.setAttribute("id", "read");
        readStatusButton.innerHTML = "Read";
    } else {
        console.log("reached here too")
        readStatusButton.setAttribute("id", "not-read");
        readStatusButton.innerHTML = "Not Read";
    }
    
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete");
    deleteButton.innerHTML = "Delete";

    // append buttons to card-btns
    bookButtons.appendChild(readStatusButton);
    bookButtons.appendChild(deleteButton);

    // append book properties to card 
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages)
    card.appendChild(bookButtons);

    return card;
}

// function to delete book from library
document.getElementById("cards-carousel").addEventListener("click", (event)=>{
    if(event.target.tagName === "BUTTON") {
        const button = event.target;
        const cardDiv = button.parentNode.parentNode;
        const cardList = button.parentNode.parentNode.parentNode;
        if(button.textContent === "Delete") {
            var bookTitle = cardDiv.childNodes[0].textContent;
            console.log(bookTitle);
            deleteBookFromLibrary(bookTitle);
            // console.log(cardDiv.childNodes[1].textContent);
            cardList.removeChild(cardDiv);
        }
    }
})

function deleteBookFromLibrary(title) {
    for (var i = 0; i < myLibrary.length+1; i++) {
        if (myLibrary[i].title === title) {
            myLibrary.splice(i, 1);
            break
        }
    }
}

// get readStatus button
document.getElementById("cards-carousel").addEventListener("click", (event)=>{
    if(event.target.tagName === "BUTTON") {

        const button = event.target;
        const cardDiv = button.parentNode.parentNode;
        const bookTitle = cardDiv.childNodes[0].textContent;
        var book = getBookFromLibrary(bookTitle);

        changeReadStatus(book);

        if(button.textContent === "Read") {
            button.textContent = "Not Read";
            button.setAttribute("id", "not-read");
        } else {
            button.textContent = "Read";
            button.setAttribute("id", "read");
        }
    }
})

// get book object
function getBookFromLibrary(title) {
    for (var i = 0; i < myLibrary.length+1; i++) {
        if (myLibrary[i].title === title) {
            return myLibrary[i];
        }
    }
}

// function to change the status from read to unread
function changeReadStatus(book) {
    if (book.readStatus === true) {
        book.readStatus = false;
    } else {
        book.readStatus = true;
    }
}