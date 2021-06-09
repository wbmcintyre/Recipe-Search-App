import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './preveiwView.js';

class ResultsView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.results');
    this.errorMessage = 'No recipes found for your query! Please try again :)';
  }

  generateMarkup() {
    return this.data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
