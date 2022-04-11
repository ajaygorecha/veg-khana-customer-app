import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.page.html',
  styleUrls: ['./catering.page.scss'],
})
export class CateringPage implements OnInit {
  imgpath: any;
  postdata: any = {};
  allProducts: any;
  data: any = {};
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
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
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
    this.basic.presentLoading();
	  this.apiService.postdata('getcaterigndesc', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
  		console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }


  submitevnt(){
  	if(!this.data.fullname){
  		this.basic.alert(this.trnslt.info, this.trnslt.enter_yr_full_name);
  	} else if(!this.data.mobile){
  		this.basic.alert(this.trnslt.info, this.trnslt.entr_conact_no);
  	} else if(!this.data.date){
  		this.basic.alert(this.trnslt.info, this.trnslt.entr_evnt_date);
  	} else {
		this.basic.presentLoading();
		this.apiService.postdata('savecateringenq', this.data).subscribe((resp: any) => {
			
	  		console.log(resp);
	      	setTimeout(()=>{
	        	this.basic.dismissloader();
	        	this.basic.alert(this.trnslt.tnsks, this.allProducts.thnk_msg);
	        	this.data = {};
	      	},1000)
		}, (err: any) => {
			return false;
		});
  	}
  }




}
