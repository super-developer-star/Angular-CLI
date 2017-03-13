import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {TF1Constant} from "../constant/constant";

@Injectable()
export class OfferShoppingService {

  constructor(private http: Http) { }


  getOffershopping(offer:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(TF1Constant.shoppingBaseUrl+'/api/public/offers/getOfferDetails?offer_id='+offer.id+'&lat='+offer.lat+'&lng='+offer.lng+'&from='+offer.from+'',options)
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  postOfferToBasket(offer_id:any,member_id:any){
    let json = {"offer_id":offer_id,"member_id":member_id};
    let body=json;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/basket/addItem/',body,{headers:headers})
      .map((data :Response)=>data.json())
      .catch(this.handleError);
  }
  private handleError (error: any){
    console.log(error);
    return Observable.throw(error.json());
  }
}
