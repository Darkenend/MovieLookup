import { Component } from '@angular/core';
import { MovieService } from "../services/movie.service";
import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public movieService: MovieService, public searchService: SearchService) {}

  public onSearchChange($event) {
    let queryString = this.searchService.craftQuery($event.detail.value);
    let results = this.searchService.searchMovies(queryString);
  }
  
}
