import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from "../services/search.service";
import { ToastController, ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public searchValue: string;
  public movies;
  public current_page = 1;
  public total_pages = 1;

  constructor(public searchService: SearchService, public toastController: ToastController, public modalController: ModalController, private http: HttpClient) {}

  private onSearchChange($event) {
    this.searchValue = $event.detail.value;
    this.current_page = 1;
    this.total_pages = 1;
    this.mainSearch(this.searchValue, this.current_page);
  }

  private mainSearch(searchValue: string, page: number) {
    let queryString = this.searchService.craftQuery(searchValue, page);
    this.searchMovie(queryString);
  }

  private searchMovie(queryString: string) {
    this.http.get(queryString, {observe: 'response', responseType: 'json'}).subscribe(data => {
      this.updateResults(data.body);
      this.updateList();
    });
  }

  private previousPage() {
    if (this.current_page === 1) {
      this.notify('There\'s no page 0', 2000);
    } else {
      this.current_page--;
      this.mainSearch(this.searchValue, this.current_page);
    }
  }

  private nextPage() {
    if (this.current_page === this.total_pages) {
      this.notify('No more movies match', 2000);
    } else {
      this.current_page++;
      this.mainSearch(this.searchValue, this.current_page);
    }
  }
  
  private updateResults(data) {
    console.log("Updating Results...");
    this.movies = data.results;
    this.total_pages = data.total_pages;
    this.printInfo();
    console.log("Updated Results.");
  }

  private updateList() {
    console.log("Updating List...");
    console.log("Updated List.");
  }

  private printInfo() {
    console.log(this.searchValue);
    console.log(this.movies);
    console.log(this.current_page);
    console.log(this.total_pages);
  }

  async notify(sentMessage: string, sentTime: number) {
    const toast = await this.toastController.create({
      message: sentMessage,
      duration: sentTime
    });
    toast.present();
  }

  async presentModal(movieObj) {
    console.log(movieObj);
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'movie': movieObj
      }
    });
    return await modal.present();
  }
}