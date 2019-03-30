
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">&times;</a></td>
    `;

    list.appendChild(row);
  }
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    const text = document.createTextNode(message);
    div.appendChild(text);

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // error timeout
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    title.value = '';
    author.value = '';
    isbn.value = '';
  }
}

// Event Listener for add book
const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit',
function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // Validation
  if(title === '' || author === '' || isbn === '') {

    ui.showAlert('Please fill all fields', 'error');
  } else {
    ui.addBookToList(book);

    ui.showAlert('New Book Added!', 'success');

    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (e) => {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book removed from store!', 'success')

  e.preventDefault();
})
