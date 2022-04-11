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
import { VariationPage } from '../variation/variation.page';
import { ItmoptionsPage } from '../itmoptions/itmoptions.page';
import { MealdealPage } from '../mealdeal/mealdeal.page';

@Component({
  selector: 'app-itemsearch',
  templateUrl: './itemsearch.page.html',
  styleUrls: ['./itemsearch.page.scss'],
})
export class ItemsearchPage implements OnInit {
imgpath: any;
  category_id: any;
  sub_category_id: any;
  mycart: any;
  carttotal: any;
  title: any;
  allProducts: any;
  postdata: any = {};
  nowqty: any;
  nowval: any;
  cartcount: any;
  isPrd: any = true;
  getappsetng: any;
  pstdata: any = {};
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
  	// this.items = ["Ram","gopi", "dravid"];
    this.getappsetng = this.localApi.getappseting();
    this.imgpath = environment.imagepath;
  }

  	yourSearchFunction(val){
      if(val){
        this.pstdata.searchval = val;
        this.pstdata.frwht = 'search';
        this.basic.presentLoading();
        this.apiService.postdata('getproducts', this.pstdata).subscribe((resp: any) => {
          this.allProducts = resp.data;

          if(this.allProducts.length > 0){
            this.isPrd = true;
          } else {
            this.isPrd = false;
          }
          for(let i=0; i < this.allProducts.length; i++){
            let single = this.allProducts[i];
            let qty = this.cart.getSingleQty(single.id);
            this.allProducts[i].qty = qty;
            let chly = [];
            for(let c=0; c < single.chilly; c++){
              chly.push(1);
            }
            this.allProducts[i].chilli = chly;

            if(this.allProducts[i].contain[0] != ''){
              this.allProducts[i].alrgy = 'OK';
            } else {
              this.allProducts[i].alrgy = '';
            }

            if(this.allProducts[i].variation.length > 0){
              this.allProducts[i].crtbtn = this.trnslt.select;
            } else if(this.allProducts[i].options.length > 0) {
              this.allProducts[i].crtbtn = this.trnslt.select;
            } else if(this.allProducts[i].mealdeal.length > 0) {
              this.allProducts[i].crtbtn = this.trnslt.select;
            } else {
              this.allProducts[i].crtbtn = this.trnslt.add_to_cart;
            }
            
           }
          setTimeout(()=>{
            this.basic.dismissloader();
          },2000)
        }, (err: any) => {
          this.basic.dismissloader();
        return false;
        });
      } else {
        
      }
      
    }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      // this.getallProducts();
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.totlaofcart();

    this.basic.getObservable().subscribe((data) => {
        this.totlaofcart();
    });


    setTimeout(function () {
        $('.searchbar-input').focus();
    }, 500);
  }


  totlaofcart(){
    this.mycart = this.cart.getcart();
    this.carttotal = this.cart.getTotalCart();
    this.cartcount = this.mycart.length;
  }

  getallProducts(){
  	this.totlaofcart();
    this.pstdata.frwht = 'search';
    this.pstdata.searchval = '';
    this.basic.presentLoading();
	  this.apiService.postdata('getproducts', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
    if(this.allProducts.length > 0){
      this.isPrd = true;
    } else {
      this.isPrd = false;
    }
    console.log(this.allProducts);
  		for(let i=0; i < this.allProducts.length; i++){
  			let single = this.allProducts[i];
        let qty = this.cart.getSingleQty(single.id);
        this.allProducts[i].qty = qty;
        let chly = [];
        for(let c=0; c < single.chilly; c++){
          chly.push(1);
        }
        this.allProducts[i].chilli = chly;

        if(this.allProducts[i].contain[0] != ''){
          this.allProducts[i].alrgy = 'OK';
        } else {
          this.allProducts[i].alrgy = '';
        }

        if(this.allProducts[i].variation.length > 0){
          this.allProducts[i].crtbtn = this.trnslt.select
        } else if(this.allProducts[i].options.length > 0) {
          this.allProducts[i].crtbtn = this.trnslt.select
        }  else if(this.allProducts[i].mealdeal.length > 0) {
          this.allProducts[i].crtbtn = this.trnslt.select
        } else {
          this.allProducts[i].crtbtn = this.trnslt.add_to_cart
        }
        
  	   }
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }


  async openvariations(itmid, itm){
    const modal = await this.modalController.create({
      component: VariationPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'itmid': itmid,
        'item': itm,
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', itm);
      if(data.data){
        // this.totlaofcart();
      }
    });
    return await modal.present();
  }

  async opendealdeal(itmid, itm){
    const modal = await this.modalController.create({
      component: MealdealPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'itmid': itmid,
        'item': itm,
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', itm);
      if(data.data){
        // this.totlaofcart();
      }
    });
    return await modal.present();
  }



  async openoptions(itmid, itm){
    const modal = await this.modalController.create({
      component: ItmoptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'itmid': itmid,
        'item': itm,
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', itm);
      if(data.data){
        // this.totlaofcart();
      }
    });
    return await modal.present();
  }

  addtoCart(itm){
    if(itm.variation.length > 0){
      this.openvariations(itm.id, itm);
    } else if(itm.mealdeal.length > 0) {
      this.opendealdeal(itm.id, itm);
    } else if(itm.options.length > 0) {
      this.openoptions(itm.id, itm);
    } else {
      $('#addcartbtn_'+itm.id).hide();
      $('#qtycartbtn_'+itm.id).show();
      $('#itmqty_'+itm.id).html('1');
      this.cart.addcart(itm,'','','');
    }
    this.totlaofcart();
  }

  minusqty(itm){
    this.nowqty = '';
    this.nowval = '';
    this.nowqty = $('#itmqty_'+itm.id).html();
    if(this.nowqty == 1){
      $('#addcartbtn_'+itm.id).show();
    $('#qtycartbtn_'+itm.id).hide();
    }
    this.nowval = parseInt(this.nowqty)-1;
    $('#itmqty_'+itm.id).html(this.nowval);
    this.cart.minusqntyfrmprod(itm);
    this.totlaofcart();
    
    

  }
  addqty(itm){
    this.nowqty = '';
    this.nowval = '';
    this.nowqty = $('#itmqty_'+itm.id).html();
    this.nowval = parseInt(this.nowqty)+1;
    $('#itmqty_'+itm.id).html(this.nowval);
    this.cart.plusqnty(itm);
    this.totlaofcart();
    // this.getallProducts();
  }


  async openDetailsItem(itm) {
    const modal = await this.modalController.create({
      component: ItemdetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'item': itm,
     },
     backdropDismiss: true
    });
    return await modal.present();
  }
  viewmycart(){
    this.route.navigate(['/mycart']);
  }

  backmenu(){
    this.location.back();
  }
  openAlergyInfo(val){
    if(val.allergy_info){
      this.basic.alert(this.trnslt.allergy_info, val.allergy_info);
    }
  }

}
