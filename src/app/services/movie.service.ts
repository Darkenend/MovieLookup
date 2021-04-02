import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  
}

/**
 * Interface for a movie's information.
 * @param {boolean} [adult] - Movie contains adult (pornographic) content.
 * @param {string} [backdrop_path] - Image for backdrops, not the full path.
 * @param {object} [belongs_to_collection] - Information of the collection the movie might belong to, null if it belongs to no collection.
 * @param {number} [budget] - Movie's budget.
 * @param {Array<Genre>} [genres] - Movie's genres information
 * @param {string} [homepage] - Movie's website
 * @param {number} [id] - Movie's ID.
 * @param {string} [imdb_id] - Movie's IMDB ID.
 * @param {string} [original_language] - Movie's original language.
 * @param {string} [original_title] - Title in the movie's original language.
 * @param {string} [overview] - Short description of the movie.
 * @param {number} [popularity] - How popular the movie is in TheMovieDB.
 * @param {string} [poster_path] - Poster image for the movie, not the full path.
 * @param {Array<Production_Company} [production_companies] - Companies which produced the movie.
 * @param {Array<Production_Country} [production_countries] - Countries where the movie was produced.
 * @param {string} [release_date] - When was the movie released.
 * @param {number} [revenue] - How much money the movie made.
 * @param {number} [runtime] - How long does the movie last in minutes.
 * @param {Array<Spoken_Language>} [spoken_languages] - Languages in which the movie is available.
 * @param {string} [status] - Status of the movie (Released, Canceled, Announced...)
 * @param {string} [tagline] - Movie's tagline
 * @param {boolean} [video] - The movie has a video in TheMovieDB.
 * @param {number} [vote_average] - Average score of the movie in TheMovieDB.
 * @param {number} [vote_count] - How many times it's been voted on in TheMovieDB.
 */
export interface Movie {
  adult?: boolean,
  backdrop_path?: string,
  belongs_to_collection?: object,
  budget?: number,
  genres?: Array<Genre>,
  homepage?: string,
  id?: number,
  imdb_id?: string,
  original_language?: string,
  original_title?: string,
  overview?: string,
  popularity?: string,
  poster_path?: string,
  production_companies?: Array<Production_Company>,
  production_countries?: Array<Production_Country>,
  release_date?: string,
  revenue?: number,
  runtime?: number,
  spoken_languages?: Array<Spoken_Language>,
  status?: string,
  tagline?: string,
  video?: boolean,
  vote_average?: number,
  vote_count?: number
}

/**
 * Genre which the movie is classified into.
 * @param {number} [id] - TheMovieDB's Genre ID.
 * @param {number} [name] - TheMovieDB's Genre Name.
 */
interface Genre {
  id?: number,
  name?: number
}

/**
 * Company that produced the movie.
 * @param {string} [name] - Name of the production company.
 * @param {number} [id] - TheMovieDB's ID of the production company.
 * @param {string} [logo_path] - Path for the logo of the production company, not the full path.
 * @param {string} [origin_country] - Country of the production company.
 */
interface Production_Company {
  name?: string,
  id?: number,
  logo_path?: string,
  origin_country?: string
}

/**
 * Country where the movie was produced.
 * @param {string} [iso_3166_1] - [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) code of the country where the movie was produced.
 * @param {string} [name] - Name of the country where the movie was produced.
 */
interface Production_Country {
  iso_3166_1?: string,
  name?: string
}

/**
 * Language available in the movie.
 * @param {string} [iso_639_1] - [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code of the country where the movie was produced.
 * @param {string} [name] - Name of the country where the movie was produced.
 */
interface Spoken_Language {
  iso_639_1?: string,
  name?: string
}
