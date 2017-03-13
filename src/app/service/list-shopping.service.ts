import { Injectable } from '@angular/core';
import {TF1Constant} from '../constant/constant';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import {MemberService} from "./member.service";
import {Observable} from "rxjs";
import 'rxjs/Rx';



@Injectable()
export class ListShoppingService {




  constructor(private http: Http,private memberService:MemberService) { }




  initShoppingList(){
    if(this.memberService.isLogged()){
      let member_token =this.memberService.getuserloggedTab('member_token');
      let member_id=this.memberService.getuserloggedTab('member_id');
      let body = {"from":2,"member_token":member_token,"member_id":member_id};

      const headers= new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/offers/getOffersShopping',body,{headers:headers})
        .map((data :Response)=>data.json())
        .catch(this.handleError);
    }else{
      let body = {"from":2};
      const headers= new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(TF1Constant.shoppingBaseUrl+'/api/public/offers/getOffersShopping',body,{headers:headers})
        .map((data :Response)=>data.json())
        .catch(this.handleError);

    }

  }


  private handleError (error: any){
    console.log(error);
    return Observable.throw(error.json());
  }

}
