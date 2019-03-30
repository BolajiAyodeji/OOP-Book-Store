
// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = (book) => {
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

// Show Alert
UI.prototype.showAlert = (message, className) => {
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

// Clear Fields
UI.prototype.clearFields = () => {
  title.value = '';
  author.value = '';
  isbn.value = '';
}

// Event Listeners
const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit',
function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // init Book
  const book = new Book(title, author, isbn);

  // init UI
  const ui = new UI();

  // Validation
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill all fields', 'error');
  } else {
    ui.addBookToList(book);

    // Success Alert
    ui.showAlert('New Book Added!', 'success');

    ui.clearFields();
  }

  e.preventDefault();
})
