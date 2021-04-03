import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private SEARCH_PREFIX = 'https://api.themoviedb.org/3/search/movie?';

  constructor() { }

  public craftQuery(qString: string, qPage = 1, qLanguage = 'es-ES', qInclude_adult = false, qRegion?: string, qYear?: number, qPrimary_release_year?: number) {
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
}

// More info about this interface: https://developers.themoviedb.org/3/search/search-movies
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