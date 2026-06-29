
const API_KEY = "e07c231e";
console.log(API_KEY)
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (movieName, page = 1) => {

    const url =
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Network Error");
    }

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error);
    }

    return data;
};