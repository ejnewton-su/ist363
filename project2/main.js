const MDB_API_KEY = "e11ad323e43512aa282d48082368f76a";
const YOUTUBE_API_KEY = "AIzaSyCTpy6Ak9-qN-cbzyTVsVw0XJqZg8emNLs";

const movieTitle = "Avengers Endgame";

async function fetchMovieDetails(){
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${MDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`
    );
    const data = await res.json();
    const movie = data.results[0];
    console.log(movie);

    const detailHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Original Language:</strong> ${movie.original_language === "en" ? "English" : movie.original_language}</p>
      <p><strong>Rating:</strong> ${movie.adult ? "R" : "PG-13"}</p>
      <p><strong>Description:</strong> ${movie.overview}</p>
    `;

    document.getElementById("movie-details").innerHTML = detailHTML;

    fetchMoviePosters(movie.id);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

async function fetchMoviePosters(movieId){
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${MDB_API_KEY}`
    );
    const data = await res.json();
    const posters = data.posters.slice(0, 5); 

    const postersHTML = posters
      .map(
        (poster) =>
          `<img src="https://image.tmdb.org/t/p/w300${poster.file_path}" alt="Poster"/>`
      )
      .join("");
    document.getElementById("poster-grid").innerHTML = postersHTML;
  } catch (error) {
    console.error("Error fetching posters:", error);
  }
}

async function fetchTrailer(){
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        movieTitle + ' official trailer'
      )}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
    );
    const data = await res.json();
    const videoId = data.items[0].id.videoId;

    const trailerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    `;
    document.getElementById("trailer-video").innerHTML = trailerHTML;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}

fetchMovieDetails();
fetchTrailer();