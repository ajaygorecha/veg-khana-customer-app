import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { ItemdetailsPage } from '../itemdetails/itemdetails.page';
import { AppComponent } from '../app.component';
import { ProfileupdatePage } from '../profileupdate/profileupdate.page';
import { environment } from '../../environments/environment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
imgpath: any;
  allProducts: any;
  logeduser: any;
  getappsetng: any;
  wallets: any;
  istranstn: any = false;
  trnslt: any = {};
  constructor(
  	public menuCtrl: MenuController,
    public apiService: ApiService,
    public basic: BasicApiService,
	  public localApi: LocalApiService,
	  public cart: CartApiService,
    public route: Router,
    public alertController: AlertController,
    public location: Location,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public apCmp: AppComponent,
    private socialSharing: SocialSharing,
    private device: Device
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.getappsetng = this.localApi.getappseting();
    this.imgpath = environment.imagepath;
    this.logeduser = this.localApi.getuser();
    
  	this.getallProducts();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }

// 
  getallProducts(){
  	this.logeduser = this.localApi.getuser();
  	this.basic.presentLoading();
	  this.apiService.postdata('getmywallet', this.logeduser.id).subscribe((resp: any) => {
		console.log('orders', resp.data);
    if(resp.data.trn_list.length > 0){
      this.istranstn = true;
    }
		this.wallets = resp.data;
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
      
	}, (err: any) => {
	return false;
	});
  }


  async opnprofileupdate(){
    const modal = await this.modalController.create({
      component: ProfileupdatePage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){

      }
    });
    return await modal.present();
  }

  shareref(){
    var appurl = '\r\n\r\nAndroid: '+environment.playstore+'\r\n'+'iOS: '+environment.appstore;
    this.socialSharing.share('Hey! Order your next takeaway from '+environment.appname+' and get '+this.getappsetng.currency_symbol+this.getappsetng.wallet_set.first_time_join+' wallet bonus. Use my referral code '+this.logeduser.my_referral_code+' during sign up. ', null, null, appurl);
  }



}
