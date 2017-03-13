import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {OfferService} from "../../service/offer.service";
import {CouponService} from "../../service/coupon.service";
@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() offerInfo:any;
   private branTab:any[]=[];

  constructor(private couponService:CouponService,private router: Router, private route: ActivatedRoute, private offerService: OfferService) { }

  ngOnInit() {

  }
  detailCatalina(id:number,title:string){
    title=title.trim().replace(/\s\s+/g, ' ').replace(/ /g,"-");
        this.router.navigate(['/coupon',title, id]);

  }
  addOffer(offer:any,id:any){
    this.couponService.addOffer(offer,id);

  }
  removeOffer(id:any){
    this.couponService.removeOffer(id);

  }
  checkIds(id:any){
    return this.couponService.checkIds(id);
  }
}
