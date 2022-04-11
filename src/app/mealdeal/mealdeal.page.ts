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
  selector: 'app-mealdeal',
  templateUrl: './mealdeal.page.html',
  styleUrls: ['./mealdeal.page.scss'],
})
export class MealdealPage implements OnInit {
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
  	console.log('item', this.item);
    console.log('variation', this.variation);
  }

  removeLastComma(strng){        
      var n=strng.lastIndexOf(",");
      var a=strng.substring(0,n) 
      return a;
  }
  choosethis(){
    let isAllChecked = '';
    if(this.addedoptn.length > 0){
      let mealdeal = this.item.mealdeal;
      
      for(let m=0; m < mealdeal.length; m++){
        let no_of_chk = $('#no_of_checked_'+mealdeal[m].deal_id).val();
        if(no_of_chk < mealdeal[m].min_qty && mealdeal[m].min_qty > 0){
          this.basic.alert(this.trnslt.info, this.trnslt.plz_chose_min+' '+mealdeal[m].min_qty+' '+this.trnslt.from+' '+mealdeal[m].cat_name);
          isAllChecked += 'NO,';
          break;
        }
        if(no_of_chk > mealdeal[m].max_qty && mealdeal[m].max_qty > 0){
          this.basic.alert(this.trnslt.info, this.trnslt.you_can_choose_max+' '+mealdeal[m].max_qty+' '+this.trnslt.from+' '+mealdeal[m].cat_name);
          isAllChecked += 'NO,';
          break;
        }
        if(mealdeal[m].max_qty == 0){
          isAllChecked += 'OK,';
        }
        if(mealdeal[m].max_qty > 0 && no_of_chk > 0){
          isAllChecked += 'OK,';
        }
        if(mealdeal[m].min_qty > 0 && no_of_chk == 0){
          this.basic.alert(this.trnslt.info, this.trnslt.plz_chose_itm_from+' '+mealdeal[m].cat_name);
          isAllChecked += 'NO,';
          break;
        }
      }

      var chkAry = isAllChecked.split(',');
      var isnoVld = chkAry.indexOf("NO");
      if(isnoVld < 0){
        this.cart.addcart(this.item,this.variation,'',this.addedoptn);
        this.dismissmodal();
      }
    } else {
      this.basic.alert(this.trnslt.info, this.trnslt.plz_shose_any_optn);
    }
  }

  checkif(itm){
    let no_of_cked:any = $('#no_of_checked_'+itm.cat_id).val();
  	if($("#chkbx_"+itm.id).is(':checked')){
  		console.log('Added');
  		this.addedoptn.push(itm);
      let no_add_chk:any = parseInt(no_of_cked)+1;
      console.log('no_of_cked', no_of_cked);
      console.log('no_add_chk', no_add_chk);
      $('#no_of_checked_'+itm.cat_id).val(no_add_chk);
  	} else {
  		let newarray = [];
  		for(let i=0; i < this.addedoptn.length; i++){ 
  			if(this.addedoptn[i].id!=itm.id){
  				newarray.push(this.addedoptn[i]);
  			}
  		}
  		this.addedoptn = newarray;
  		console.log('Remove');
      let no_add_chk:any = parseInt(no_of_cked)-1;
      $('#no_of_checked_'+itm.cat_id).val(no_add_chk);
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
