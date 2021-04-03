import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() movie;

  constructor(private modalController: ModalController) { }

  obtainImage(posterPath: string) {
    console.log(posterPath);
    console.log(environment.image_prefix+posterPath);
    return environment.image_prefix+posterPath;
  }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
