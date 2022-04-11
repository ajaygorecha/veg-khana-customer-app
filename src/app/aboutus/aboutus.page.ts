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
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
imgpath: any;
  postdata: any = {};
  allProducts: any;
  pgtype: any;
  ipbroptions: any = {};
  isOpeningtime: any = false;
  pgtitle: any;
  opntimem: any;
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
    private iab: InAppBrowser
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    // console.log('asdasd', environment);
  	this.pgtype = this.activatedRoute.snapshot.paramMap.get('pgtype');
  	console.log(this.pgtype);
    if(this.pgtype=='Opening Hours'){
      this.basic.presentLoading();
      this.apiService.getdata('getalldayopentime', '').subscribe((resp: any) => {
      this.opntimem = resp.data;
      console.log(this.opntimem);
        setTimeout(()=>{
          this.basic.dismissloader();
          this.isOpeningtime = true;
        },1000)
      }, (err: any) => {
      return false;
      });
      

    } else {
      this.getallProducts();
    }
    this.imgpath = environment.imagepath;
    
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }


  getallProducts(){
    let aplng = this.localApi.getapplng();
  	this.postdata.pgtype = this.pgtype;
    this.postdata.lngid = aplng.id;
    this.basic.presentLoading();
	  this.apiService.postdata('getallcms', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
  		console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }

  viewalergy(){
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
    const browser = this.iab.create(environment.baseurl+'rapchik-allergen-table', '_blank', this.ipbroptions);
  }



}
