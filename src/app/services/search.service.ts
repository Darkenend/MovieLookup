import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public movieSearch: MovieSearch;
  public lastMovie: Movie;

  constructor(private http: HttpClient) { }

  /**
   * Creates a string with the appropiate link to perform a call to TheMovieDB's API to search for movies, with the parameters supplied
   * @param qString String that we want to look up in TheMovieDB, this will be most commonly, the movie's title
   * @param qPage Page of the movies' search that we want to obtain
   * @param qLanguage Language in which the results will be output
   * @param qInclude_adult Do we want adult/pornographic content in the search?
   * @param qRegion Region from the movie
   * @param qYear Year in which the movie was released
   * @param qPrimary_release_year Year in which the movie was released primarily
   * @returns String with the link to perform the HTTP Request to TheMovieDB's API
   */
  public craftQueryMultiple(qString: string, qPage = 1, qLanguage = 'es-ES', qInclude_adult = false, qRegion?: string, qYear?: number, qPrimary_release_year?: number) {
    let searchPrefix = 'https://api.themoviedb.org/3/search/movie?';
    let queryInfo: QueryStringMultiple = {
      api_key: environment.api_key,
      language: qLanguage,
      query: encodeURI(qString),
      page: qPage,
      include_adult: qInclude_adult,
      region: qRegion,
      year: qYear,
      primary_release_year: qPrimary_release_year
    };
    // Clean up object
    Object.keys(queryInfo).forEach(key => queryInfo[key] === undefined ? delete queryInfo[key] : {});
    let fullQueryString = searchPrefix;
    // Add elements to querystring
    Object.entries(queryInfo).forEach(
      ([key, value]) => fullQueryString += key+'='+value+'&'
    );
    fullQueryString = fullQueryString.slice(0, -1); // Remove last &
    return fullQueryString;
  }

  /**
   * Creates a string with the appropiate link to perform a call to TheMovieDB's API to obtain a movie's information, with the paramters supplied
   * @param movieID ID of the movie to obtain the details from
   * @param qLanguage Language in which the results will be output
   * @returns String with the link to perform the HTTP Request to TheMovieDB's API
   */
  public craftQuerySingle(movieID: number, qLanguage = 'es-ES') {
    let searchPrefix = 'https://api.themoviedb.org/3/movie/';
    let fullQueryString = searchPrefix+movieID+'?api_key='+environment.api_key+'&language='+qLanguage;
    return fullQueryString;
  }

  /**
   * Performs an HTTP Request to TheMovieDB's API to search for movies, then stores them.
   * @param queryString String with the link for the API call.
   */
  public searchMovies(queryString: string) {
    this.http.get(queryString, {observe: 'response', responseType: 'json'}).subscribe(data => {
      this.movieSearch = data.body;
    });
  }

  /**
   * Performs an HTTP Request to TheMovieDB's API to obtain a single movie, then stores it.
   * @param queryString String with the link for the API call.
   */
  public searchMovie(queryString: string) {
    this.http.get(queryString, {observe: 'response', responseType: 'json'}).subscribe(data => {
      this.lastMovie = data.body;
    });
  }
}

// IMPORTANT: More info about these interfaces: https://developers.themoviedb.org/3/search/search-movies
/**
 * This serves the purpose of making a querystring crafting easier.
 * @param {string} api_key - API Key from TheMovieDB, for more information go [here](https://www.themoviedb.org/documentation/api).
 * @param {string} [language=en-US] - Language of the Movie, in [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format. Optional, default is `en-US`.
 * @param {string} query - Text for the query, this should be URI encoded.
 * @param {number} [page=1] - Page of the results. Minimum is `1`, maximum is `1000`, default is `1`.
 * @param {boolean} [include_adult=false] - Choose whether to include adult (pornographic) content in the results. Default is `false`.
 * @param {string} region - Specify a [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) code to filter release dates. Must be uppercase.
 * @param {number} [year] - Year when the movie was released.
 * @param {number} [primary_release_year] - Year when the movie was initially released.
 */
export interface QueryStringMultiple {
  api_key: string,
  language?: string,
  query: string,
  page?: number,
  include_adult?: boolean,
  region?: string,
  year?: number,
  primary_release_year?: number
}

/**
 * This is an interface for any movie's search.
 * @param {number} page - Page of the search, is between 1 and the total amount of pages.
 * @param {Array<MovieResult>} results - All movies found, in groups of up to 20 for each page.
 * @param {number} total_results - Total amount of movies found.
 * @param {number} total_pages - Total amount of pages.
 */
export interface MovieSearch {
  page?: number,
  results?: Array<MovieResult>,
  total_results?: number,
  total_pages?: number
}

