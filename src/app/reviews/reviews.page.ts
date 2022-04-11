import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { LoginPage } from '../login/login.page';
import { WritereviewPage } from '../writereview/writereview.page';
import { AppComponent } from '../app.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  imgpath: any;
  postdata: any = {};
  allProducts: any;
  logedUser: any;
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
    public apCmp: AppComponent
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
  	this.logedUser = this.localApi.getuser();
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
	  this.apiService.postdata('getreviews', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
  		console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }

  checkmyord(){
  	this.basic.presentLoading();
  	this.logedUser = this.localApi.getuser();
	if(this.logedUser){
		this.apiService.postdata('myordnumber', this.logedUser.id).subscribe((resp: any) => {
			console.log(resp.data);
		    if(resp.data.order <= 0){
	  			this.basic.alert(this.trnslt.sorry, this.trnslt.u_need_have_least_order_for);
	  		} else if(resp.data.review > 0){
          this.openwrite('Update',resp.data.reviews);
        } else {
	  			this.openwrite('New','');
	  		}
			setTimeout(()=>{
				this.basic.dismissloader();
			},1000)
	    }, (err: any) => {
	    return false;
	    });
	}
  }


  createreviews(){
  	this.logedUser = this.localApi.getuser();
  	if(!this.logedUser){
  		this.openlogforofr();
  	} else {
  		this.checkmyord();
  	}
  }

  async openwrite(frwht, rvwdt) {
    const modal = await this.modalController.create({
      component: WritereviewPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      componentProps: {
        'review': rvwdt,
        'frwht': frwht,
     },
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.ngOnInit();
      }
    });
    return await modal.present();
  }

  async openlogforofr() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
      	this.apCmp.checklogin();
        this.createreviews();
      }
    });
    return await modal.present();
  }



}
