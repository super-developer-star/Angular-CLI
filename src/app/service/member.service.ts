import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {TF1Constant} from '../constant/constant';
import {CouponService} from "./coupon.service";


@Injectable()
export class MemberService {


  constructor(private http: Http) { }

  register(user :any){
    let date=user.birthday;
    let year=date.substr(date.length - 4);
    let day=date.substring(0, 2);
    let month=date.substring(3, 5);
    let birthday=year+"-"+month+"-"+day;
    let partnerDefault=user.partner;
    let partnerValue="false"
    if(partnerDefault){
      partnerValue="true";
    }
    let json = {"email":user.email,"password":user.password,"birthday":birthday,"postcode":user.postcode,"gender":user.gender,"firstName":user.firstname,"lastName":user.lastname, "news_optin_partner":partnerValue};
    let body=json;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/users/register/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }
  updateAdr(user :any){
    let member_id=this.getuserloggedTab('member_id');
    let member_token=this.getuserloggedTab('member_token');
    let uid=this.getuserloggedTab('uid');
    let json = {"member_id":member_id,"member_token":member_token,"uid":uid,"postcode":user.postcode,"street":user.street,"street_bis":user.street_bis,"city":user.city,"country":user.country};
    let body=json;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(TF1Constant.shoppingBaseUrl+'/api/public/users/update/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }

  updatePwd(user :any){
    let member_id=this.getuserloggedTab('member_id');
    let member_token=this.getuserloggedTab('member_token');
    let uid=this.getuserloggedTab('uid');
    let json = {"member_id":member_id,"member_token":member_token,"uid":uid,"password":user.password,"newPassword":user.newPassword};
    let body=json;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(TF1Constant.shoppingBaseUrl+'/api/public/users/update/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }
  updateInfos(user :any){
    let date=user.customDatepickerValue;
    let year=date.substr(date.length - 4);
    let day=date.substring(0, 2);
    let month=date.substring(3, 5);
    let birthday=year+"-"+month+"-"+day;
    let member_id=this.getuserloggedTab('member_id');
    let member_token=this.getuserloggedTab('member_token');
    let uid=this.getuserloggedTab('uid');
    let json = {"member_id":member_id,"member_token":member_token,"uid":uid,"birthday":birthday,"postcode":user.postcode,"gender":user.gender,"firstName":user.firstname,"lastName":user.lastname, "news_optin_partner":user.partner};
    let body=json;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(TF1Constant.shoppingBaseUrl+'/api/public/users/update/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  loginfn(user :any){
    let body=user;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/users/login/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  isLogged(){
    if(localStorage.getItem('authUser')||sessionStorage.getItem('authUser')){
      return true;
    }else{
      return false;
    }

  }
  getuserloggedTab(val:any){

    if(localStorage.getItem('authUser')){
      let tab=JSON.parse(window.localStorage.getItem('authUser'));
      for(let i=0;i<tab.length;i++){
        return(tab[i][val]);
      }

    } else if(sessionStorage.getItem('authUser')){
      let tab=JSON.parse(window.sessionStorage.getItem('authUser'));
      for(let i=0;i<tab.length;i++){
        return(tab[i][val]);
      }

    }
}
setuserloggedTab(key:any,val:any){

  if(localStorage.getItem('authUser')){
    let tab=JSON.parse(window.localStorage.getItem('authUser'));
    for(let i=0;i<tab.length;i++){
      tab[i][key]=val;
    }
    localStorage.setItem('authUser', JSON.stringify(tab));
  }
  else if(sessionStorage.getItem('authUser')){
    let tab=JSON.parse(window.sessionStorage.getItem('authUser'));
    for(let i=0;i<tab.length;i++){
      tab[i][key]=val;
    }
    sessionStorage.setItem('authUser', JSON.stringify(tab));
  }
}
  getUserProfile(user :any){
    let body=user;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/users/profile/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }


   resetPassword(mail:any){
     let body=mail;
     const headers= new Headers();
     headers.append('Content-Type','application/json');
     return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/users/resetPassword',body,{headers:headers})
       .map((data :Response)=>data.json())
       .catch(this.handleError);
   }

  contactEmail(form:any){
    let body=form;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/users/sendMessage/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }

  postCouponPrintAll(tabid:any,member_id:any,member_token:any){

     let TabOfferID = new Array();
     let TabOfferID2 = new Array();

     for (let i = 0; i < tabid.length; i++) {
       TabOfferID.push({"offer_id":tabid[i]});
     }
     TabOfferID2.push(TabOfferID[(TabOfferID.length)-1]);
     let bodyLength=JSON.stringify(TabOfferID2).length;
     let body=JSON.stringify(TabOfferID2);
     let X_Cwallet_Partner_Id='2';
     let dateFormat = require('dateformat');
     let now = new Date();
     var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
     let dateform=dateFormat(now_utc, "ddd, dd mmm yyyy ");
     let d = new Date();
     let h = this.addZero(d.getUTCHours());
     let m = this.addZero(d.getUTCMinutes());
     let s = this.addZero(d.getUTCSeconds());
     let time=h + ":" + m + ":" + s+" GMT";
     let X_Cwallet_Timestamp=dateform+time;
     let ut='/api/v1/pah/members/'+member_id+'/orders'+'POST'+bodyLength+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
     let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
     var CryptoJS = require("crypto-js");
     var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
     let Access_Token =hmac.toString(CryptoJS.enc.Hex);

     const headers= new Headers();
     headers.append('Content-Type','application/json');
     headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
     headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
     headers.append('X-Partner-Access-Token',Access_Token);
     headers.append('Authorization','Bearer '+member_token);
     return this.http.post('http://m.uat.cwallet.snapp.fr/api/v1/pah/members/'+member_id+'/orders',body,{headers:headers})
       .map((data :Response)=>data.json())
       .catch(this.handleError);

   }
  postCoupon(tabid:any,member_id:any,member_token:any){

    let TabOfferID = new Array();

    for (let i = 0; i < tabid.length; i++) {
      TabOfferID.push({"offer_id":tabid[i]});
    }

    let bodyLength=JSON.stringify(TabOfferID).length;
    let body=JSON.stringify(TabOfferID);
    let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let dateform=dateFormat(now_utc, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;
    let ut='/api/v1/pah/members/'+member_id+'/orders'+'POST'+bodyLength+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
    var CryptoJS = require("crypto-js");
    var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    headers.append('Authorization','Bearer '+member_token);
    return this.http.post('http://m.uat.cwallet.snapp.fr/api/v1/pah/members/'+member_id+'/orders',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }



  deleteCoupon(order:any,member_id:any,member_token:any){
    let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let dateform=dateFormat(now_utc, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;
    let ut='/api/v1/pah/members/'+member_id+'/orders/'+order+'DELETE'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
    var CryptoJS = require("crypto-js");
    var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    headers.append('Authorization','Bearer '+member_token);
    return this.http.delete('http://m.uat.cwallet.snapp.fr/api/v1/pah/members/'+member_id+'/orders/'+order,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  getCoupon(member_id:any,member_token:any){
    let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let dateform=dateFormat(now_utc, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;
    let ut='/api/v1/pah/members/'+member_id+'/orders'+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
    var CryptoJS = require("crypto-js");
    var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    headers.append('Authorization','Bearer '+member_token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/pah/members/'+member_id+'/orders',{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }

  private handleError (error: any){
    console.log(error);
    return Observable.throw(error.json());
  }
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}
