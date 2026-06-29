import { searchMovies } from "./api.js";

import {

    renderMovies,
    renderFavorites,

    showLoading,
    hideLoading,

    showError,
    clearError,

    clearMovies,

    showLoadMore,
    hideLoadMore

} from "./ui.js";

import {

    getFavorites,
    addFavorite,
    removeFavorite

} from "./favorites.js";

let currentSearch = "";

let currentPage = 1;

let currentMovies = [];

renderFavorites(
    getFavorites()
);

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const loadMoreBtn =
document.getElementById("loadMoreBtn");

const movieContainer =
document.getElementById("movieContainer");

const favoritesContainer =
document.getElementById("favoritesContainer");

const performSearch =
async(reset = true)=>{

    try{

        if(reset){

            currentPage = 1;

            currentMovies = [];

            clearMovies();
        }

        clearError();

        showLoading();

        const data =
        await searchMovies(
            currentSearch,
            currentPage
        );

        currentMovies.push(
            ...data.Search
        );

        renderMovies(
            data.Search,
            getFavorites()
        );

        if(
            currentMovies.length <
            Number(data.totalResults)
        ){

            showLoadMore();

        }
        else{

            hideLoadMore();

        }

    }

    catch(error){

        showError(
            error.message
        );

        hideLoadMore();

    }

    finally{

        hideLoading();

    }

};

searchBtn.addEventListener(
"click",
()=>{

    currentSearch =
    searchInput.value.trim();

    if(!currentSearch){

        showError(
            "Please enter a movie name."
        );

        return;
    }

    performSearch();

});

searchInput.addEventListener(
"keypress",
e=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

loadMoreBtn.addEventListener(
"click",
()=>{

    currentPage++;

    performSearch(false);

});

movieContainer.addEventListener(
"click",
e=>{

    if(
        e.target.classList.contains(
            "favorite-btn"
        )
    ){

        const id =
        e.target.dataset.id;

        const movie =
        currentMovies.find(
            movie =>
            movie.imdbID===id
        );

        addFavorite(movie);

        renderFavorites(
            getFavorites()
        );

        clearMovies();

        renderMovies(
            currentMovies,
            getFavorites()
        );

    }

});

favoritesContainer.addEventListener(
"click",
e=>{

    if(
        e.target.classList.contains(
            "remove-btn"
        )
    ){

        removeFavorite(
            e.target.dataset.id
        );

        renderFavorites(
            getFavorites()
        );

        clearMovies();

        renderMovies(
            currentMovies,
            getFavorites()
        );

    }

});