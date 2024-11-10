class Book {
    constructor({ title, author, isbn }) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.status = true;
    }

    setStatus(status) {
        this.status = status;
    }
}

class Library {
    constructor(data) {
        this.books = data;
    }
    addBook(book) {
        this.books.push(new Book(book));
    }
    borrowBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);

        if (index === -1) {
            return 'Ошибка! Книга не найдена!';
        } else {
            this.books[index].setStatus(false);
            return this.books[index].title;
        }
    }
    returnBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);

        if (index === -1) {
            return 'Ошибка! Книга не найдена!';
        } else {
            this.books[index].setStatus(true);
            return this.books[index].title;
        }
    }
    listAvailableBooks() {
        return this.books.filter(book => book.status);
    }
}

const library = new Library([]);

initApp();

async function getData() {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=10';
    const result = await fetch(url).then(res => res.json());

    result.items.map(book => {
        const { volumeInfo } = book;
        library.addBook({
            title: volumeInfo.title,
            author: volumeInfo?.authors ? volumeInfo.authors.join(', ') : volumeInfo.publisher,
            isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[1].identifier : book.id,
        })
    });
};

async function initApp() {
    await getData();
    console.log('1. Доступные книги:', library.listAvailableBooks());
    console.log('2. Берем книгу:', library.borrowBook("5041895287в"));
    console.log('3. Берем другую книгу:', library.borrowBook("5977508301"));
    console.log('4. Берем еще книгу:', library.borrowBook("504175067X"));
    console.log('5. Доступные книги:', library.listAvailableBooks());
    console.log('6. Здаем книгу:', library.returnBook("5977508301"));
    console.log('7. Доступные книги:', library.listAvailableBooks());
}

