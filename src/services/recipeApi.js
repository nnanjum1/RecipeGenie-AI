import api from "./api";



export const getRecipes = async () => {
    console.log("Base URL:", api.defaults.baseURL);

    const response = await api.get("/recipes");

    console.log("Response:", response);
    console.log("Data:", response.data);

    return response.data;
};


export const getMyRecipes = async (email) => {

    const { data } = await api.get(
        `/my-recipes/${encodeURIComponent(email)}`
    );

    return data;

};



export const getRecipe = async (id) => {
    const { data } = await api.get(`/recipes/${id}`);
    return data;
};

export const addRecipe = async (recipe) => {
    const { data } = await api.post("/recipes", recipe);
    return data;
};

export const deleteRecipe = async (id) => {
    const { data } = await api.delete(`/recipes/${id}`);
    return data;
};

export const updateRecipe = async ({ id, recipe }) => {
    const { data } = await api.patch(`/recipes/${id}`, recipe);
    return data;
};



export const generateRecipe = async (recipeData) => {
    const { data } = await api.post("/generate-recipe", recipeData);
    return data;
};

export const saveRecipe = async (recipe) => {

    const res = await api.post(
        "/recipes",
        recipe
    );

    return res.data;

};

export const getRecipeImage = async (query) => {

    const res = await api.post(
        "/recipe-image",
        {
            query
        }
    );


    return res.data.image;

};

export const checkFavorite = async (recipeId, email) => {
    const { data } = await api.get(
        `/favorites/${recipeId}/${encodeURIComponent(email)}`
    );
    return data;
};

export const saveFavorite = async (recipeId, userEmail) => {
    const { data } = await api.post("/favorites", {
        recipeId,
        userEmail,
    });
    return data;
};

export const getMyFavorites = async (email) => {

    const { data } = await api.get(
        `/favorites/${encodeURIComponent(email)}`
    );

    return data;

};



export const removeFavorite = async (recipeId, email) => {

    const { data } = await api.delete(
        `/favorites/${recipeId}?userEmail=${encodeURIComponent(email)}`
    );

    return data;

};
export const addReview = async (reviewData) => {

    const { data } = await api.post(
        "/reviews",
        reviewData
    );

    return data;

};
export const getReviews = async () => {

    const { data } = await api.get("/reviews");

    return data;

};