import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie, MovieResult, SearchService } from "../services/search.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() movie: MovieResult;
  private completeMovie: Movie;

  constructor(public searchService: SearchService, private modalController: ModalController) { }

  obtainImage(imagePath: string) {
    return environment.image_prefix+imagePath;
  }

  ngOnInit() {
    this.mainSearch();
  }

  mainSearch() {
    let queryString = this.searchService.craftQuerySingle(this.movie.id);
    this.searchService.searchMovie(queryString);
    setTimeout(() => this.updateMovie(this.searchService.lastMovie), 2000);
  }

  private updateMovie(body: Movie) {
    this.completeMovie = body;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
