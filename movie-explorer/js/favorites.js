const STORAGE_KEY = "favoriteMovies";

export const getFavorites = () => {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];
};

export const saveFavorites = favorites => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
    );
};

export const addFavorite = movie => {

    const favorites = getFavorites();

    const exists = favorites.find(
        item => item.imdbID === movie.imdbID
    );

    if (!exists) {

        favorites.push(movie);

        saveFavorites(favorites);
    }

    return favorites;
};

export const removeFavorite = imdbID => {

    const favorites = getFavorites();

    const updatedFavorites =
        favorites.filter(
            movie => movie.imdbID !== imdbID
        );

    saveFavorites(updatedFavorites);

    return updatedFavorites;
};