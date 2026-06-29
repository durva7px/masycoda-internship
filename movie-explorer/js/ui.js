export const showLoading = () => {

    document
        .getElementById("loading")
        .classList.remove("hidden");
};

export const hideLoading = () => {

    document
        .getElementById("loading")
        .classList.add("hidden");
};

export const showError = message => {

    document
        .getElementById("error")
        .textContent = message;
};

export const clearError = () => {

    document
        .getElementById("error")
        .textContent = "";
};

export const clearMovies = () => {

    document
        .getElementById("movieContainer")
        .innerHTML = "";
};

export const renderMovies = (movies, favorites) => {

    const container =
        document.getElementById("movieContainer");

    movies.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";

        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image";

        const isFavorite =
            favorites.some(
                fav => fav.imdbID === movie.imdbID
            );

        card.innerHTML = `

            <img src="${poster}" alt="${movie.Title}">

            <div class="movie-info">

                <h3>${movie.Title}</h3>

                <p>
                    <strong>Year:</strong>
                    ${movie.Year}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${movie.Type}
                </p>

                <div class="card-buttons">

                    <button
                        class="favorite-btn"
                        data-id="${movie.imdbID}"
                    >

                        ${isFavorite
                            ? "❤️ Added"
                            : "🤍 Favorite"}

                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

};

export const renderFavorites = favorites => {

    const container =
        document.getElementById(
            "favoritesContainer"
        );

    container.innerHTML = "";

    favorites.forEach(movie => {

        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image";

        const card =
            document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `

            <img src="${poster}">

            <div class="movie-info">

                <h3>${movie.Title}</h3>

                <p>${movie.Year}</p>

                <p>${movie.Type}</p>

                <div class="card-buttons">

                    <button
                        class="remove-btn"
                        data-id="${movie.imdbID}"
                    >

                        Remove

                    </button>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

};

export const showLoadMore = () => {

    document
        .getElementById("loadMoreBtn")
        .classList.remove("hidden");
};

export const hideLoadMore = () => {

    document
        .getElementById("loadMoreBtn")
        .classList.add("hidden");
};