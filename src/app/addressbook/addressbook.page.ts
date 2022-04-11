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
import { CallNumber } from '@ionic-native/call-number/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.page.html',
  styleUrls: ['./addressbook.page.scss'],
})
export class AddressbookPage implements OnInit {
	imgpath: any;
  mycart: any;
  carttotal: any;
  postdata: any = {};
  cartcount: any;
  logedUser: any;
  adddress: any;
  isNoloca: any = false;
  pgtype: any;
  pstdtchk: any = {};
  pay_amount: any;
  apldofrs: any;
  sendamtchk: any;
  dicuctamnt: any;
  off_amount: any;
  getappsetng: any;
  restfredelprx: any;
  mrprcfrdelfree: any;
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
    public actionSheetController: ActionSheetController,
    private callNumber: CallNumber
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.pgtype = this.activatedRoute.snapshot.paramMap.get('pgtype');
  	this.logedUser = this.localApi.getuser();
    this.imgpath = environment.imagepath;
    this.carttotal = this.cart.getTotalCart();
    this.getappsetng = this.localApi.getappseting();
    console.log('getappsetng', this.getappsetng);
  	this.getallProducts();

    if(this.getappsetng.delivery_free > this.carttotal){
      var restfredelprx = parseFloat(this.getappsetng.delivery_free)-parseFloat(this.carttotal);
      this.restfredelprx = restfredelprx.toFixed(2);
      this.mrprcfrdelfree = this.trnslt.get_free_ad_anth+' '+this.getappsetng.currency_symbol+this.restfredelprx;
    } else {
      this.mrprcfrdelfree = '';
    }
    if(this.pgtype=='viewedit'){
      this.mrprcfrdelfree = '';
    }

  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }

  
  BackButtonAction() {
    if(this.pgtype=='checkout'){
      this.route.navigate(['/mycart']);
    }
  }
  getallProducts(){
  	this.mycart = this.cart.getcart();
    this.carttotal = this.cart.getTotalCart();
  	this.cartcount = this.mycart.length;

    this.basic.presentLoading();
    this.postdata.userid = this.logedUser.id;
	  this.apiService.postdata('getmyaddress', this.postdata).subscribe((resp: any) => {
	  	console.log('Address', resp);
	  	this.adddress = resp.data;
      if(this.adddress.length == 0 ){
        this.isNoloca = true;
      } else {
        this.isNoloca = false;
      }
		setTimeout(()=>{
			this.basic.dismissloader();
		},1000)
	}, (err: any) => {
	return false;
	});
  }

  slcadrs(item){
    if(this.pgtype=='checkout'){
      this.checkmydelivery(item);
    }
  }

  async seletaddress(item) {
    const alert = await this.alertController.create({
      header: this.trnslt.addres_conf,
      subHeader: this.trnslt.slctd_location+': '+item.address_type,
      message: item.address_line_one+' '+item.address_line_two+' '+item.postcode,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.checkmydelivery(item);
          }
        }
      ]
    });

    await alert.present();
  }

  checkmydelivery(address){
    this.pstdtchk = address;
    this.apldofrs = this.localApi.getapplyedofr();
    this.carttotal = this.cart.getTotalCart();

    if(this.apldofrs){
      if(this.apldofrs.off_type=='Flat'){
        this.off_amount = this.apldofrs.off_value;
      } else {
        this.dicuctamnt = (this.carttotal*this.apldofrs.off_value)/100;
        this.off_amount = this.dicuctamnt.toFixed(2);
      }
      this.pstdtchk.totalcart = parseFloat(this.carttotal)-parseFloat(this.off_amount);
    } else {
      this.pstdtchk.totalcart = this.cart.getTotalCart();
    }
    
    
    this.basic.presentLoading();
    this.apiService.postdata('checkmydelivery', this.pstdtchk).subscribe((resp: any) => {
      console.log(resp.data);
      setTimeout(()=>{
        this.basic.dismissloader();
        if(resp.data){
          this.localApi.setdeladrs(address);
          this.localApi.setdelcost(resp.data);
          this.route.navigate(['/checkout']);
        } else {
          this.tofaroption();
          // this.basic.alert('Sorry! Too far!', 'We do not deliver here. Enter a different delivery location or select "Collection" to procceed with the order');
        }
        
      },1000)
    }, (err: any) => {
    return false;
    });
  }

  async tofaroption(){
    console.log(this.getappsetng.contact.phone);
    const alert = await this.alertController.create({
      header: this.trnslt.sorry_to_far,
      message: this.trnslt.we_do_nt_del_here,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.trnslt.ord_by_phn,
          handler: () => {
            // window.open('tel:'+this.getappsetng.contact.phone, '_system');
            this.callNumber.callNumber(this.getappsetng.contact.phone, true)
            // this.deleteaddress(item.id);
          }
        }
      ]
    });

    await alert.present();
  }

  continueShp(){
  	this.location.back();
  }

  async openaddModal(){
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'my-custom-class',
      componentProps: {
	      'userid': this.logedUser.id,
	   },
	   backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.getallProducts();
      }
    });
    return await modal.present();
  }

  async editaddress(val){
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'userid': this.logedUser.id,
        'exist': val,
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.getallProducts();
      }
    });
    return await modal.present();
  }



  async deletealert(item){
    const alert = await this.alertController.create({
      header: this.trnslt.cnfrmatn,
      message: this.trnslt.r_u_sure_del_the_adrs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteaddress(item.id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteaddress(id){
    this.basic.presentLoading();
    this.apiService.postdata('deleteaddress', id).subscribe((resp: any) => {
      console.log(resp.data);
      setTimeout(()=>{
        this.basic.dismissloader();
        this.getallProducts();
      },1000)
    }, (err: any) => {
    return false;
    });
  }



  





}
