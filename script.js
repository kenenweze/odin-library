const myLibrary = [
    {
        title: "Percy Jackson",
        author: "Rick RIordan",
        pages: 351,
        read: true
    }
];
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.querySelectorAll("input[name='read-status']");
const openButton = document.getElementById("show-dialog");
const bookDialog = document.getElementById("book-dialog");
const submitBook = document.getElementById("add-book");
const libraryDisplay = document.getElementById("library-display");


function Book(title, author, noOfPages, read) {
    this.title = title;
    this.author = author;
    this.pages = noOfPages;
    this.read = read;
}

function addBookToLibrary() {

    //Get the value of the radio input and transform it to boolean
    let radioValue = "";
    for (const radio of readStatus) {
        if (radio.checked) {
            if (radio.value === "Yes") {
                radioValue = true;
            } else {
                radioValue = false;
            }
        }
    }
    const book = new Book(title.value, author.value, pages.value, radioValue);
    myLibrary.push(book);
    displayBooks(title.value, author.value, pages.value, radioValue);
}

function displayBooks(title, author, pages, isRead) {

    const book = document.createElement("div");
    book.classList.add("book");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `by ${author}`;

    const bookPages = document.createElement("p");
    bookPages.textContent = `${pages} pages`;

    const bookIsRead = document.createElement("button");
    bookIsRead.textContent = book.isRead ? "Read" : "Not Read";
    bookIsRead.addEventListener("click", () => {
        bookIsRead.textContent = book.bookIsRead ? "Read" : "Not Read";
        book.bookIsRead = !book.bookIsRead;
    });
    if (isRead === true) {
        bookIsRead.textContent = "Read";
    }

    const deleteBook = document.createElement("button");
    deleteBook.classList.add("delete-button");
    deleteBook.textContent = "Delete Book"
    deleteBook.addEventListener("click", () => {
        let index = myLibrary.findIndex(myLibrary => myLibrary.title === title);
        myLibrary.splice(index, 1);
        libraryDisplay.removeChild(book);
    });

    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookIsRead);
    book.appendChild(deleteBook);
    libraryDisplay.appendChild(book);
}

const reset = () => {
    title.value = "";
    author.value = "";
    pages.value = "";
}

openButton.addEventListener("click", () => {
    bookDialog.showModal();
});

submitBook.addEventListener("click", (e) => {
    e.preventDefault();

    if (title.value !== "" && author.value !== "") {
        addBookToLibrary();
        reset();
        bookDialog.close();
    }
});
displayBooks("The Hobbit", "J. R. R. Tolkien", 310, true);
displayBooks("Americanah", "Chimamanda Adichie", 477, false);
