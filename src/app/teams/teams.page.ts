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
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
imgpath: any;
  postdata: any = {};
  allProducts: any;
  pgtype: any;
  ipbroptions: any = {};
  brndane: any;
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
    private youtube: YoutubeVideoPlayer,
    private iab: InAppBrowser
    ) { }

  ngOnInit() {
  	this.pgtype = this.activatedRoute.snapshot.paramMap.get('pgtype');
  	console.log(this.pgtype);
    this.imgpath = environment.imagepath;
    this.getallProducts();
    this.brndane = environment.appname;
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
		
    if(this.pgtype == 'Social Media'){
      this.allProducts = resp.data[0];
    } else {
      this.allProducts = resp.data;
    }
  		console.log('HELLO', this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }

  helovid(val){
    this.youtube.openVideo(val);
  }

  viewonbrsr(val){
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
    const browser = this.iab.create(val, '_blank', this.ipbroptions);
  }



}
