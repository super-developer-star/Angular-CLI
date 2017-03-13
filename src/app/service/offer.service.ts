import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {TF1Constant} from '../constant/constant';
import {MemberService} from "./member.service";


@Injectable()
export class OfferService {

  constructor(private http: Http,private memberService:MemberService) { }


  initOffer(i:any){

    if(this.memberService.isLogged()) {
      let member_token =this.memberService.getuserloggedTab('member_token');
      let member_id=this.memberService.getuserloggedTab('member_id');
      let body = {"page": i,"member_token":member_token,"member_id":member_id};
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl + '/api/public/home/getWebOffers', body, {headers: headers})
        .map((data: Response) => data.json())
        .catch(this.handleError);
    }else{
      let body = {"page": i};
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl + '/api/public/home/getWebOffers', body, {headers: headers})
        .map((data: Response) => data.json())
        .catch(this.handleError);
    }
  }



  getbrandName(brandId:number){
    let X_Cwallet_Partner_Id='2';
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
    var CryptoJS = require("crypto-js");
    var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/brands',{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  getOfferDetail(offerId:number){
    let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    let dateform=dateFormat(now, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;
    let ut='/api/v1/pah/offers/'+offerId+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
    var CryptoJS = require("crypto-js");
    var hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/pah/offers/'+offerId,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }

  getRelatedOffer(offerId:number){
    let X_Cwallet_Partner_Id='2';
    let dateFormat = require('dateformat');
    let now = new Date();
    let dateform=dateFormat(now, "ddd, dd mmm yyyy ");
    let d = new Date();
    let h = this.addZero(d.getUTCHours());
    let m = this.addZero(d.getUTCMinutes());
    let s = this.addZero(d.getUTCSeconds());
    let time=h + ":" + m + ":" + s+" GMT";
    let X_Cwallet_Timestamp=dateform+time;
    let ut='/api/v1/pah/offers/'+offerId+'/related'+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';
    let CryptoJS = require("crypto-js");
    let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id',X_Cwallet_Partner_Id);
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/pah/offers/'+offerId+'/related',{headers:headers})
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
