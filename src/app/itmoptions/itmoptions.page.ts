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

@Component({
  selector: 'app-itmoptions',
  templateUrl: './itmoptions.page.html',
  styleUrls: ['./itmoptions.page.scss'],
})
export class ItmoptionsPage implements OnInit {
  dyndata: any;
  postdata: any = {};
  logedUser: any;
  @Input() itmid: any;
  @Input() item: any;
  @Input() variation: any;
  getappsetng: any;
  addedoptn: any = [];
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
  	console.log(this.item);
  	this.getappsetng = this.localApi.getappseting();
    this.logedUser = this.localApi.getuser();
    this.postdata.itmid = this.item.id;
	this.basic.presentLoading();
  	this.apiService.postdata('getitmoptions', this.postdata).subscribe((resp: any) => {
		
		this.dyndata = resp.data;
		console.log(this.dyndata);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});

  }


  choosethis(){
  	if(this.variation){
  		this.cart.addcart(this.item,this.variation,this.addedoptn,'');
  	} else {
  		this.cart.addcart(this.item,'',this.addedoptn,'');
  	}
  	
  	// this.cart.addcart(this.item,itm,'');
  	this.dismissmodal();
  }

  checkif(itm){
  	if($("#chkbx_"+itm.id).is(':checked')){
  		console.log('Added');
  		this.addedoptn.push(itm);
  	} else {
  		let newarray = [];
  		for(let i=0; i < this.addedoptn.length; i++){ 
  			if(this.addedoptn[i].id!=itm.id){
  				newarray.push(this.addedoptn[i]);
  			}
  		}
  		this.addedoptn = newarray;
  		console.log('Remove');
  	}

  	console.log(this.addedoptn);
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
