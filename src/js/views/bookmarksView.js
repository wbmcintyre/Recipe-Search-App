import View from './view.js';
import previewView from './preveiwView.js';

class BookmarksView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.bookmarks');
    this.errorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    this.message = '';
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
