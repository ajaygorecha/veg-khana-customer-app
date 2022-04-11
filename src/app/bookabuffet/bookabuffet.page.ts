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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-bookabuffet',
  templateUrl: './bookabuffet.page.html',
  styleUrls: ['./bookabuffet.page.scss'],
})
export class BookabuffetPage implements OnInit {
  postdata: any = {};
  logedUser: any;
  data: any = {};
  ipbroptions: any = {}
  deltimelist: any = [];
  timelist: any = [];
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
    private iab: InAppBrowser
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.logedUser = this.localApi.getuser();
    console.log(this.logedUser);
    this.data = this.logedUser;
    
  }

  checkfldempty(){
    if(!this.data.nop){
      this.basic.alert(this.trnslt.error, this.trnslt.pls_ent_no_of_person);
    } else if(!this.data.bookdate){
      this.basic.alert(this.trnslt.error, this.trnslt.please_select_book_date);
    } else if(!this.data.booktime){
      this.basic.alert(this.trnslt.error, this.trnslt.please_select_book_time);
    } else {
      this.bookbuffet();
    }
  }


  // gettimeslot(){

  // }

  chkbuftavl(){
    this.basic.presentLoading();
      this.apiService.postdata('chkbuffetavalble', this.data).subscribe((resp: any) => {
      console.log('AVL',resp);
      if(resp.data.status){
        this.basic.alert(this.trnslt.info, this.trnslt.we_r_close_on+' '+this.getdayfullname(resp.data.datename));
      } else {
        this.timelist = resp.data;
        // let timesdel = resp.data;
        // let theNewInputs = [];
        // for(let i=0; i < timesdel.length; i++){
        //   theNewInputs.push(
        //     {
        //       name: 'deltimmy',
        //       type: 'radio',
        //       value: timesdel[i].value,
        //       checked: false,
        //       label: timesdel[i].value
        //     }
        //   );
        // }
        // this.deltimelist = theNewInputs;
        // this.opndeltimelist();
      }
        setTimeout(()=>{
          this.basic.dismissloader();
        },1000)
    }, (err: any) => {
    return false;
    });
  }

  // async opndeltimelist() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'freeddelmessages',
  //     header: 'Select booking time',
  //     // subHeader: this.mrprcfrdelfree,
  //     inputs: this.deltimelist,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'OK',
  //         handler: (val) => {
  //           this.bookbuffet(val);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  bookbuffet(){
    console.log(this.data);
  	this.basic.presentLoading();
      this.apiService.postdata('bookabuffet', this.data).subscribe((resp: any) => {
      this.basic.alert(this.trnslt.success, this.trnslt.thnks_for_book_a_tbl+' '+resp.data+' '+this.trnslt.fr_ur_futr_comcation);
      console.log(resp);
        setTimeout(()=>{
          this.basic.dismissloader();
          this.data.nop = '';
          this.data.bookdate = '';
          this.data.booktime = '';
        },1000)
    }, (err: any) => {
    return false;
    });
  }

  viewmycart(){
  	this.route.navigate(['/myacount/any']);
  }

  viewprices(){
    this.ipbroptions = {
        location: 'no',
        hardwareback: 'yes',
        hidenavigationbuttons: 'no',
        hideurlbar: 'yes',
        fullscreen: 'yes',
        zoom: 'no',
        clearcache: 'yes',
        toolbar: 'yes',
        usewkwebview: 'yes'
      };
      const browser = this.iab.create(environment.baseurl+'buffet-set-meal-1.pdf', '_blank', this.ipbroptions);
  }

  getdayfullname(name){
    var dayname = {
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday',
      'Sun': 'Sunday',
    }
    return dayname[name];

  }

}
