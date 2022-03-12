class Library {

    bookArray = [];

    addBook = (book) => {
        this.bookArray.push(book);
    };

    getBooks = () => {
        return this.bookArray;
    };

    getBook = (title) => {
        for (let i = 0; i < this.bookArray.length + 1; i++) {
            if (this.bookArray[i].title === title) {
                return this.bookArray[i];
            }
        }
    };

    deleteBook = (title)=> {
        for (let i = 0; i < this.bookArray.length+1; i++) {
            if (this.bookArray[i].title === title) {
                this.bookArray.splice(i, 1);
                break
            }
        }
    };
};

class Book {
    readStatus;

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    };

    readBook = (status) => {
        if (status = 'yes') {
            return this.readStatus = true;
        } else {
            return this.readStatus = false;
        }
    };

    changeReadStatus = () => {
        if (this.readStatus === true) {
            this.readStatus = false;
        } else {
            this.readStatus = true;
        }
    };
};

const createCard = (book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    const bookTitle = document.createElement("h3");
    bookTitle.className = "book-title";
    bookTitle.innerText = book.title;

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
        // console.log("Getting into if condition")
        readStatusButton.setAttribute("id", "read");
        readStatusButton.innerHTML = "Read";
    } else {
        // console.log("reached here too")
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
    card.appendChild(bookTitle);
    card.appendChild(author);
    card.appendChild(pages)
    card.appendChild(bookButtons);

    return card;
};

const displayController = (() => {
    let cardList = document.getElementById("cards-carousel");

    let myLibrary =  new Library();

    let books = myLibrary.getBooks();

    let formModal = document.getElementById("add-book-modal");

    let closeModalBtn = document.getElementsByClassName("close")[0];

    let openModalBtn = document.getElementById("new-book-btn");

    let submitFormBtn = document.getElementById("submit-btn");

    submitFormBtn.onclick = (ev) => {
        updateLibrary(ev);
    };
    
    openModalBtn.onclick = function() {
        formModal.style.display = "block"
    };

    closeModalBtn.onclick = function() {
        formModal.style.display = "none";
    };

    window.onclick = function(event) {
        if(event.target == formModal) {
            formModal.style.display = "none";
        }
    };

    cardList.onclick = (event) => {
        if(event.target.tagName === "BUTTON") {
            const button = event.target;
            const cardDiv = button.parentNode.parentNode;
            const cardList = button.parentNode.parentNode.parentNode;
            if(button.textContent === "Delete") {
                let bookTitle = cardDiv.childNodes[0].textContent;
                // console.log(bookTitle);
                myLibrary.deleteBook(bookTitle);
                // console.log(cardDiv.childNodes[1].textContent);
                cardList.removeChild(cardDiv);
            }

            if(button.textContent === "Read") {
                let bookTitle = cardDiv.childNodes[0].textContent;
                let book = myLibrary.getBook(bookTitle);

                book.changeReadStatus();

                button.textContent = "Not Read";
                button.setAttribute("id", "not-read");
            } else {
                button.textContent = "Read";
                button.setAttribute("id", "read");
            }

        };
    };

    const updateLibrary = (ev) => {
        ev.preventDefault();

        let bookName = document.getElementById("title").value;
        let authorName = document.getElementById("author").value;
        let numberOfPages = document.getElementById("pages").value;
        let readBook = document.querySelector('input[name="readStatus"]:checked').value;
    
        if (validateInput(bookName, authorName, numberOfPages)) {
            const newBook = new Book(bookName, authorName, numberOfPages);
            newBook.readBook(readBook);
    
            myLibrary.addBook(newBook)
            document.querySelector('form').reset();
            formModal.style.display = "none";
        } else {
            alert("Invalid Input");
            document.querySelector('form').reset();
            formModal.style.display = "block";
        }

        displayBooks()
    };

    const validateInput = (title, author, pages) => {
        if (title === "" || author === "" || pages === "") {
            return false;
        } else {
            return true;
        }
    };

    const displayBooks = () => {
        cardList.textContent = "";
        for (let i = 0; i < books.length+1; i++) {
            let book = books[i];
            const bookCard = createCard(book);
            cardList.appendChild(bookCard);
        };
    };

    return {myLibrary};
})();

