
// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
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

// Clear Fields
UI.prototype.clearFields = function() {
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

  const book = new Book(title, author, isbn);

  const ui = new UI();

  ui.addBookToList(book);

  ui.clearFields();

  e.preventDefault();
})
