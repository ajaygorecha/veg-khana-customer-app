import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocalApiService {
  
  constructor() {
    console.log('HHH', environment.storage_prefix);
    let dirymtl = JSON.parse(localStorage.getItem(environment.storage_prefix+'setngpushface'));
    if(!dirymtl){
      let psfc = {
        push: true,
        face: false,
      };
      localStorage.setItem(environment.storage_prefix+'setngpushface', JSON.stringify(psfc));
    }
    let applng = JSON.parse(localStorage.getItem(environment.storage_prefix+'applng'));
    if(!applng){
      localStorage.setItem(environment.storage_prefix+'applng', '[]');
    }
    
  }

  getuser(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'user'));
  }
  setuser(val){
    localStorage.setItem(environment.storage_prefix+'user', JSON.stringify(val));
    this.setuserdevice(val);
  }
  removeUser(){
    localStorage.removeItem(environment.storage_prefix+'user');
  }

  getuserdevice(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'userdevice'));
  }
  setuserdevice(val){
    localStorage.setItem(environment.storage_prefix+'userdevice', JSON.stringify(val));
  }

  callforuser(){
    return 'hello';
  }


  getappseting(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'appsetting'));
  }
  setappseting(val){
    localStorage.setItem(environment.storage_prefix+'appsetting', JSON.stringify(val));
  }





  getdeladrs(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'deladdrs'));
  }
  setdeladrs(val){
    localStorage.setItem(environment.storage_prefix+'deladdrs', JSON.stringify(val));
  }
  removedeladrs(){
    localStorage.removeItem(environment.storage_prefix+'deladdrs');
  }

  getdelcost(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'delcost'));
  }
  setdelcost(val){
    localStorage.setItem(environment.storage_prefix+'delcost', JSON.stringify(val));
  }
  removedelcost(){
    localStorage.removeItem(environment.storage_prefix+'delcost');
  }

  getxtrnt(){
    return localStorage.getItem(environment.storage_prefix+'xtrnt');
  }
  setxtrnt(val){
    localStorage.setItem(environment.storage_prefix+'xtrnt', val);
  }
  removextrnt(){
    localStorage.removeItem(environment.storage_prefix+'xtrnt');
  }


  getapplyedofr(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'apldofr'));
  }
  setapplyedofr(val){
    localStorage.setItem(environment.storage_prefix+'apldofr', JSON.stringify(val));
  }
  removeapplyedofr(){
    localStorage.removeItem(environment.storage_prefix+'apldofr');
  }

  getpushfaceset(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'setngpushface'));
  }
  setpushfaceset(val){
    localStorage.setItem(environment.storage_prefix+'setngpushface', JSON.stringify(val));
  }


  getordertype(){
    return localStorage.getItem(environment.storage_prefix+'ordtype');
  }
  setordertype(val){
    localStorage.setItem(environment.storage_prefix+'ordtype', val);
  }
  removeordertype(){
    localStorage.removeItem(environment.storage_prefix+'ordtype');
  }

  getdeltime(){
    return localStorage.getItem(environment.storage_prefix+'deltime');
  }
  setdeltime(val){
    localStorage.setItem(environment.storage_prefix+'deltime', val);
  }
  removedeltime(){
    localStorage.removeItem(environment.storage_prefix+'deltime');
  }

  getapplng(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'applng'));
  }
  setapplng(val){
    localStorage.setItem(environment.storage_prefix+'applng', JSON.stringify(val));
    this.setuserdevice(val);
  }

  getmyseleclng(){
    return JSON.parse(localStorage.getItem(environment.storage_prefix+'selectlng'));
  }
  setmyseleclng(val){
    localStorage.setItem(environment.storage_prefix+'selectlng', JSON.stringify(val));
    this.setuserdevice(val);
  }
  
}
