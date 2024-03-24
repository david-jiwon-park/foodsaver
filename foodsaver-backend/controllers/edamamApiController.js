const db = require('knex')(require('../knexfile'));
const axios = require('axios');

// Getting recipes from Edamam API using the ingredients the user selected from the front end
const getRecipes = async (req, res) => {
  const apiURL = 'https://api.edamam.com/api/recipes/v2?type=public';
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;

  const selectedIngredients = req.body.selectedIngredients

  axios
  .get(`${apiURL}&q=${selectedIngredients.join('+')}&app_id=${appId}&app_key=%20${appKey}`)
  .then((response) => {
    res.status(200).json(response.data);
  })
  .catch((error) => {
    res.status(500).json({ error: "Server error" });
  });
};

// Retrieving favorite recipes from Edamam API using the uri's of the recipes that the user favorited  
const getFavorites = async (req, res) => {
  const apiURLforURI = 'https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_';
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  const favorites = req.body.favorites;

  // Mapping through each uri in the favorites array, as the Edamam API only allows for one uri to be searched for per call
  const uriArray = favorites.map((favorite) => (favorite.recipe_uri))
  const dataPromises = uriArray.reverse().map(recipe_uri =>
    axios.get(`${apiURLforURI}${recipe_uri}&app_id=${appId}&app_key=${appKey}%09`)
      .then(response => response.data.hits)
      .catch(error => {
        console.log(error);
        return []; // Return an empty array in case of an error
    })
  );

  try {
    const allData = await Promise.all(dataPromises);
    // Concatenate allData arrays into one array
    const mergedData = [].concat(...allData);
    res.status(200).json(mergedData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  };
};

module.exports = {
  getRecipes, 
  getFavorites
};