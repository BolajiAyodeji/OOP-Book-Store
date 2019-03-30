"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function Book(title, author, isbn) {
  _classCallCheck(this, Book);

  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, [{
    key: "addBookToList",
    value: function addBookToList(book) {
      var list = document.getElementById('book-list');
      var row = document.createElement('tr');
      row.innerHTML = "\n    <td>".concat(book.title, "</td>\n    <td>").concat(book.author, "</td>\n    <td>").concat(book.isbn, "</td>\n    <td><a href=\"#\" class=\"delete\">\u274C</a></td>\n    ");
      list.appendChild(row);
    }
  }, {
    key: "showAlert",
    value: function showAlert(message, className) {
      var div = document.createElement('div');
      div.className = "alert ".concat(className);
      var text = document.createTextNode(message);
      div.appendChild(text);
      var container = document.querySelector('.container');
      var form = document.querySelector('#book-form');
      container.insertBefore(div, form); // error timeout

      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    }
  }, {
    key: "deleteBook",
    value: function deleteBook(target) {
      if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  }, {
    key: "clearFields",
    value: function clearFields() {
      title.value = '';
      author.value = '';
      isbn.value = '';
    }
  }]);

  return UI;
}(); // Local storage


var Store =
/*#__PURE__*/
function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "getBooks",
    value: function getBooks() {
      var books;

      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }
  }, {
    key: "displayBooks",
    value: function displayBooks() {
      var books = Store.getBooks();
      books.forEach(function (book) {
        var ui = new UI();
        ui.addBookToList(book);
      });
    }
  }, {
    key: "addBook",
    value: function addBook(book) {
      var books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, {
    key: "removeBook",
    value: function removeBook(isbn) {
      var books = Store.getBooks();
      books.forEach(function (book, index) {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }]);

  return Store;
}(); // DOM LOAD EVENT


document.addEventListener('DOMContentLoaded', Store.displayBooks); // Event Listener for add book

var bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function (e) {
  var title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
  var book = new Book(title, author, isbn);
  var ui = new UI(); // Validation

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all fields', 'error');
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert('New Book Added!', 'success');
    ui.clearFields();
  }

  e.preventDefault();
}); // Event listener for delete

var bookList = document.getElementById('book-list');
bookList.addEventListener('click', function (e) {
  var ui = new UI();
  ui.deleteBook(e.target); // remove from LS

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book removed from Store!', 'success');
  e.preventDefault();
});