import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
 locres_cartlist: any;
 forcrtttl: any;
  constructor() {
    let mycrt = JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
    if(!mycrt){
      localStorage.setItem(environment.storage_prefix+'cartlist', '[]');
    }
  }

removeCart(){
  localStorage.setItem(environment.storage_prefix+'cartlist', '[]');
}

  checkismloptn(frwh){
    let cart = this.getcart();
      let idno:any = 1;
      for (let i = 0; i < cart.length; i++) {
        if(frwh=='mealdeal'){
          if(cart[i].ismldl=='YES'){
            idno = parseInt(idno)+1;
          }
        }
        if(frwh=='selections'){
          if(cart[i].isoptn=='YES'){
            idno = parseInt(idno)+1;
          }
        }
      }
      return idno;
  }

  addcart(item,variation,selections,mealdeal){
    let slcTotal: any = 0;
    let mldlTotal: any = 0;
    var productnames, prodcPrice, prdid, itemtotal, itmOnly, isvartn, isoptn, ismldl, mealdealid, slctnid;
    if (variation) {
      productnames = item.name+' - '+variation.name;
      prodcPrice = variation.price;
      itmOnly = variation.price;
      prdid = item.id+'_'+variation.id;
      isvartn = 'YES';
    } else if(selections) {
      productnames = item.name;
      prodcPrice = item.price;
      itmOnly = item.price;
      prdid = item.id+'_otpn';
      isvartn = '';
    } else if(mealdeal) {
      if(variation){
        productnames = item.name+' - '+variation.name;
        prodcPrice = variation.price;
        itmOnly = variation.price;
        prdid = item.id+'_'+variation.id;
      } else {
        prodcPrice = item.price;
        itmOnly = item.price;
        productnames = item.name;
        prdid = item.id+'_mldl';
      }
      isvartn = 'YES';
    } else {
      productnames = item.name;
      prodcPrice = item.price;
      itmOnly = item.price;
      prdid = item.id;
      isvartn = '';
    }

    if (selections) {
      var selecTTotal = 0.00;
      for(var i=0; i<selections.length; i++){
          var fil = parseFloat(selections[i].price);
          selecTTotal += fil;
      }
      var fnSlTotal = selecTTotal.toFixed(2);
      var slcTtl = parseFloat(fnSlTotal);
      slcTotal = slcTtl.toFixed(2);
      isoptn = 'YES';
      slctnid = this.checkismloptn('selections');
      var withslpr = parseFloat(slcTotal)+parseFloat(prodcPrice);
    } else {
      isoptn = '';
      slctnid = '';
      var withslpr = 0;
    }


    if (mealdeal) {
        var mslDttol = 0.00;
        for(var r=0; r<mealdeal.length; r++){
          mealdeal[r].total = mealdeal[r].price;
            var fil = parseFloat(mealdeal[r].price);
            mslDttol += fil;
        }
        var fnmldtal = mslDttol.toFixed(2);
        var mslTtol = parseFloat(fnmldtal);
        mldlTotal = mslTtol.toFixed(2);
        ismldl = 'YES';
        mealdealid = this.checkismloptn('mealdeal');
        var withmealdeal = parseFloat(mldlTotal)+parseFloat(prodcPrice);
    } else {
      ismldl = '';
      mealdealid = '';
      var withmealdeal = 0;
    }

    let item_sub_total: any = parseFloat(itmOnly) + parseFloat(slcTotal) + parseFloat(mldlTotal);
    console.log(slcTotal);
    this.locres_cartlist = JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
    if (this.locres_cartlist.length > 0) {
            let existingCartProduct = [];
            existingCartProduct = this.filterCart(this.locres_cartlist, item.id);
            if (existingCartProduct && existingCartProduct.length > 0 && !variation && !item.extras) {

                existingCartProduct[0].qty++;
                let prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
                let totalpriceincr = (prcFloat).toFixed(2);
                existingCartProduct[0].total= totalpriceincr;
                
            } else {
                let totalforitem = parseFloat(prodcPrice);
                let productDetails = [{
                    'name': productnames,
                    'image': item.productImage,
                    'preorder': item.preorder,
                    'pre_time': item.preorder_text,
                    'price': prodcPrice,
                    'id': prdid,
                    'productDesc': item.description,
                    'selections': selections,
                    'productType': item.foodcategory,
                    'qty': 1,
                    'total': totalforitem *1,
                    'slcTotal': slcTotal,
                    'itemtotal': itmOnly *1,
                    'item_sub_total': item_sub_total.toFixed(2),
                    'itmOnly': itmOnly,
                    'xtras': item.extras,
                    'isvartn': isvartn,
                    'isoptn': isoptn,
                    'withslpr': withslpr,
                    'ismldl': ismldl,
                    'mealdealid': mealdealid,
                    'slctnid': slctnid,
                    'withmealdeal': withmealdeal,
                    'mealdeal': mealdeal,
                    'mldlTotal': mldlTotal
                }];
                this.locres_cartlist.push(productDetails[0]);
            }
        } else {
            let totalforitem = parseFloat(prodcPrice);
            let productDetails = [{
                'name': productnames,
                'image': item.productImage,
                'preorder': item.preorder,
                'pre_time': item.preorder_text,
                'price': prodcPrice,
                'id': prdid,
                'productDesc': item.description,
                'selections': selections,
                'productType': item.foodcategory,
                'qty': 1,
                'total': totalforitem *1,
                'slcTotal': slcTotal,
                'itemtotal': itmOnly *1,
                'item_sub_total': item_sub_total.toFixed(2),
                'itmOnly': itmOnly,
                'xtras': item.extras,
                'isvartn': isvartn,
                'isoptn': isoptn,
                'withslpr': withslpr,
                'ismldl': ismldl,
                'slctnid': slctnid,
                'mealdealid': mealdealid,
                'withmealdeal': withmealdeal,
                'mealdeal': mealdeal,
                'mldlTotal': mldlTotal
            }];
            this.locres_cartlist.push(productDetails[0]);
        }

    localStorage.setItem(environment.storage_prefix+'cartlist', JSON.stringify(this.locres_cartlist));
    return this.getcart();
  }
  getcart(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
  }

  plusqnty(item){
    this.locres_cartlist = JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
    let existingCartProduct = [];
    existingCartProduct = this.filterCart(this.locres_cartlist, item.id);
    existingCartProduct[0].qty++;
    var prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
    let totalpriceincr = (prcFloat).toFixed(2);
    

    var itprcFloat = existingCartProduct[0].qty * existingCartProduct[0].itmOnly;
    let ittotalpriceincr = (itprcFloat).toFixed(2);
    existingCartProduct[0].itemtotal= ittotalpriceincr;

    
    var slcTotal: any  = 0;
    for (let i = 0; i < existingCartProduct[0].selections.length; i++) {
        var newsltrl = existingCartProduct[0].selections[i].price * existingCartProduct[0].qty;
        existingCartProduct[0].selections[i].total = newsltrl.toFixed(2);
        slcTotal = parseFloat(existingCartProduct[0].selections[i].total)+parseFloat(slcTotal);
    }


    var mldlTotal: any  = 0;
    if(existingCartProduct[0].mealdeal){
      for (let i = 0; i < existingCartProduct[0].mealdeal.length; i++) {
          var newsltrl = existingCartProduct[0].mealdeal[i].price * existingCartProduct[0].qty;
          existingCartProduct[0].mealdeal[i].total = newsltrl.toFixed(2);
          mldlTotal = parseFloat(existingCartProduct[0].mealdeal[i].total)+parseFloat(mldlTotal);
      }
    }
    


    existingCartProduct[0].slcTotal = slcTotal;
    existingCartProduct[0].mldlTotal = mldlTotal;
    let item_sub_total: any = parseFloat(totalpriceincr)+parseFloat(slcTotal)+parseFloat(mldlTotal);
    existingCartProduct[0].item_sub_total = item_sub_total.toFixed(2);
    
    localStorage.setItem(environment.storage_prefix+'cartlist', JSON.stringify(this.locres_cartlist));
    return this.getcart();
  }

  minusqntyfrmprod(item){
    this.locres_cartlist = JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
    let existingCartProduct = [];
    existingCartProduct = this.filterCart(this.locres_cartlist, item.id);
    if (existingCartProduct[0].qty > 1) {
      existingCartProduct[0].qty--;
      let prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
      let totalpriceincr = (prcFloat).toFixed(2);
      existingCartProduct[0].total= totalpriceincr;


      let itprcFloat = existingCartProduct[0].qty * existingCartProduct[0].itmOnly;
      let ittotalpriceincr = (itprcFloat).toFixed(2);
      existingCartProduct[0].itemtotal= ittotalpriceincr;
      console.log(existingCartProduct[0].selections);
      var slcTotal: any = 0;
      for (let i = 0; i < existingCartProduct[0].selections.length; i++) {
          var newsltrl = existingCartProduct[0].selections[i].price * existingCartProduct[0].qty;
          existingCartProduct[0].selections[i].total = newsltrl.toFixed(2);
          slcTotal = parseFloat(existingCartProduct[0].selections[i].total)+parseFloat(slcTotal);
      }

      var mldlTotal: any  = 0;
      if(existingCartProduct[0].mealdeal){
        for (let i = 0; i < existingCartProduct[0].mealdeal.length; i++) {
            var newsltrl = existingCartProduct[0].mealdeal[i].price * existingCartProduct[0].qty;
            existingCartProduct[0].mealdeal[i].total = newsltrl.toFixed(2);
            mldlTotal = parseFloat(existingCartProduct[0].mealdeal[i].total)+parseFloat(mldlTotal);
        }
      }

      existingCartProduct[0].slcTotal = slcTotal;
      existingCartProduct[0].mldlTotal = mldlTotal;
      let item_sub_total: any = parseFloat(totalpriceincr)+parseFloat(slcTotal)+parseFloat(mldlTotal);
      existingCartProduct[0].item_sub_total = item_sub_total.toFixed(2);

    }else{
      for(let i=0; i < this.locres_cartlist.length; i++){
        if(this.locres_cartlist[i].id == item.id){
          this.deleteProduct(i);
          
        }
      }
    }
    
    localStorage.setItem(environment.storage_prefix+'cartlist', JSON.stringify(this.locres_cartlist));
    return this.getcart();
  }

  deleteProduct(index) {
    this.locres_cartlist = JSON.parse(localStorage.getItem(environment.storage_prefix+'cartlist'));
    (this.locres_cartlist).splice(index, 1);
    localStorage.setItem(environment.storage_prefix+'cartlist', JSON.stringify(this.locres_cartlist));
    return this.getcart();
  }

  filterCart(cartProducts, id) {
      let returnArray = [];
      for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i].id == id) {
              returnArray.push(cartProducts[i]);
          }
      }
      return returnArray;
  }

   getSingleQty(itm){
      let cart = this.getcart();
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id==itm) {
          return cart[i].qty;
        }
      }
    }


    getTotalCart(){
      let cart = this.getcart();
      this.forcrtttl = 0;
      for (let i = 0; i < cart.length; i++) {
        let total: any = parseFloat(cart[i].item_sub_total);
        this.forcrtttl = parseFloat(total)+parseFloat(this.forcrtttl);
      }
      return this.forcrtttl.toFixed(2);
    }

  
}
