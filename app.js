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