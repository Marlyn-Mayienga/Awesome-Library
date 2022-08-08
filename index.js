/* eslint max-classes-per-file: ["error", 2] */

import Book from './modules/book.js';
import getTime from './modules/day-time.js';

const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const form = document.getElementById('book-form');
const bookSection = document.querySelector('.library');

// Array of books
class BookCollection {
  constructor(books = []) {
    this.books = books;
  }

  // Add a book
  add =(addBook) => {
    this.books.push(addBook);
    display(addBook);
    remove();
    saveToLocalStorage();
    inputAuthor.value = '';
    inputTitle.value = '';
  }

  // Remove a book
  remove =()  => {
    const removeBtn = document.querySelectorAll('.remove-book');
    removeBtn[removeBtn.length - 1].addEventListener('click', (e) => {
      removeFromCollection(e.target);
      bookSection.removeChild(e.target.parentNode);
    });
  }

  // Display book dynamically
  display=(data)=> {
    if (this) {
      const div = document.createElement('div');
      div.classList.add('book-collection', 'bookdiv');
      div.innerHTML = `<h4>"${data.title}" by
                    ${data.author}</h4>
                    <button data-value="${data.title}-${data.author}" type="button" class ="remove-book">Remove</button></>`;
      bookSection.appendChild(div);
    }
  }

  removeFromCollection =(data) =>{
    const arr = data.getAttribute('data-value').split('-');
    this.books = this.books.filter(
      (item) => item.title + item.author !== arr[0] + arr[1],
    );
    saveToLocalStorage();
  }

  // Saving To storage
  saveToLocalStorage =()=> {
    localStorage.setItem('addBook', JSON.stringify({ bookColl: this.books }));
  }
}

const collect = new BookCollection();
if (localStorage.getItem('addBook')) {
  const localBooks = JSON.parse(localStorage.getItem('addBook'));
  localBooks.bookColl.forEach((item) => {
    collect.add(new Book(item.title, item.author));
  });
}

form.addEventListener('submit', (e) => {
  // prevents default behaviour of the form of submitting
  e.preventDefault();
  collect.add(new Book(inputTitle.value, inputAuthor.value));
});

// -----Navbar functionality-----//

const aBookList = document.querySelector('#book-list');
const aAddBook = document.querySelector('#add-book');
const aContact = document.querySelector('#contact-us');

const sections = document.getElementsByTagName('section');

/**
 * Show Section based on ID Passed
 * @param id - ID of Section to be shown
 */
function showSection(id) {
  for (let i = 0; i < sections.length; i += 1) {
    if (sections[i].id.includes(id)) {
      sections[i].style.display = 'block';
    } else {
      sections[i].style.display = 'none';
    }
  }
}
aBookList.addEventListener('click', () => {
  showSection('library-section');
});
aAddBook.addEventListener('click', () => {
  showSection('new-book-section');
});
aContact.addEventListener('click', () => {
  showSection('contact-section');
});
showSection('new-book-section');

const init = () => {
    getTime();
};
  
init();