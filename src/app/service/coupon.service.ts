import { Injectable } from '@angular/core';
import {MemberService} from "./member.service";

@Injectable()
export class CouponService {

  public offers: any[] =[];
  public ids: any[] =[];
  public orderids: any[] =[];

  constructor(private memberService:MemberService) { }

  addOffer(offre:any,id:any) {
    let test=this.checkIds(id);
    if(!test){

      if(this.memberService.isLogged()) {
        if (localStorage.getItem('offerTab')) {
          if (localStorage.getItem('offerTab')) {
            this.offers = JSON.parse(localStorage.getItem('offerTab'));
            this.offers.push(offre);
            localStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids =JSON.parse(localStorage.getItem('idsTab'));
            this.ids.push(Number(id));
            localStorage.setItem('idsTab',JSON.stringify(this.ids));
          } else {
            this.offers.push(offre);
            window.localStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids.push(Number(id));
            window.localStorage.setItem('idsTab', JSON.stringify(this.ids));
          }
          let tabid = JSON.parse(window.localStorage.getItem('idsTab'));
          let member_id = this.memberService.getuserloggedTab('member_id');
          let member_token = this.memberService.getuserloggedTab('member_token');
          this.memberService.postCoupon(tabid, member_id, member_token).subscribe(
            (data: any) => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  localStorage.setItem('idsTab', JSON.stringify(ids2));
                  localStorage.setItem('offerTab', JSON.stringify(offers2));
                  localStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            },
            error => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  localStorage.setItem('idsTab', JSON.stringify(ids2));
                  localStorage.setItem('offerTab', JSON.stringify(offers2));
                  localStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            });
        }
        else if(sessionStorage.getItem('offerTab')){
          if (sessionStorage.getItem('offerTab')) {
            this.offers = JSON.parse(sessionStorage.getItem('offerTab'));
            this.offers.push(offre);
            sessionStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids =JSON.parse(sessionStorage.getItem('idsTab'));
            this.ids.push(Number(id));
            sessionStorage.setItem('idsTab',JSON.stringify(this.ids));
          } else {
            this.offers.push(offre);
            window.sessionStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids.push(Number(id));
            window.sessionStorage.setItem('idsTab', JSON.stringify(this.ids));
          }
          let tabid = JSON.parse(window.sessionStorage.getItem('idsTab'));
          let member_id = this.memberService.getuserloggedTab('member_id');
          let member_token = this.memberService.getuserloggedTab('member_token');
          this.memberService.postCoupon(tabid, member_id, member_token).subscribe(
            (data: any) => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  sessionStorage.setItem('idsTab', JSON.stringify(ids2));
                  sessionStorage.setItem('offerTab', JSON.stringify(offers2));
                  sessionStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            },
            error => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  sessionStorage.setItem('idsTab', JSON.stringify(ids2));
                  sessionStorage.setItem('offerTab', JSON.stringify(offers2));
                  sessionStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            });
        }
      }
      else{
        if (localStorage.getItem('offerTab')) {
          this.offers = JSON.parse(localStorage.getItem('offerTab'));
          this.offers.push(offre);
          localStorage.setItem('offerTab', JSON.stringify(this.offers));
          this.ids =JSON.parse(localStorage.getItem('idsTab'));
          this.ids.push(Number(id));
          localStorage.setItem('idsTab',JSON.stringify(this.ids));
        } else {
          this.offers.push(offre);
          window.localStorage.setItem('offerTab', JSON.stringify(this.offers));
          this.ids.push(Number(id));
          window.localStorage.setItem('idsTab', JSON.stringify(this.ids));
        }
      }
    }


  }
  addOfferPrintAll(offre:any,id:any) {
    let test=this.checkIds(id);
    if(!test){

      if(this.memberService.isLogged()) {
        if (localStorage.getItem('offerTab')) {
          if (localStorage.getItem('offerTab')) {
            this.offers = JSON.parse(localStorage.getItem('offerTab'));
            this.offers.push(offre);
            localStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids =JSON.parse(localStorage.getItem('idsTab'));
            this.ids.push(Number(id));
            localStorage.setItem('idsTab',JSON.stringify(this.ids));
          } else {
            this.offers.push(offre);
            window.localStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids.push(Number(id));
            window.localStorage.setItem('idsTab', JSON.stringify(this.ids));
          }
          let tabid = JSON.parse(window.localStorage.getItem('idsTab'));
          let member_id = this.memberService.getuserloggedTab('member_id');
          let member_token = this.memberService.getuserloggedTab('member_token');
          this.memberService.postCouponPrintAll(tabid, member_id, member_token).subscribe(
            (data: any) => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  localStorage.setItem('idsTab', JSON.stringify(ids2));
                  localStorage.setItem('offerTab', JSON.stringify(offers2));
                  localStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            },
            error => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  localStorage.setItem('idsTab', JSON.stringify(ids2));
                  localStorage.setItem('offerTab', JSON.stringify(offers2));
                  localStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            });
        }
        else if(sessionStorage.getItem('offerTab')){
          if (sessionStorage.getItem('offerTab')) {
            this.offers = JSON.parse(sessionStorage.getItem('offerTab'));
            this.offers.push(offre);
            sessionStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids =JSON.parse(sessionStorage.getItem('idsTab'));
            this.ids.push(Number(id));
            sessionStorage.setItem('idsTab',JSON.stringify(this.ids));
          } else {
            this.offers.push(offre);
            window.sessionStorage.setItem('offerTab', JSON.stringify(this.offers));
            this.ids.push(Number(id));
            window.sessionStorage.setItem('idsTab', JSON.stringify(this.ids));
          }
          let tabid = JSON.parse(window.sessionStorage.getItem('idsTab'));
          let member_id = this.memberService.getuserloggedTab('member_id');
          let member_token = this.memberService.getuserloggedTab('member_token');
          this.memberService.postCouponPrintAll(tabid, member_id, member_token).subscribe(
            (data: any) => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  sessionStorage.setItem('idsTab', JSON.stringify(ids2));
                  sessionStorage.setItem('offerTab', JSON.stringify(offers2));
                  sessionStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            },
            error => {
              this.memberService.getCoupon(member_id, member_token).subscribe(
                (data: any) => {
                  let ids2: any[] = [];
                  let offers2: any[] = [];
                  let orderids: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    ids2.push(data[i].offer_id);
                    orderids.push({"id": data[i].offer_id, "order": data[i].id});
                    offers2.push(data[i].offer);
                  }
                  sessionStorage.setItem('idsTab', JSON.stringify(ids2));
                  sessionStorage.setItem('offerTab', JSON.stringify(offers2));
                  sessionStorage.setItem('orderTab', JSON.stringify(orderids));
                },
                error => {
                  console.log(error);
                });

            });
        }
      }
      else{
        if (localStorage.getItem('offerTab')) {
          this.offers = JSON.parse(localStorage.getItem('offerTab'));
          this.offers.push(offre);
          localStorage.setItem('offerTab', JSON.stringify(this.offers));
          this.ids =JSON.parse(localStorage.getItem('idsTab'));
          this.ids.push(Number(id));
          localStorage.setItem('idsTab',JSON.stringify(this.ids));
        } else {
          this.offers.push(offre);
          window.localStorage.setItem('offerTab', JSON.stringify(this.offers));
          this.ids.push(Number(id));
          window.localStorage.setItem('idsTab', JSON.stringify(this.ids));
        }
      }
    }


  }
  removeOffer(id:any){

    if(this.memberService.isLogged()){
      if (localStorage.getItem('offerTab')) {
        if (localStorage.getItem('offerTab')) {
          this.offers = JSON.parse(localStorage.getItem('offerTab'));
          this.removeByAttr(this.offers,'id',Number(id));
          window.localStorage.setItem('offerTab',JSON.stringify(this.offers));
          this.ids =JSON.parse(localStorage.getItem('idsTab'));
          this.ids.splice(this.ids.indexOf(id),1);
          window.localStorage.setItem('idsTab',JSON.stringify(this.ids));
        }else{
          this.removeByAttr(this.offers,'id',Number(id));
          window.localStorage.setItem('offerTab',JSON.stringify(this.offers));
          this.ids.splice(this.ids.indexOf(id),1);
          window.localStorage.setItem('idsTab',JSON.stringify(this.ids));
        }
        let tabid = JSON.parse(window.localStorage.getItem('idsTab'));
        let member_id = this.memberService.getuserloggedTab('member_id');
        let member_token = this.memberService.getuserloggedTab('member_token');
        let order = 0;
        let tab = JSON.parse(window.localStorage.getItem('orderTab'));
        if (localStorage.getItem('orderTab')) {
          for (let i = 0; i < tab.length; i++) {
            if (tab[i].id == id) {
              order = tab[i].order;
            }
          }
        }
        this.memberService.deleteCoupon(order, member_id, member_token).subscribe(
          (data: any) => {
            this.orderids = JSON.parse(localStorage.getItem('orderTab'));
            this.removeByAttr(this.orderids, 'id', Number(id));
            window.localStorage.setItem('orderTab', JSON.stringify(this.orderids));
          },
          error => {

          });
      }
      else if(sessionStorage.getItem('offerTab')){
        if (sessionStorage.getItem('offerTab')) {
          this.offers = JSON.parse(sessionStorage.getItem('offerTab'));
          this.removeByAttr(this.offers,'id',Number(id));
          window.sessionStorage.setItem('offerTab',JSON.stringify(this.offers));
          this.ids =JSON.parse(sessionStorage.getItem('idsTab'));
          this.ids.splice(this.ids.indexOf(id),1);
          window.sessionStorage.setItem('idsTab',JSON.stringify(this.ids));
        }else{
          this.removeByAttr(this.offers,'id',Number(id));
          window.sessionStorage.setItem('offerTab',JSON.stringify(this.offers));
          this.ids.splice(this.ids.indexOf(id),1);
          window.sessionStorage.setItem('idsTab',JSON.stringify(this.ids));
        }
        let tabid = JSON.parse(window.sessionStorage.getItem('idsTab'));
        let member_id = this.memberService.getuserloggedTab('member_id');
        let member_token = this.memberService.getuserloggedTab('member_token');
        let order = 0;
        let tab = JSON.parse(window.sessionStorage.getItem('orderTab'));
        if (sessionStorage.getItem('orderTab')) {
          for (let i = 0; i < tab.length; i++) {
            if (tab[i].id == id) {
              order = tab[i].order;
            }
          }
        }
        this.memberService.deleteCoupon(order, member_id, member_token).subscribe(
          (data: any) => {
            this.orderids = JSON.parse(sessionStorage.getItem('orderTab'));
            this.removeByAttr(this.orderids, 'id', Number(id));
            window.sessionStorage.setItem('orderTab', JSON.stringify(this.orderids));
          },
          error => {

          });
      }

    }else{
      if (localStorage.getItem('offerTab')) {
        this.offers = JSON.parse(localStorage.getItem('offerTab'));
        this.removeByAttr(this.offers,'id',Number(id));
        window.localStorage.setItem('offerTab',JSON.stringify(this.offers));
        this.ids =JSON.parse(localStorage.getItem('idsTab'));
        this.ids.splice(this.ids.indexOf(id),1);
        window.localStorage.setItem('idsTab',JSON.stringify(this.ids));
      }else{
        this.removeByAttr(this.offers,'id',Number(id));
        window.localStorage.setItem('offerTab',JSON.stringify(this.offers));
        this.ids.splice(this.ids.indexOf(id),1);
        window.localStorage.setItem('idsTab',JSON.stringify(this.ids));
      }
    }

  }
  getCouponPrices(){
    let total=0;

    if(localStorage.getItem('offerTab'))
    {
      let tab=JSON.parse(window.localStorage.getItem('offerTab'));
    for(let i=0;i<tab.length;i++){
      total +=  parseFloat(tab[i].discount_value);
    }
    }
    else if(sessionStorage.getItem('offerTab')){
      let tab=JSON.parse(window.sessionStorage.getItem('offerTab'));
      for(let i=0;i<tab.length;i++){
        total +=  parseFloat(tab[i].discount_value);
      }
    }
    return total;
  }
  getpricesTable(){
  return this.offers;
  }
 checkIds(id:any){

   if(localStorage.getItem('idsTab')) {
     let tabid=JSON.parse(window.localStorage.getItem('idsTab'));
     if (tabid.indexOf(Number(id)) == -1) {
       return false;
     }
     return true;
   }
   else if(sessionStorage.getItem('offerTab')){
     let tabid=JSON.parse(window.sessionStorage.getItem('idsTab'));
     if (tabid.indexOf(Number(id)) == -1) {
       return false;
     }
     return true;
   }
   return false;
 }
  getCouponCount(){

    if(localStorage.getItem('offerTab')) {
      let tab=JSON.parse(window.localStorage.getItem('offerTab'));
      return tab.length;
    }
    else if(sessionStorage.getItem('offerTab')){
      let tab=JSON.parse(window.sessionStorage.getItem('offerTab'));
      return tab.length;
    }
    return 0;
  }
  removeByAttr (arr, attr, value){
  var i = arr.length;
  console.log(arr,attr,value,i);
  while(i--){
    if( arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value ) ){

      arr.splice(i,1);

    }
  }
  return arr;
}
}
