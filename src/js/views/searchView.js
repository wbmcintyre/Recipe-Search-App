import View from './view.js';

class SearchView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.search');
  }

  getQuery() {
    const val = this.parentElement.querySelector('.search__field').value;
    this.clearInput();
    return val;
  }

  clearInput() {
    this.parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
