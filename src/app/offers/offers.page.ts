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
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
imgpath: any;
  allProducts: any = [];
  postdata: any = {};
  title: any;
  pgtype: any;
  logedUser: any;
  frstdis: any = {};
  frsord: any = {};
  carttotal: any;
  ftrbtnms: any;
  active: any;
  isOffer: any = true;
  winsr: any;
  nownrs: any = true;
  isseeoffer: any = true;
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
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.getappsetng = this.localApi.getappseting();
    this.ftrbtnms = [
      {name:'Offers', active:false, clas: 'leftsidehalf'},
      {name:'Winners', active:false, clas: 'rightsidehlf'}
    ];
    this.active = 'Offers';
    this.carttotal = this.cart.getTotalCart();
    this.allProducts = [];
    this.logedUser = this.localApi.getuser();
    console.log('USR', this.logedUser);
    if(this.logedUser){
      this.basic.presentLoading();
      this.apiService.postdata('getspecialcoupon', this.logedUser.id).subscribe((resp: any) => {
        console.log('trnslt', resp);

        if(resp.data.order==''){
          this.frsord = {
            description: this.trnslt.welcome_to+' '+environment.appname+'. '+this.trnslt.enjoy_fris_off_order,
            heading: this.trnslt.ten_off_firest_ord_dis,
            id: '',
            image: 'firsttimeoff_statick.jpg',
            min_order_amount: '1.00',
            off_type: 'Percent',
            off_value: '10',
            offer_code: 'FIRST10'
          }
          this.allProducts.push(this.frsord);
        }
        console.log('CHKSPD', resp.data.discount);
        if(resp.data.discount){
          this.frstdis = {
            description: this.trnslt.this_this_count_is_specialy,
            heading: resp.data.discount+''+this.trnslt.off_soecl_dis_on_u,
            id: '',
            image: 'specialoffer_statick.jpg',
            min_order_amount: '1.00',
            off_type: 'Percent',
            off_value: resp.data.discount,
            offer_code: 'SPECIAL10'
          }
          this.allProducts.push(this.frstdis);
        }

        setTimeout(()=>{
          this.basic.dismissloader();
          this.getallProducts();
        },1000)
      }, (err: any) => {
      return false;
      });
    } else {

      this.frsord = {
        description: this.trnslt.welcome_to+' '+environment.appname+'. '+this.trnslt.enjoy_fris_off_order,
        heading: this.trnslt.ten_off_firest_ord_dis,
        id: '',
        image: 'firsttimeoff_statick.jpg',
        min_order_amount: '1.00',
        off_type: 'Percent',
        off_value: '10',
        offer_code: 'FIRST10'
      }
      this.allProducts.push(this.frsord);




      this.getallProducts();
    }
    






    this.imgpath = environment.imagepath;
    this.pgtype = this.activatedRoute.snapshot.paramMap.get('pgtype');
    if(this.pgtype == 'noapply'){
      this.title = 'Offers';
      this.isseeoffer = true;
    } else {
      this.title = 'Apply Coupon';
      this.isseeoffer = false;
    }
  	
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }


  getallProducts(){
    this.basic.presentLoading();
    this.apiService.postdata('getoffer', this.postdata).subscribe((resp: any) => {
    // this.allProducts = resp.data;
    let newdata = resp.data;
    for(let i=0; i < newdata.length; i++){
      this.allProducts.push(newdata[i]);
    }

    // this.allProducts.push(resp.data);
      console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
    }, (err: any) => {
    return false;
    });


    
  }

  appltythis(val){
    var carttotal = parseFloat(this.carttotal);
    var min_order_amount = parseFloat(val.min_order_amount);
    if(carttotal < min_order_amount){
      var morePr = parseFloat(val.min_order_amount) - parseFloat(this.carttotal);
      this.basic.alert(this.trnslt.info, this.trnslt.min_amiunt_req_to_redeem+' '+this.getappsetng.currency_symbol+val.min_order_amount+', '+this.trnslt.plz_add_anth+' '+this.getappsetng.currency_symbol+morePr.toFixed(2)+' '+this.trnslt.to_yr_ored);
    } else {
      this.localApi.setapplyedofr(val);
      this.location.back();
    }
  }


  toggleClass(item){
    this.active = item.name;
    if(item.name=='Offers'){
      this.isOffer = true;
    } else {
      this.isOffer = false;
    }
  }



}
