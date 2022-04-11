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
  selector: 'app-writereview',
  templateUrl: './writereview.page.html',
  styleUrls: ['./writereview.page.scss'],
})
export class WritereviewPage implements OnInit {
  reviewtxt: any;
  logeduser: any;
  postdata: any = {};
  allratings: any;
  allstar: any = [];
  @Input() review: any;
  @Input() frwht: any;
  updbtn: any = 'Submit';
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
    this.logeduser = this.localApi.getuser();
    this.allstar = [
    	{
    		icon: 'star-outline',
    		value: '1'
    	},
    	{
    		icon: 'star-outline',
    		value: '2'
    	},
    	{
    		icon: 'star-outline',
    		value: '3'
    	},
    	{
    		icon: 'star-outline',
    		value: '4'
    	},
    	{
    		icon: 'star-outline',
    		value: '5'
    	}
    ];
    console.log('sss', this.allstar);

    if(this.frwht=='Update'){

      for(let i=0; i < this.allstar.length; i++){
        if(this.allstar[i].value<=this.review.ratings){
          this.allstar[i].icon = 'star';
        } else {
          this.allstar[i].icon = 'star-outline';
        }
      }
      this.allratings = this.review.ratings;
      this.reviewtxt = this.review.reviews;
      this.updbtn = 'Update';
    }

  }	


  getnowrate(val){
  	for(let i=0; i < this.allstar.length; i++){
		if(this.allstar[i].value<=val.value){
			this.allstar[i].icon = 'star';
		} else {
			this.allstar[i].icon = 'star-outline';
		}
	}
	this.allratings = val.value;
	console.log(this.allstar);
  }






  btnfrewview(){
  	if(!this.reviewtxt){
  		this.basic.alert(this.trnslt.error, this.trnslt.plz_tp_your_review);
  	} else {
  		this.basic.presentLoading();
	  	this.postdata.user_id = this.logeduser.id;
	  	this.postdata.name = this.logeduser.name;
	  	this.postdata.reviews = this.reviewtxt;
	  	this.postdata.ratings = this.allratings;
      this.postdata.frwht = this.frwht;
	  	this.apiService.postdata('writemyreview', this.postdata).subscribe((resp: any) => {
			
	      setTimeout(()=>{
	        this.basic.dismissloader();
	        this.dismissmodal();
	      },1000)
		}, (err: any) => {
		return false;
		});
  	}
  }



  dismissmodal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
