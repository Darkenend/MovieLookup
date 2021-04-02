import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private SEARCH_PREFIX = 'https://api.themoviedb.org/3/search/movie?';

  constructor(public http: HttpClient) { }

  public craftQuery(qString: string, qLanguage = 'en-US', qPage = 1, qInclude_adult = false, qRegion?: string, qYear?: number, qPrimary_release_year?: number) {
    let queryInfo: QueryString= {
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
    console.log(queryInfo);
    let fullQueryString = this.SEARCH_PREFIX;
    // Add elements to querystring
    Object.entries(queryInfo).forEach(
      ([key, value]) => fullQueryString += key+'='+value+'&'
    );
    fullQueryString = fullQueryString.slice(0, -1); // Remove last &
    return fullQueryString;
  }

  public searchMovies(queryString: string) {
    this.http.get(queryString, {observe: 'response', responseType: 'json'}).subscribe(data => {console.log(data.body)});
  }
}

// More info about these interfaces: https://developers.themoviedb.org/3/search/search-movies
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
export interface QueryString {
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
 * Interface for the search results.
 * @param {number} [page] - Page of the results.
 * @param {MovieResults} [results] - The Movie results themselves, for more information, check the `MovieResults` interface.
 * @param {number} [total_results] - Number of total results.
 * @param {number} [total_pages] - Number of total pages.
 */
export interface SearchResult extends MovieResults {
  page?: number,
  results?: MovieResults,
  total_results?: number,
  total_pages?: number
}

/**
 * Interface for the movie results object inside `SearchResult`.
 * @param {string} [poster_path] - Poster image for the movie, not the full path.
 * @param {boolean} [adult] - Movie contains adult (pornographic) content.
 * @param {string} [overview] - Short description of the movie.
 * @param {string} [release_date] - When was the movie released.
 * @param {Array<number>} [genre_ids] - IDs from the movie's genres.
 * @param {number} [id] - Movie's ID.
 * @param {string} [original_title] - Title in the movie's original language.
 * @param {string} [original_language] - Movie's original language.
 * @param {string} [title] - Movie's title.
 * @param {string} [backdrop_path] - Image for backdrops, not the full path.
 * @param {number} [popularity] - How popular the movie is in TheMovieDB.
 * @param {number} [vote_count] - How many times it's been voted on in TheMovieDB.
 * @param {boolean} [video] - The movie has a video in TheMovieDB.
 * @param {number} [vote_average] - Average score of the movie in TheMovieDB.
 */
interface MovieResults {
  poster_path?: string,
  adult?: boolean,
  overview?: string,
  release_date?: string,
  genre_ids?: Array<number>,
  id?: number,
  original_title?: string,
  original_language?: string,
  title?: string,
  backdrop_path?: string,
  popularity?: number,
  vote_count?: number,
  video?: boolean,
  vote_average?: number
}