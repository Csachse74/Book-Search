export const getSavedBookIds = () => {
  const savedBooks = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];
  return savedBooks;
};
export const saveBookIds = (bookId) => {
  if (bookId.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookId));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (Id) => {
  const savedIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedIds) {
    return false;
  }
  const updateSavedBooks = savedIds?.filter((savedBook) => savedBook !== Id);
  localStorage.setItem('saved_books', JSON.stringify(updateSavedBooks));
  return true;
};
