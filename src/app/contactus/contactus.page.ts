import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {
imgpath: any;
  postdata: any = {};
  cnt: any;
  pgtype: any = 'Contact Us';
  ipbroptions: any = {};
  apnme: any;
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
    private iab: InAppBrowser,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private device: Device
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.apnme = environment.appname;
  	this.pgtype = 'Contact Us';
  	console.log(this.pgtype);
    this.imgpath = environment.imagepath;
    this.getallProducts();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }


  getallProducts(){
  	this.postdata.pgtype = this.pgtype;
  	this.postdata.about = 'OK';
    this.basic.presentLoading();
	  this.apiService.postdata('getallcms', this.postdata).subscribe((resp: any) => {
		this.cnt = resp.data[0];
  		console.log(this.cnt);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }


  acnfr(frwht, val){
  	this.ipbroptions = {
      location: 'no',
      hardwareback: 'yes',
      hidenavigationbuttons: 'no',
      hideurlbar: 'yes',
      fullscreen: 'yes',
      zoom: 'no',
      clearcache: 'yes',
      toolbar: 'yes',
      usewkwebview: 'yes'
   };
    if(frwht=='address'){
      if (this.device.platform=='Android') {
        const browser = this.iab.create('geo:0,0?q='+val, '_system', this.ipbroptions);
      } else {
        const browser = this.iab.create('maps://?q='+val, '_system', this.ipbroptions);
        
      }
      
    }
    if(frwht=='website'){
      const browser = this.iab.create(val, '_blank', this.ipbroptions);
    }
    if(frwht=='whatsapp'){
      // const browser = this.iab.create('https://wa.me/+44'+val, '_blank', this.ipbroptions);
      const browser = this.iab.create('https://api.whatsapp.com/send?phone='+environment.mobileprefix+val, '_system', this.ipbroptions);
    }
    if(frwht == 'call'){
    	this.callNumber.callNumber(val, true)
    }
    if(frwht =='email'){
		let email = {
			to: val,
			subject: this.trnslt.enq_from+' '+this.apnme+' App',
			body: '',
			isHtml: true
		}
		this.emailComposer.open(email);
    }
  }



}
