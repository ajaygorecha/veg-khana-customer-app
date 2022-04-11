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
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
  imgpath: any;
  orderid: any;
  logedUser: any;
  pagetype: any;
  ordlr: any = {};
  ordltls: any;
  isNeword: any = false;
  del_sct: any;
  getappsetng: any;
  iswaltpayamount: any;
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
    this.getappsetng = this.localApi.getappseting();
    this.logedUser = this.localApi.getuser();
    console.log('kk', this.logedUser.name)
  }

  BackButtonAction() {
    this.pagetype = this.activatedRoute.snapshot.paramMap.get('pagetype');
    if(this.pagetype=='New'){
      this.route.navigate(['/home']);
    }
  }

  ionViewWillEnter(){
    this.imgpath = environment.imagepath;
  	this.orderid = this.activatedRoute.snapshot.paramMap.get('orderid');
  	this.pagetype = this.activatedRoute.snapshot.paramMap.get('pagetype');

  	if(this.pagetype=='New'){
  		this.localApi.removedeladrs();
  		this.localApi.removedelcost();
  		this.localApi.removextrnt();
  		this.localApi.removeapplyedofr();
  		this.cart.removeCart();
      this.localApi.removeordertype();
      this.localApi.removedeltime();
      this.isNeword = true;
  	}



  	this.ordlr.ordid = this.orderid;
  	this.basic.presentLoading();
  	this.apiService.postdata('getorderdetails', this.ordlr).subscribe((resp: any) => {
		console.log('User', resp);
		this.ordltls = resp.data;
    if(this.ordltls.order_type=='Delivery'){
      if(this.ordltls.delivery_cost > 0){
        this.del_sct = this.getappsetng.currency_symbol+this.ordltls.delivery_cost;
      } else {
        this.del_sct = 'FREE';
      }
    } else {
      this.del_sct = '';
    }
    if(this.ordltls.usewallet=='YES'){
      if(this.ordltls.pay_amount_wallet_use == '0.00'){
        this.iswaltpayamount = 'FREE';
      } else {
        this.iswaltpayamount = this.getappsetng.currency_symbol+this.ordltls.pay_amount_wallet_use;
      }
    }

      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }


  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }


}
