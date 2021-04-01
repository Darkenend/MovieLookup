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
    console.log($event.detail.value);
    let queryURL = this.searchService.craftQuery('API_KEY_HERE', $event.detail.value);
  }
  
}
