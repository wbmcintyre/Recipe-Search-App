import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2
//b69119c9-5466-4d00-97c6-a28d7251ef00
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    //rendering recipe
    recipeView.render(model.state.recipe);
    //update bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (page) {
  //get current page number and update resultsView
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (model)
  model.updateServings(newServings);
  //Update the view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //if recipe isn't bookmarked, add it ... else if recipe has bookmark, remove it
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update display
  recipeView.update(model.state.recipe);

  //update bookmarks nav tab
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    //Show render spinner
    addRecipeView.renderSpinner();

    //upload recipe
    await model.uploadRecipe(data);

    //render recipe
    recipeView.render(model.state.recipe);

    //Display success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerUpdateBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
