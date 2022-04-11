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
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { LoginPage } from '../login/login.page';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-listviews',
  templateUrl: './listviews.page.html',
  styleUrls: ['./listviews.page.scss'],
})
export class ListviewsPage implements OnInit {
imgpath: any;
  pgtype: any;
  allProducts: any;
  seting: any = {};
  logedUser: any;
  isdeviceuser: any;
  isTouchidDevice: any = false;
  islngset: any = false;
  appstngs: any = {};
  trnslt: any = {};
  trnsltapp: any = {};
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
    private socialSharing: SocialSharing,
    private device: Device,
    private appRate: AppRate,
    private touchId: TouchID,
    private iab: InAppBrowser
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.appstngs = this.localApi.getappseting();
    this.trnsltapp = this.localApi.getapplng();
    this.isdeviceuser = this.localApi.getuserdevice();
    this.touchId.isAvailable().then(res => {
      if(this.isdeviceuser){
        this.isTouchidDevice = true;
      }
    },err => {
      console.error('TouchID is not available', err)
    });

    this.imgpath = environment.imagepath;
  	this.pgtype = this.activatedRoute.snapshot.paramMap.get('pgtype');
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
    this.seting = this.localApi.getpushfaceset();
  	if(this.pgtype=='About Us'){
  		this.allProducts = [
	  		{
	  			name: this.trnslt.about_us,
	  			url: '/aboutus/About Us'
	  		},
	  		{
	  			name: this.trnslt.social_media,
	  			url: '/teams/Social Media'
	  		},
	  		{
	  			name: this.trnslt.our_team,
	  			url: '/teams/Our Team'
	  		},
	  		{
	  			name: this.trnslt.photo_gal,
	  			url: '/teams/Photo Gallery'
	  		},
	  		{
	  			name: this.trnslt.video_gal,
	  			url: '/teams/Video Gallery'
	  		}
	  	]
  	}

  	if(this.pgtype=='Help and Info'){
  		this.allProducts = [
	  		{
	  			name: this.trnslt.trms_condition,
	  			url: '/aboutus/Terms and Conditions'
	  		},
	  		{
	  			name: this.trnslt.privacy_policy,
	  			url: '/aboutus/Privacy Policy'
	  		},
	  		{
	  			name: this.trnslt.del_info,
	  			url: '/aboutus/Delivery Information'
	  		},
	  		{
	  			name: this.trnslt.pay_refund,
	  			url: '/aboutus/Payments and Refunds'
	  		},
	  		{
	  			name: this.trnslt.conact_us,
	  			url: 'contactus'
	  		}
	  	]
  	}
  	if(this.pgtype=='Settings'){
  		this.allProducts = [
	  		{
	  			name: this.trnslt.share_app,
	  			url: 'shareapp'
	  		},
	  		{
	  			name: this.trnslt.rate_app,
	  			url: 'rateapp'
	  		}
	  	]
  	}
  }


  gonext(item){
  	if(item.url){
  		if(item.url=='shareapp'){
  			this.shareapp();
  		} else if(item.url=='rateapp'){
  			this.rateapp();
  		} else {
  			this.route.navigate([item.url]);
  		}
  	}
  }



  rateapp(){
    var self = this;
    this.appRate.preferences = {
      simpleMode: true,
      useLanguage: 'en',
      storeAppURL: {
       ios: environment.iosappid,
       android: 'market://details?id='+environment.androidappid
      },
      openUrl: function(url: string){
        console.log('HELLO URL', url);
        // alert(url);

        if (self.device.platform=='Android') {
          const browser = self.iab.create(environment.appstore, '_system');
        } else {
          const browser = self.iab.create(environment.iosrateandreview, '_system');
        }
      }
    }

    this.appRate.promptForRating(true);
    // this.appRate.promptForRating(true);
  }
  shareapp(){
    if (this.device.platform=='Android') {
      this.socialSharing.share(environment.app_share_text, null, null, environment.playstore);
    } else {
      this.socialSharing.share(environment.app_share_text, null, null, environment.appstore)
    }
  }

  seingcnge(val){
    this.logedUser = this.localApi.getuser();
    if(val=='touchface'){
      if(this.logedUser){
        this.seting.face = true;
      } else {
        this.openloginpanel();
        this.seting.face = false;
      }
      this.localApi.setpushfaceset(this.seting);
    } else {
      this.localApi.setpushfaceset(this.seting);
    }
    
  }

  async openloginpanel() {
    console.log('OK');
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.seting.face = true;
        this.localApi.setpushfaceset(this.seting);
      }
    });
    return await modal.present();
  }


  openlngchose(){
    this.islngset = true;
  }
  viewmycart(){
    this.route.navigate(['/mycart']);
  }
  setmylng(itm){
    this.islngset = false;
    this.localApi.setapplng(itm);
    this.getmyseleclng(itm.name);
    this.ngOnInit();
  }

  getmyseleclng(val){
    fetch('./assets/i18n/'+val+'.json').then(res => res.json())
      .then(json => {
        this.localApi.setmyseleclng(json);
        this.trnslt = this.localApi.getmyseleclng();
        console.log(json);
    });
  }

}
