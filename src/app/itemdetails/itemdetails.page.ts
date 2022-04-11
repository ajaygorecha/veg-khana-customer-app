import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.page.html',
  styleUrls: ['./itemdetails.page.scss'],
})
export class ItemdetailsPage implements OnInit {
@Input() item: any;
imgpath: any;
getappsetng: any;
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
    speed: 1000,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      modifierClass: 'nameyourspecialclass'
    }
  };
  trnslt: any = {};
  constructor(
  	public menuCtrl: MenuController,
    public apiService: ApiService,
    public basic: BasicApiService,
	public localApi: LocalApiService,
    public route: Router,
    public alertController: AlertController,
    public location: Location,
  	) { }
  
  ngOnInit() {
    this.trnslt = this.localApi.getmyseleclng();
    this.getappsetng = this.localApi.getappseting();
  	console.log(this.item);
  	this.imgpath = environment.imagepath;
  }

}
