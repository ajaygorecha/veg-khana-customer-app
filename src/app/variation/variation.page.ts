import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { environment } from '../../environments/environment';
import { ItmoptionsPage } from '../itmoptions/itmoptions.page';
import { MealdealPage } from '../mealdeal/mealdeal.page';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.page.html',
  styleUrls: ['./variation.page.scss'],
})
export class VariationPage implements OnInit {
  dyndata: any;
  postdata: any = {};
  logedUser: any;
  @Input() itmid: any;
  @Input() item: any;
  getappsetng: any;
  chkrtndt: any = false;
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
  	console.log(this.item);
  	this.getappsetng = this.localApi.getappseting();
    this.logedUser = this.localApi.getuser();
    this.postdata.itmid = this.item.id;
	this.basic.presentLoading();
  	this.apiService.postdata('getvariation', this.postdata).subscribe((resp: any) => {
		
		this.dyndata = resp.data;
		console.log(this.dyndata);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});

  }


  choosethis(itm){
    console.log(this.item.options.length);
    if(this.item.mealdeal.length > 0){
      this.dismissmodal();
      this.opendealdeal(itm);
    } else if(this.item.options.length > 0){
      this.dismissmodal();
      this.openoptions(itm);
    } else {
      this.cart.addcart(this.item,itm,'','');
      this.dismissmodal();
    }
  }

  async opendealdeal(variation){
    const modal = await this.modalController.create({
      component: MealdealPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'itmid': this.item.id,
        'item': this.item,
        'variation': variation
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', variation);
      if(data.data){
        // this.totlaofcart();
      }
    });
    return await modal.present();
  }

  async openoptions(variation){
    const modal = await this.modalController.create({
      component: ItmoptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'itmid': this.item.id,
        'item': this.item,
        'variation': variation
     },
     backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      // console.log('data', itm);
      if(data.data){
        // this.totlaofcart();
      }
    });
    return await modal.present();
  }


  dismissmodal() {
    this.basic.publishSomeData('call');
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
