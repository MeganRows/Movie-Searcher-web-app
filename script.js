
const API_URL ="https://api.themoviedb.org/3/movie/upcoming?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1";
const SearchMov_API_URL ="https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=";
 
const form = document.getElementById("form");
const search = document.getElementById("search");
const movies = document.getElementById("movies");
const searchmovies = document.getElementById('searchmovies');
const page = document.getElementById("movie-page");
const similarmovies = document.getElementById('similar-movies');


async function getMovies() {
  const { data } = await axios(API_URL);
  const movs = data.results;
  movs.forEach((result) => {
      const FetchMovies= ` <a ondblclick="Moviedetails(${result.id})">
                    <div class="movie">
                    <img src="http://image.tmdb.org/t/p/w500${result.poster_path}">
                        <h4>${result.title}</h4>
                    </div>
                </a> `;

         movies.innerHTML +=FetchMovies;
         movies.style.display='flex';
         searchmovies.style.display='none';
         page.style.display='none';
         similarmovies.style.display='none';       
         document.getElementById('similarmovies').style.display='none';
    });
}
getMovies();

  async function getSimilarmovies(id) {
    const Similarmovies_API_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1`;
    const { data } = await axios(Similarmovies_API_URL);
    const movs = data.results; 
      movs.forEach((result) => {
        const FetchMovies= `
                  <a ondblclick="Moviedetails(${result.id})">
                      <div class="movie">
                      <img src="http://image.tmdb.org/t/p/w500${result.poster_path}">
                          <h4>${result.title}</h4>
                      </div>
                  </a>          
          `;
          
          similarmovies.innerHTML += FetchMovies;
      similarmovies.style.display='flex';
      searchmovies.style.display='none';     
      });      
  }
  async function Moviedetails(id) {

    const Moviedetail_API_URL =`https://api.themoviedb.org/3/movie/${id}?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1`;
    const { data } = await axios(Moviedetail_API_URL);
    const moviedetails = data.collection;
    const title = data.title;
    const genres = data.genres;
    const datereleased = data.release_date;
    const vote = data.vote_average;
    const overview = data.overview;
    const poster_path = data.poster_path;
   
        const FetchDetail= `
        <div class="image">
        <img src="http://image.tmdb.org/t/p/w500${poster_path}">
        </div>
                    <div class="info">
                    <a  href="index.html">Back</a>
                    <h1>${title}</h1>
                                                
                    <h4>Genre:</h4>
                    <h5>${genres[0].name}</h5>

                    <h4>Release:</h4>
                    <h5>${datereleased}</h5>
                    
                    <h4>Rating:</h4>
                    <h5>${vote}</h5>

                    <h4>Synopsis:</h4>
                    <h5>${overview}</h5>
                  
                    
                </div>         
          `;

          page.innerHTML = FetchDetail;
          movies.style.display='none';
          searchmovies.style.display='none';
          page.style.display='flex';
          similarmovies.style.display='flex';
          document.getElementById('title').style.display='none';
          document.getElementById('similarmovies').style.display='block';

          getSimilarmovies(id);
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
}


async function search_movies(title) {

    const Similarmovies_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=${title}`;
      const { data } = await axios(Similarmovies_API_URL);
      const movs = data.results;
      searchmovies.innerHTML = '';
        movs.forEach((result) => {
          const FetchMovies= `
          
                    <a ondblclick="Moviedetails(${result.id})">
                        <div class="movie">
                        <img src="http://image.tmdb.org/t/p/w500${result.poster_path}">
                            <h4>${result.title}</h4>
                        </div>
                    </a>
            
            `;
            
            searchmovies.innerHTML += FetchMovies;          
            searchmovies.style.display='flex';
            movies.style.display='none';
            page.style.display='none';
            similarmovies.style.display='none';
            document.getElementById('title').style.display='none';
            document.getElementById('similarmovies').style.display='none';
        
        });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search_movies(search.value);
  });
  