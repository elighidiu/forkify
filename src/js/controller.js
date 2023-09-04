import * as model from './model.js';
import recipeView from './views/recipeView.js';

//The imports  below polyfill our code. Polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1) -------------Loading recepies------------
    await model.loadRecipe(id);

    //2) ----------------Rendering recipes---------------

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

//implementing publisher - subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
