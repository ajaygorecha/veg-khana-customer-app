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
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
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
    this.imgpath = environment.imagepath;
  	this.category_id = this.activatedRoute.snapshot.paramMap.get('category');
  	this.title = this.activatedRoute.snapshot.paramMap.get('title');
  	this.getallProducts();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.mycart = this.cart.getcart();
    this.carttotal = this.cart.getTotalCart();
    this.cartcount = this.mycart.length;
  }

  getallProducts(){
  	let aplng = this.localApi.getapplng();
    this.postdata.category_id = this.category_id;
    this.postdata.lngid = aplng.id;
    this.basic.presentLoading();
	  this.apiService.postdata('getcategory', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
		console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }


  gonext(item){
  	if(item.issubcategory){
      this.route.navigate(['/subcategory/'+item.id+'/'+item.name]);
  	} else {
  		this.route.navigate(['/products/'+item.id+'/0/'+item.name]);
  	}
  }



  viewmycart(){
    this.route.navigate(['/mycart']);
  }

}
