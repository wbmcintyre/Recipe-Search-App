import View from './view.js';
import previewView from './preveiwView.js';

class AddRecipeView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.upload');
    this.window = document.querySelector('.add-recipe-window');
    this.overlay = document.querySelector('.overlay');
    this.btnOpen = document.querySelector('.nav__btn--add-recipe');
    this.btnClose = document.querySelector('.btn--close-modal');
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
    this.message = 'Recipe was successfully uploaded';
  }

  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new AddRecipeView();
