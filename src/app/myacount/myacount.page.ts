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
import { AppComponent } from '../app.component';
import { ProfileupdatePage } from '../profileupdate/profileupdate.page';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-myacount',
  templateUrl: './myacount.page.html',
  styleUrls: ['./myacount.page.scss'],
})
export class MyacountPage implements OnInit {
imgpath: any;
  pgtype: any;
  allProducts: any;
  seting: any = {};
  logeduser: any;
  ords: any;
  bffets: any;
  getappsetng: any;
  isMyacnt: any;
  title: any;
  mobprfx: any;
  isWallert: any = false;
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
    this.getappsetng = this.localApi.getappseting();
    this.mobprfx = environment.mobileprefix
    let getpage = this.activatedRoute.snapshot.paramMap.get('status');
    if(getpage=='any'){
      this.title = 'My Acount';
      this.isMyacnt = 'YES';
      if(this.getappsetng.wallet=='YES'){
        this.isWallert = true;
      }
    } else {
      this.title = 'Status';
      this.isMyacnt = '';
    }
    this.imgpath = environment.imagepath;
    this.logeduser = this.localApi.getuser();
    
  	this.getallProducts();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }

// 
  getallProducts(){
  	this.logeduser = this.localApi.getuser();
  	this.basic.presentLoading();
	  this.apiService.postdata('getmyorders', this.logeduser.id).subscribe((resp: any) => {
		console.log('orders', resp);
		this.ords = resp.data;
    for(let i=0; i < this.ords.length; i++){
      if(this.ords[i].usewallet=='YES'){
        if(this.ords[i].pay_amount_wallet_use == '0.00'){
          this.ords[i].iswaltpayamount = 'FREE';
        } else {
          this.ords[i].iswaltpayamount = this.getappsetng.currency_symbol+this.ords[i].pay_amount_wallet_use;
        }
      } else {
        this.ords[i].iswaltpayamount = this.ords[i].total_pay;
      }
    }
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
      
	}, (err: any) => {
	return false;
	});

    this.apiService.postdata('getmybuffethistory', this.logeduser.id).subscribe((resp: any) => {
      console.log('buffets', resp);
      this.bffets = resp.data;
    }, (err: any) => {
      return false;
    });
  }


  logout(){
  	this.localApi.removeUser();
    this.apCmp.checklogin();
  	this.route.navigate(['/home']);
  }

  viewmycart(){
    this.route.navigate(['/mycart']);
  }

  viewordertls(val){
  	this.route.navigate(['/orderdetails/'+val+'/old']);
  }

  goaddress(){
    this.route.navigate(['/addressbook/viewedit']);
  }

  async opnprofileupdate(){
    const modal = await this.modalController.create({
      component: ProfileupdatePage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        // this.processed();
        this.basic.alert(this.trnslt.success, this.trnslt.yr_prf_suc_updt);
        this.apCmp.checklogin();
        this.logeduser = this.localApi.getuser();
      }
    });
    return await modal.present();
  }


  gowlt(){
    this.route.navigate(['/wallet']);
  }

}
