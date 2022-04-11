import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as $ from 'jquery'
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { LoginPage } from '../login/login.page';
import { Device } from '@ionic-native/device/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.page.html',
  styleUrls: ['./mycart.page.scss'],
})
export class MycartPage implements OnInit {
  imgpath: any;
  category_id: any;
  mycart: any;
  carttotal: any;
  title: any;
  allProducts: any;
  postdata: any = {};
  nowqty: any;
  nowval: any;
  cartcount: any;
  logedUser: any;
  ipbroptions: any = {};
  ordervalue: any = {};
  extranotes: any = '';
  apldofrs: any;
  pay_amount: any = 0;
  offer_text: any = '';
  off_amount: any;
  dicuctamnt:any;
  payamuntcalc: any;
  getappsetng: any;
  taxvalue: any;
  totaladditional: any;
  extrasitm: any;
  isRestricktn: any = false;
  restrictns_lbl: any;
  restrictns_txt: any;
  deltimelist: any = [];
  chsdeltime: any;
  isShopclose: any = false;
  closetxt: any;
  isKeyboardHide: any = true;
  mrprcfrdelfree: any;
  restfredelprx: any;
  isordertomorrow: any = false;
  nextdeday: any;
  nexttime: any;
  hrsfr: any;
  hrert: any;
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
    private iab: InAppBrowser,
    private device: Device,
    private keyboard: Keyboard
    ) { }

  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.localApi.removeapplyedofr();
    this.logedUser = this.localApi.getuser();
    if(this.logedUser){
      if(!this.logedUser.device || !this.logedUser.token){
        this.updateuserdetails();
      }
    }
  }

  ionViewWillEnter(){

    localStorage.setItem(environment.storage_prefix+"bktohome", 'OK');
    this.imgpath = environment.imagepath;
    this.logedUser = this.localApi.getuser();
    this.getappsetng = this.localApi.getappseting();
   console.log('TMSLT',this.getappsetng.timeslot[0].datename);
   
    if(this.getappsetng.timeslot[0].datename != 'Today'){
      console.log(this.getappsetng.timeslot[0].datename);
      this.isordertomorrow = true;
      this.nextdeday = this.getdayfullname(this.getappsetng.timeslot[0].datename);
      this.nexttime = this.tConv24(this.getappsetng.timeslot[0].value);
    }
    

    if(this.getappsetng.restrictions_label){
      this.restrictns_lbl = this.getappsetng.restrictions_label;
      this.restrictns_txt = this.getappsetng.restrictions_text;
    }

    
    // console.log('MYAPST', this.getappsetng.delivery_free);
    this.localApi.removedeladrs();
    this.localApi.removedelcost();
    this.localApi.removextrnt();
    // this.localApi.removedeltime();
    // this.localApi.removeapplyedofr();
    var totaladditional = parseFloat(this.getappsetng.additional_one_value)+parseFloat(this.getappsetng.additional_two_value)+parseFloat(this.getappsetng.additional_three_value) 
    this.totaladditional = totaladditional.toFixed(2);
    console.log(this.totaladditional);

    var chsdeltime = this.localApi.getdeltime();
    if(chsdeltime){
      var delday = chsdeltime.split(' -')[0];
      var deltm = chsdeltime.split(' -')[1];
      this.chsdeltime = delday+' - '+deltm;
    }
    
    this.getxtras();
    // this.getdeltimes();
    this.getallProducts();


    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.isKeyboardHide=false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.isKeyboardHide=true;
      // console.log('HIDEK');
    });
  }

  tConv24(time24) {
    var ts = time24;
    this.hrsfr = +ts.substr(0, 2);
    this.hrert = (this.hrsfr % 12) || 12;
    this.hrert = (this.hrert < 10)?("0"+this.hrert):this.hrert;  // leading 0 at the left for 1 digit hours
    var ampm = this.hrsfr < 12 ? " AM" : " PM";
    ts = this.hrert + ts.substr(2, 3) + ampm;
    return ts;
  }

  async clearmycart() {
    let alert = await this.alertController.create({
      header: this.trnslt.atntn,
      message: this.trnslt.this_will_clr_all_itm,
      buttons: [
        {
          text: this.trnslt.cancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.cart.removeCart();
            this.ionViewWillEnter();
          }
        }
      ]
    });
    await alert.present();
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

  updateuserdetails(){
    // console.log('PLATFORM', this.device.platform);
    this.logedUser = this.localApi.getuser();
    if(this.logedUser){
      this.logedUser.token = localStorage.getItem(environment.storage_prefix+'userdevicetoken');
      this.logedUser.device_type = this.device.platform;
      
      this.apiService.postdata('userfoceupdate', this.logedUser).subscribe((resp: any) => {
        this.localApi.setuser(resp.data);
        this.logedUser = this.localApi.getuser();
      }, (err: any) => {
      return false;
      });
    }
  }

  cancelcpn(){
    this.localApi.removeapplyedofr();
    this.ionViewWillEnter();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }

  checkshopstatus(){
    if(this.getappsetng.opentime.toDayShop=='CLOSE'){
      this.isShopclose = true;
      this.closetxt = this.getappsetng.opentime;
    } else {
      // this.getdeltimes();
    }
  }
  noshopping(){
    this.isShopclose = false;
    // this.getdeltimes();
  }

  getallProducts(){
    this.getappsetng = this.localApi.getappseting();
    this.mycart = this.cart.getcart();
    // console.log(this.mycart);

    this.carttotal = this.cart.getTotalCart();
    this.cartcount = this.mycart.length;
    if(this.cartcount > 0){
      this.isKeyboardHide = true;
    } else {
      this.isKeyboardHide = true;
    }
    if(this.getappsetng.tax_lebel){
      var taxvalue = parseFloat(this.carttotal)*parseFloat(this.getappsetng.tax_value)/100;
      this.taxvalue = taxvalue.toFixed(2);
    } else {
      this.taxvalue = '0.00';
    }




    this.apldofrs = this.localApi.getapplyedofr();

    if(this.apldofrs){
      if(this.apldofrs.off_type=='Flat'){
        this.offer_text = 'Flat '+this.getappsetng.currency_symbol+this.apldofrs.off_value+' '+this.trnslt.dis_appl;
        this.off_amount = this.apldofrs.off_value;
      } else {
        this.offer_text = this.apldofrs.off_value+'% '+this.trnslt.dis_appl;
        this.dicuctamnt = (this.carttotal*this.apldofrs.off_value)/100;
        this.off_amount = this.dicuctamnt.toFixed(2);
      }
      this.payamuntcalc = parseFloat(this.carttotal)-parseFloat(this.off_amount);
      var pay_amount = parseFloat(this.payamuntcalc)+parseFloat(this.taxvalue)+parseFloat(this.totaladditional);
      this.pay_amount = pay_amount.toFixed(2);
      // this.pay_amount = this.carttotal;
    } else {
      var pay_amount = parseFloat(this.carttotal)+parseFloat(this.taxvalue)+parseFloat(this.totaladditional);
      this.pay_amount = pay_amount.toFixed(2);
    }
    if(this.getappsetng.delivery_free > this.carttotal){
      var restfredelprx = parseFloat(this.getappsetng.delivery_free)-parseFloat(this.carttotal);
      this.restfredelprx = restfredelprx.toFixed(2);
      this.mrprcfrdelfree = this.trnslt.get_free_ad_anth+' '+this.getappsetng.currency_symbol+this.restfredelprx;
    } else {
      this.mrprcfrdelfree = '';
    }
    

  }

  getxtras(){
    if(!this.extrasitm){
      this.basic.presentLoading();
      this.apiService.postdata('getextras', this.postdata).subscribe((resp: any) => {
        this.extrasitm = resp.data;
        console.log('Extr', resp.data);
        setTimeout(()=>{
          this.basic.dismissloader();
        },1000)
      }, (err: any) => {
      return false;
      });
    }
  }


  getdeltimes(date){
    this.postdata.snddate = date;
    this.basic.presentLoading();
    this.apiService.postdata('getdeltimebreak', this.postdata).subscribe((resp: any) => {
      let timesdel = resp.data;
      console.log(timesdel.status);
      if(timesdel.status=='Close'){
        this.basic.alert(this.trnslt.info, timesdel.message);
      } else {
        let theNewInputs = [];
        for(let i=0; i < timesdel.length; i++){
          // console.log(timesdel[i]);
          theNewInputs.push(
            {
              name: 'deltimmy',
              type: 'radio',
              value: timesdel[i].datename +' - '+timesdel[i].value +' - '+date,
              checked: false,
              label: timesdel[i].datename +' - '+timesdel[i].value
            }
          );
        }
        this.deltimelist = theNewInputs;
      }
      
      setTimeout(()=>{
          this.basic.dismissloader();
          if(timesdel.status!='Close'){
            this.opndeltimelist();
          }
      },1000)
    }, (err: any) => {
      this.basic.dismissloader();
    return false;
    });
  }




  async opndeltimelist() {
    const alert = await this.alertController.create({
      cssClass: 'freeddelmessages',
      header: this.trnslt.select_del_time,
      subHeader: this.mrprcfrdelfree,
      inputs: this.deltimelist,
      buttons: [
        {
          text: this.trnslt.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (val) => {
            if(val){
              if(val=='future'){
                this.opendatetimedel();
              } else {
                console.log(val);
                this.localApi.setdeltime(val);

                var delday = val.split(' -')[0];
                var deltm = val.split(' -')[1];
                this.chsdeltime = delday+' - '+deltm;
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }



  async opendatetimedel() {
    const alert = await this.alertController.create({
      cssClass: 'freeddelmessage',
      header: this.trnslt.slct_del_date,
      subHeader: this.mrprcfrdelfree,
      inputs: [
        {
          name: 'del_date',
          type: 'date',
          placeholder: this.trnslt.selct_a_date
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (val) => {
            if(!val.del_date){
              this.basic.alert(this.trnslt.error, this.trnslt.plz_chos_del_date);
              return false;
            } else {
              this.getdeltimes(val.del_date);
              // this.localApi.setdeltime(val.del_date+' - '+val.del_time+' - future');
              // this.chsdeltime = this.localApi.getdeltime();
              // var deldate = this.chsdeltime.split(' -')[0];
              // var deltm = this.chsdeltime.split(' -')[1];
              // var mydate = new Date(deldate);
              // var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              // "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mydate.getMonth()];
              // var str = mydate.getDate()+'-'+month+'-'+mydate.getFullYear();
              // this.chsdeltime = str+' - '+val.del_time;
              return true;
              console.log(val);
            }
            
          }
        }
      ]
    });

    await alert.present();
  }


  addqty(itm){
    this.cancelcpn();
    this.nowqty = '';
    this.nowval = '';
    this.nowqty = $('#itmqtyval_'+itm.id).html();
    this.nowval = parseInt(this.nowqty)+1;
    $('#itmqtyval_'+itm.id).html(this.nowval);
    this.cart.plusqnty(itm);
    this.getallProducts();
  }
  munisqty(itm){
    this.cancelcpn();
    this.nowqty = '';
    this.nowval = '';
    this.nowqty = $('#itmqtyval_'+itm.id).html();
    this.nowval = parseInt(this.nowqty)-1;
    $('#itmqtyval_'+itm.id).html(this.nowval);
    this.cart.minusqntyfrmprod(itm);
    this.getallProducts();
  }

  continueShp(){
    this.location.back();
  }
  alrestclose(){
    this.isRestricktn = false;
    this.isordertomorrow = false;
  }
  callforprocessd(){

    if(this.getappsetng.restrictions_label){
      this.isRestricktn = true;
    } else if(!this.chsdeltime){
      this.basic.alert(this.trnslt.del_time, this.trnslt.plz_chos_del_time);
    } else {
      this.processed();
    }
  }
  async procesingtime() {
    const alert = await this.alertController.create({
      header: this.trnslt.cooking_time,
      message: this.getappsetng.preparation_time,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.processed();
          }
        }
      ]
    });

    await alert.present();
  }


  processed(){
    var chsdeltime = this.localApi.getdeltime();
    if(!chsdeltime){
      this.basic.alert(this.trnslt.error, this.trnslt.plz_chos_del_time_slot);
    } else {
      this.logedUser = this.localApi.getuser();
      if(this.logedUser){
        var carttotal = parseFloat(this.carttotal);
        var min_amount_checkout = parseFloat(this.getappsetng.min_amount_checkout);

        if(carttotal < min_amount_checkout){
          var morePr = parseFloat(this.getappsetng.min_amount_checkout) - parseFloat(this.carttotal);
          this.basic.alert(this.trnslt.info, this.trnslt.min_ord_val_is+' '+this.getappsetng.currency_symbol+this.getappsetng.min_amount_checkout+', '+this.trnslt.plz_add_anth+' '+this.getappsetng.currency_symbol+morePr.toFixed(2)+' '+this.trnslt.worth_of_itm);
        } else {
          this.openorderoption();
        }
      } else {
        this.openloginpanel()
      }
    }
  }

  async openloginpanel() {
    console.log('OK');
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.processed();
      }
    });
    return await modal.present();
  }



  async openorderoption() {
    const actionSheet = await this.actionSheetController.create({
      header: this.trnslt.plz_chos_del_optn,
      cssClass: 'ordtypewrapper',
      buttons: [{
        text: this.trnslt.i_would_del_me,
        handler: () => {
          if(this.getappsetng.delivery=='YES'){
            var carttotal = parseFloat(this.carttotal);
            var min_amount_delivery = parseFloat(this.getappsetng.min_amount_delivery);

            if(carttotal < min_amount_delivery){
              var morePr = parseFloat(this.getappsetng.min_amount_delivery) - parseFloat(this.carttotal);
              this.basic.alert(this.trnslt.info, this.trnslt.min_ord_val_is+' '+this.getappsetng.currency_symbol+this.getappsetng.min_amount_delivery+', '+this.trnslt.plz_add_anth+' '+this.getappsetng.currency_symbol+morePr.toFixed(2)+' '+this.trnslt.trnslt);
            } else {
              this.localApi.setxtrnt(this.extranotes);
              this.localApi.setordertype('Delivery');
              if(this.extrasitm.length > 0){
                this.route.navigate(['/extras']);
              } else {
                this.route.navigate(['/addressbook/checkout']);
              }
            }
          } else {
            this.basic.alert(this.trnslt.sorry, this.trnslt.del_option_no_avl);
          }
          
        }
      },
      {
        text: this.trnslt.i_whd_lic_coct_id,
        handler: () => {
          if(this.getappsetng.takeaway=='YES'){
            this.localApi.setxtrnt(this.extranotes);
            this.localApi.setordertype('Collect');
            if(this.extrasitm.length > 0){
              this.route.navigate(['/extras']);
            } else {
              this.route.navigate(['/checkout']);
            }
          } else {
            this.basic.alert(this.trnslt.sorry, this.trnslt.we_are_crurnly_not_take_colle);
          }
          
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }




  // PAYMENT AND PLACE ORDER===================
  
  
  gofers(){
    this.logedUser = this.localApi.getuser();
    if(this.logedUser){
      this.route.navigate(['/offers/apply']);
    } else {
      this.openlogforofr();
    }
  }

  async openlogforofr() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.route.navigate(['/offers/apply']);
      }
    });
    return await modal.present();
  }

  homego(){
    this.route.navigate(['/home']);
  }


  removeXtrs(item){
    this.cart.deleteProduct(item);
    this.ionViewWillEnter();
  }

}
