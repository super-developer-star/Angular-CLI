import { Component, OnInit,OnChanges,Input } from '@angular/core';
import {CouponService} from "../../../service/coupon.service";
import {Brand} from "../../../model/brand";
import {MemberService} from "../../../service/member.service";

@Component({
  selector: 'app-coupon-counter',
  templateUrl: './coupon-counter.component.html',
  styleUrls: ['./coupon-counter.component.css']
})
export class CouponCounterComponent implements OnInit {


  constructor(private couponService:CouponService,private memberService:MemberService) {

  }


  ngOnInit() {
  }

  getTable(){
    console.log(this.couponService.getpricesTable());
  }
  getTotalPrice(){
    return this.couponService.getCouponPrices();
  }
  getTotalNumber(){
    let number= this.couponService.getCouponCount();
    if(number <= 1){
      return number+' coupon';
    }
    else{
      return number+' coupons';
    }
  }


}
