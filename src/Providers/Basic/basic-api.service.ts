import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicApiService {
  isLoading: boolean;
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
      this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
      // message: '<img src="' + this.app_assets_url + '">'
    });
    return await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async dismissloader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed this loading'));
  }

  async alert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: [{
          text: 'OK',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });

    await alert.present();
  }

  imagepas(){
    return '';
  }


}
