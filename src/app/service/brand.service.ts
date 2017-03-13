import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class BrandService {

  constructor(private http: Http) { }




  getBrandInfo(brand_id:any){
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


    let ut='/api/v1/spotlights/web?brand_id='+brand_id+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

    let CryptoJS = require("crypto-js");
    let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id','2');
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    console.log(headers);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/spotlights/web?brand_id='+brand_id,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

  }































  getSameBrand(brand_id:any){
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


    let ut='/api/v1/pah/offers?brand_id='+brand_id+'GET'+'0'+'d56c0ecbfb54c3e7d57522407c27a2d9'+X_Cwallet_Timestamp;
    let APIKEY='087a1b5e4c3e4a2d15b9fb3e63b0bbbe';

    let CryptoJS = require("crypto-js");
    let hmac =CryptoJS.HmacSHA1(ut, APIKEY);
    let Access_Token =hmac.toString(CryptoJS.enc.Hex);

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-Cwallet-Partner-Id','2');
    headers.append('X-Cwallet-Timestamp',X_Cwallet_Timestamp);
    headers.append('X-Partner-Access-Token',Access_Token);
    console.log(headers);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/pah/offers?brand_id='+brand_id,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);

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
    console.log(headers);
    return this.http.get('http://m.uat.cwallet.snapp.fr/api/v1/brands',{headers:headers})
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
