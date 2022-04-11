import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LoginPage } from './login/login.page';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Device } from '@ionic-native/device/ngx';
import { ApiService } from 'src/Providers/Services/api.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  logeduser: any;
  public selectedIndex = 0;
  offer_id: any;
  postdata: any = {};
  phstng: any;
  ipbroptions: any = {};
  orderod: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home.png'
    },
    {
      title: 'Our Menu - Order Now',
      url: '/category',
      icon: 'menu.png'
    },
    {
      title: 'Book A Table',
      url: '/buffet',
      icon: 'table_booking.png'
    },
    {
      title: 'Offers',
      url: '/offers/noapply',
      icon: 'offers.png'
    },
    {
      title: 'Catering Services',
      url: '/catering',
      icon: 'cataring.png'
    },
    {
      title: 'Reviews / Ratings',
      url: '/reviews',
      icon: 'review.png'
    },
    {
      title: 'Allergy Advice',
      url: '/aboutus/Allergy',
      icon: 'allergy-advice.png'
    },
    {
      title: 'About Us',
      url: '/listviews/About Us',
      icon: 'about.png'
    },
    {
      title: 'Opening Hours',
      url: '/aboutus/Opening Hours',
      icon: 'openingtime.png'
    },
    {
      title: 'Help & Info',
      url: '/listviews/Help and Info',
      icon: 'help.png'
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'contact.png'
    },
    {
      title: 'Settings',
      url: '/listviews/Settings',
      icon: 'setting.png'
    },
    {
      title: 'Status Notifications',
      url: '/myacount/status',
      icon: 'virtual-tour.png'
    },
    // {
    //   title: 'Rate App',
    //   url: '/alldrymenu/DIARY',
    //   icon: 'rate.png'
    // },
    // {
    //   title: 'Settings',
    //   url: '/listviews/Settings',
    //   icon: 'setting.png'
    // }
  ];
  lngfile: any;
  getaplnsselc: any = {};
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public route: Router,
    public localApi: LocalApiService,
    private menu: MenuController,
    public basic: BasicApiService,
    private actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private oneSignal: OneSignal,
    private device: Device,
    public apiService: ApiService,
    private keyboard: Keyboard,
    private iab: InAppBrowser,
    private network: Network,
    public alertController: AlertController
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideFormAccessoryBar(true);
      this.keyboard.hideFormAccessoryBar(false);
      this.phstng = this.localApi.getpushfaceset();
      // this.ionViewDidEnter();
      // console.log(environment);
      // onesignal
        this.oneSignal.startInit(environment.onesignalkey, environment.firebasekey);
        // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });
                // console.log('Hello My Name ', environment);
        this.oneSignal.handleNotificationOpened().subscribe((rsvnt) => {
          // do something when a notification is opened
          console.log('opened notification');
          console.log(rsvnt);
          if(rsvnt.notification.payload.additionalData.type == 'Order'){
              this.orderod = rsvnt.notification.payload.additionalData.order_id;
              setTimeout(()=>{
                this.route.navigate(['/orderdetails/'+this.orderod+'/old']);
              },3000)
          }
          if(rsvnt.notification.payload.additionalData.type == 'Offers'){
              setTimeout(()=>{
                this.route.navigate(['/offers/noapply']);
              },3000)
          }
          if(rsvnt.notification.payload.additionalData.type == 'Buffet'){
              setTimeout(()=>{
                this.route.navigate(['/myacount/any']);
              },3000)
          }
          if(rsvnt.notification.payload.additionalData.type == 'AfterOrder'){
              setTimeout(()=>{
                this.afterorderreview(rsvnt.notification.payload.additionalData.aftordhead, rsvnt.notification.payload.additionalData.aftorddesc)
              },3000)
          }
        });

        this.oneSignal.promptForPushNotificationsWithUserResponse().then(() => {
          // this.events.publish('notification:created', 'resp', Date.now());
          console.log('Hello My Name ', environment);
        });


        this.oneSignal.getIds().then(dvsid=>{
          console.log('DEVICEMYTOKEN',dvsid.userId);
          //alert(dvsid.userId);
          localStorage.setItem(environment.storage_prefix+"userdevicetoken", dvsid.userId);
          this.setUserTokens(dvsid.userId);

        }).catch(err=>{
          console.log('OneSGNLERR', err);
        })

        this.oneSignal.endInit();

      // =======


      // watch network for a disconnection
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.route.navigate(['/nonetwork']);
      });


    });

    this.logeduser = this.localApi.getuser();
   //  this.route.events.subscribe((e) => {
   //    console.log('AAA')
   // });
   var aplng = this.localApi.getapplng();
   if(aplng.id){
    this.lngfile = aplng.name;
   } else {
    this.lngfile = 'English';
   }
    fetch('./assets/i18n/'+this.lngfile+'.json').then(res => res.json())
      .then(json => {
        this.localApi.setmyseleclng(json);
        this.getaplnsselc = this.localApi.getmyseleclng();
        console.log(json);
        this.appPages = [
        {
          title: this.getaplnsselc.home,
          url: '/home',
          icon: 'home.png'
        },
        {
          title: this.getaplnsselc.our_order,
          url: '/category',
          icon: 'menu.png'
        },
        {
          title: this.getaplnsselc.book_a_tbl,
          url: '/buffet',
          icon: 'table_booking.png'
        },
        {
          title: this.getaplnsselc.offers,
          url: '/offers/noapply',
          icon: 'offers.png'
        },
        {
          title: this.getaplnsselc.catering_service,
          url: '/catering',
          icon: 'cataring.png'
        },
        {
          title: this.getaplnsselc.review_rating,
          url: '/reviews',
          icon: 'review.png'
        },
        {
          title: this.getaplnsselc.allergy_advice,
          url: '/aboutus/Allergy',
          icon: 'allergy-advice.png'
        },
        {
          title: this.getaplnsselc.about_us,
          url: '/listviews/About Us',
          icon: 'about.png'
        },
        {
          title: this.getaplnsselc.openig_hours,
          url: '/aboutus/Opening Hours',
          icon: 'openingtime.png'
        },
        {
          title: this.getaplnsselc.help_info,
          url: '/listviews/Help and Info',
          icon: 'help.png'
        },
        {
          title: this.getaplnsselc.conact_us,
          url: '/contactus',
          icon: 'contact.png'
        },
        {
          title: this.getaplnsselc.settings,
          url: '/listviews/Settings',
          icon: 'setting.png'
        },
        {
          title: this.getaplnsselc.status_noti,
          url: '/myacount/status',
          icon: 'virtual-tour.png'
        },
      ];
    });



   
  }

  checklogin(){
    this.logeduser = this.localApi.getuser();
  }

  ngOnInit() {
    this.route.navigate(['/home']);
  }

  openmenu(val){
    this.menu.close();
    if(val.title=='Logout'){
      this.logoutme();
    } else if(val.title=='Book A Table'){
      this.openbookbuffet();
    } else if(val.title=='Status Notifications'){
      this.openmystatus();
    } else {
      this.route.navigate([val.url]);
    }
  }

  openmystatus(){
    this.logeduser = this.localApi.getuser();
    if(this.logeduser){
      this.route.navigate(['/myacount/status']);
    } else {
      this.openloginpanel('status');
    }
  }
  openbookbuffet(){
    this.logeduser = this.localApi.getuser();
    if(this.logeduser){
      this.route.navigate(['/bookabuffet']);
    } else {
      this.openlogforbookbuffet()
    }
  }


  async openlogforbookbuffet() {
    this.menu.close();
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.logeduser = this.localApi.getuser();
        this.route.navigate(['/bookabuffet']);
      }
    });
    return await modal.present();
  }
  
  logoutme(){
    this.localApi.removeUser();
    this.route.navigate(['/home']);
  }

  async openhelp() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Help & Info',
      cssClass: 'ordtypewrapper',
      buttons: [{
        text: "Terms & Conditions",
        handler: () => {
          this.route.navigate(['/aboutus/Terms and Conditions']);
        }
      }, {
        text: "Privacy Policy",
        handler: () => {
          this.route.navigate(['/aboutus/Privacy Policy']);
          
        }
      }, {
        text: "Delivery Information",
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: "Payments & Refunds",
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: "Contact Us",
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
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


  setUserTokens(mytoken){
    this.logeduser = this.localApi.getuser();
    this.postdata.token = mytoken;
    this.postdata.device = 'Mobile';
    this.postdata.device_type = this.device.platform;
    this.postdata.user = 'Customer';
    this.postdata.user_id = '';
    
    this.apiService.postdata('setusertokens', this.postdata).subscribe((resp: any) => {
      console.log('Set Token', resp)
    }, (err: any) => {
    return false;
    });
  }


  gomyacount(){
    this.menu.close();
    this.route.navigate(['/myacount/any']);
  }
  callog(){
    // this.logeduser = this.localApi.getuser();
    // console.log('sss', this.logeduser);
  }


  async openloginpanel(typ) {
    this.menu.close();
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data);
      if(data.data){
        this.logeduser = this.localApi.getuser();
        this.route.navigate(['/myacount/'+typ]);
      }
    });
    return await modal.present();
  }

  opensite(val){
    this.menu.close();
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
    if(val=='v1'){
      const browser = this.iab.create(environment.developer_website, '_blank', this.ipbroptions);
    }
  }


  async afterorderreview(heading, description) {
    
    const alert = await this.alertController.create({
      header: heading,
      cssClass: 'my-custom-class',
      message: description,
      buttons: [
        {
          text: 'Not Now!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'OK',
          handler: () => {
            const browser = this.iab.create(environment.fb_profile, '_system');
          }
        }
      ]
    });
    await alert.present();
  }

  
}
