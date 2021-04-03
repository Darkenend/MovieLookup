import { Component } from '@angular/core';
import { MovieSearch, SearchService } from "../services/search.service";
import { ToastController, ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public searchValue: string;
  public searchResults: MovieSearch = {
    page: 1,
    total_pages: 1
  };

  constructor(public searchService: SearchService, public toastController: ToastController, public modalController: ModalController) {}

  private onSearchChange($event) {
    this.searchValue = $event.detail.value;
    this.searchResults.page = 1;
    this.searchResults.total_pages = 1;
    this.mainSearch(this.searchValue, this.searchResults.page);
  }

  private mainSearch(searchValue: string, page: number) {
    let queryString = this.searchService.craftQueryMultiple(searchValue, page);
    this.searchService.searchMovies(queryString);
    setTimeout(() => this.updateResults(this.searchService.movieSearch), 2000);
  }

  

  private previousPage() {
    if (this.searchResults.page === 1) {
      this.notify('There\'s no page 0', 2000);
    } else {
      this.searchResults.page--;
      this.mainSearch(this.searchValue, this.searchResults.page);
    }
  }

  private nextPage() {
    if (this.searchResults.page === this.searchResults.total_pages) {
      this.notify('No more movies match', 2000);
    } else {
      this.searchResults.page++;
      this.mainSearch(this.searchValue, this.searchResults.page);
    }
  }
  
  private updateResults(data) {
    console.log("Updating Results...");
    this.searchResults.results = data.results;
    this.searchResults.total_pages = data.total_pages;
    console.log("Updated Results.");
    this.printInfo();
  }

  private printInfo() {
    console.log(this.searchValue);
    console.log(this.searchResults.results);
    console.log(this.searchResults.page);
    console.log(this.searchResults.total_pages);
  }

  async notify(sentMessage: string, sentTime: number) {
    const toast = await this.toastController.create({
      message: sentMessage,
      duration: sentTime
    });
    toast.present();
  }

  async presentModal(movieObj: MovieSearch) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'movie': movieObj
      }
    });
    return await modal.present();
  }
}