/**
 * This interface is for individual movies' search results.
 * @param {boolean} adult - If the movie has adult/pornographic content.
 * @param {string} backdrop_path - Image for a background. Must be appended on a link to TheMovieDB.
 * @param {Array<number>} genre_ids - Array with ID of Genres for TheMovieDB.
 * @param {number} id - TheMovieDB's ID
 * @param {string} original_language - Original language of the movie.
 * @param {string} original_title - Title of the movie in it's original language.
 * @param {string} overview - Short summary of the movie's plot.
 * @param {number} popularity - Current popularity ranking in TheMovieDB.
 * @param {string} poster_path - Image for the movie's poster. Must be appended on a link to TheMovieDB.
 * @param {string} release_date - Date in which the movie was released.
 * @param {string} title - Title of the movie in the searched language.
 * @param {boolean} video - Does this movie have a video in TheMovieDB?
 * @param {number} vote_average - The average rating out of 10 this movie has been given by TheMovieDB users.
 * @param {number} vote_count - The number of times this movie has been rated on TheMovieDB.
 */
export interface MovieResult {
  adult?: boolean,
  backdrop_path?: string,
  genre_ids?: Array<number>,
  id?: number, 
  original_language?: string,
  original_title?: string,
  overview?: string,
  popularity?: number,
  poster_path?: string,
  release_date?: string,
  title?: string,
  video?: boolean,
  vote_average?: number,
  vote_count?: number
}

// IMPORTANT: More info about this interface: https://developers.themoviedb.org/3/movies/get-movie-details
/**
 * Individual Movie's Details obtained from TheMovieDB.
 * @param {boolean} adult - If the movie has adult/pornographic content.
 * @param {string} backdrop_path - Image for a background. Must be appended on a link to TheMovieDB.
 * @param {Object} belongs_to_collection - Collection this movie belongs to.
 * @param {number} budget - Money spent on making the movie.
 * @param {Array<Genre>} genres - Array with Genres of the movie.
 * @param {string} homepage - Movie's website.
 * @param {number} id - TheMovieDB's ID
 * @param {string} imdb_id - IMDB's ID for this movie.
 * @param {string} original_language - Original language of the movie.
 * @param {string} original_title - Title of the movie in it's original language.
 * @param {string} overview - Short summary of the movie's plot.
 * @param {number} popularity - Current popularity ranking in TheMovieDB.
 * @param {string} poster_path - Image for the movie's poster. Must be appended on a link to TheMovieDB.
 * @param {Array<ProductionCompany>} production_companies - Companies which produced the movie.
 * @param {Array<ProductionCountry>} production_countries - Countries where the movie was produced.
 * @param {string} release_date - Date in which the movie was released.
 * @param {number} revenue - Money that the movie made.
 * @param {number} runtime - Minutes the movie lasts for.
 * @param {Array<SpokenLanguage>} spoken_languages - Languages in which this movie is voiced in.
 * @param {MovieStatus} status - Current status of the movie.
 * @param {string} tagline - Movie's tagline.
 * @param {string} title - Title of the movie in the searched language.
 * @param {boolean} video - Does this movie have a video in TheMovieDB?
 * @param {number} vote_average - The average rating out of 10 this movie has been given by TheMovieDB users.
 * @param {number} vote_count - The number of times this movie has been rated on TheMovieDB.
 */
export interface Movie {
  adult?: boolean,
  backdrop_path?: string,
  belongs_to_collection?: Object,
  budget?: number,
  genres?: Array<Genre>,
  homepage?: string,
  id?: number,
  imdb_id?: string,
  original_language?: string,
  original_title?: string,
  overview?: string,
  popularity?: number,
  poster_path?: string,
  production_companies?: Array<ProductionCompany>,
  production_countries?: Array<ProductionCountry>,
  release_date?: string,
  revenue?: number,
  runtime?: number,
  spoken_languages?: Array<SpokenLanguage>,
  status?: MovieStatus,
  tagline?: string,
  title?: string,
  video?: boolean,
  vote_average?: number,
  vote_count?: number
}

/**
 * Genre for a movie.
 * @param {number} id - Genre's ID in TheMovieDB.
 * @param {string} name - Name of the Genre.
 */
interface Genre {
  id?: number,
  name?: string
}

/**
 * Company that produces a movie.
 * @param {string} name - Name of the company.
 * @param {number} id - Production Company's ID in TheMovieDB.
 * @param {string} logo_path - Image for the Production Company's logo. Must be appended on a link to TheMovieDB.
 * @param {string} origin_country - Country where the Production Company is based.
 */
interface ProductionCompany {
  name?: string,
  id?: number,
  logo_path?: string,
  origin_country?: string
}

/**
 * Country where a movie was produced.
 * @param {string} iso_3166_1 - ISO 3166 1 code for a country.
 * @param {string} name - Name of the Production Country.
 */
interface ProductionCountry {
  iso_3166_1?: string,
  name?: string
}

/**
 * Language in which a movie is voiced.
 * @param {string} iso_639_1 - ISO 639 1 code for a language.
 * @param {string} name - Name of the Spoken Language.
 */
interface SpokenLanguage {
  iso_639_1?: string,
  name?: string
}

enum MovieStatus {
  Rumored = 'Rumored',
  Planned = 'Planned',
  InProduction = 'In Production',
  PostProduction = 'Post Production',
  Released = 'Released',
  Canceled = 'Canceled'
}