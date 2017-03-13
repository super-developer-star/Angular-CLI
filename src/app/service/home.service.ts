import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {TF1Constant} from '../constant/constant';
import {isDefined} from "ng2-translate/src/util";
import {MemberService} from "./member.service";

@Injectable()
export class HomeService {

  constructor(private http: Http,private memberService:MemberService) { }

  initHomePage(){
    if(this.memberService.isLogged()){
      let member_token =this.memberService.getuserloggedTab('member_token');
      let member_id=this.memberService.getuserloggedTab('member_id');
      let body = {"from":2,"member_token":member_token,"member_id":member_id};

      const headers= new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/home',body,{headers:headers})
        .map((data :Response)=>data.json())
        .catch(this.handleError);
    }else{
      let body = {"from":2};
      const headers= new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/home',body,{headers:headers})
        .map((data :Response)=>data.json())
        .catch(this.handleError);

    }

  }

  getAllCategories(user_id?:number){
    // let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    let dateform=dateFormat(now, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;

      if(isDefined(user_id)){

        let member_token =this.memberService.getuserloggedTab('member_token');
        let ut='/api/v1/categories?member_id='+user_id+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
        let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

        let CryptoJS = require("crypto-js");
        let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
        let Access_Token =hmac.toString(CryptoJS.enc.Hex);

        const headers= new Headers();
        headers.append('Content-Type','application/json');
        headers.append('X-Cwallet-Partner-Id','2');
        headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
        headers.append('X-Partner-Access-Token',Access_Token);
        headers.append('Authorization','Bearer '+member_token);
        return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/categories?member_id='+user_id,{headers:headers})
          .map((data :Response)=>data.json())
          .catch(this.handleError);

      }else{

        let ut='/api/v1/categories'+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
        let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

        let CryptoJS = require("crypto-js");
        let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
        let Access_Token =hmac.toString(CryptoJS.enc.Hex);

        const headers= new Headers();
        headers.append('Content-Type','application/json');
        headers.append('X-Cwallet-Partner-Id','2');
        headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
        headers.append('X-Partner-Access-Token',Access_Token);
        return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/categories',{headers:headers})
          .map((data :Response)=>data.json())
          .catch(this.handleError);
      }


  }

  getAllBrands(){
    // let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    let dateform=dateFormat(now, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;


    let ut='/api/v1/brands'+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

    let CryptoJS = require("crypto-js");
    let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id','2');
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/brands',{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }

  filterOfferByCategory(brandId:any){
    // let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    let dateform=dateFormat(now, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;


    let ut='/api/v1/offers?category_id='+brandId+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

    let CryptoJS = require("crypto-js");
    let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id','2');
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/offers?category_id='+brandId,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }



  addZero(i)
  {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  private handleError (error: any){
    console.log(error);
    return Observable.throw(error.json());
  }



}
