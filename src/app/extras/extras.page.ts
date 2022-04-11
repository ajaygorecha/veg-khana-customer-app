import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery'
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { AddaddressPage } from '../addaddress/addaddress.page';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.page.html',
  styleUrls: ['./extras.page.scss'],
})
export class ExtrasPage implements OnInit {
  imgpath: any;
  mycart: any;
  carttotal: any;
  postdata: any = {};
  cartcount: any;
  logedUser: any;
  extrs: any;
  isNoloca: any = false;
  shownumb: any = 0;
  totalextsrs: any = 0;
  order_type: any;
  getappsetng: any;
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
    public actionSheetController: ActionSheetController
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.getappsetng = this.localApi.getappseting();
    this.order_type = this.localApi.getordertype();
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
  	this.totalextsrs = 0;
  	this.shownumb = 0;
  	this.mycart = this.cart.getcart();
    this.carttotal = this.cart.getTotalCart();
  	this.cartcount = this.mycart.length;

    this.basic.presentLoading();
    this.postdata.userid = this.logedUser.id;
	  this.apiService.postdata('getextras', this.postdata).subscribe((resp: any) => {
	  	console.log('Address', resp);
	  	this.extrs = resp.data;
	  	
	  	for(let i=0; i < this.extrs.length; i++){
	  		
  			let single = this.extrs[i];
	        let qty = this.cart.getSingleQty(single.id);
	        this.extrs[i].qty = qty;
	        let chly = [];
	        for(let c=0; c < single.chilly; c++){
	          chly.push(1);
	        }
	        this.extrs[i].chilli = chly;

	        if(this.extrs[i].contain[0] != ''){
	          this.extrs[i].alrgy = 'OK';
	        } else {
	          this.extrs[i].alrgy = '';
	        }

	        for(let k=0; k < this.mycart.length; k++){
	        	if(this.mycart[k].id == this.extrs[i].id && this.mycart[k].xtras){
	        		this.extrs.splice(i, 1)
	        	}
	        }

  	    }

  	    this.totalextsrs = parseInt(this.extrs.length)-1;
		setTimeout(()=>{
			this.basic.dismissloader();
			if(this.extrs.length <= 0){
        if(this.order_type=='Delivery'){
          this.route.navigate(['/addressbook/checkout']);
        } else {
          this.route.navigate(['/checkout']);
        }
				
			}
			$('#extras_'+this.shownumb).show();
		},1000)
	}, (err: any) => {
	return false;
	});
  }


  actionfornext(val, frwht){

  	if(frwht =='add'){
  		this.cart.addcart(val,'','','');
  	}

  	if(this.totalextsrs == this.shownumb){
      if(this.order_type=='Delivery'){
        this.route.navigate(['/addressbook/checkout']);
      } else {
        this.route.navigate(['/checkout']);
      }
  	} else {
  		this.shownumb += 1;
	  	$('.extramain').hide();
	  	$('#extras_'+this.shownumb).show();
  	}
  	
  }


}
