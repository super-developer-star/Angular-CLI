import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../common/seo.service';
import {PrintService} from '../../service/print.service';
import {CouponService} from "../../service/coupon.service";
import {Router, ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";
import {MemberService} from "../../service/member.service";
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService,seoService: SeoService ,private router: Router, private route: ActivatedRoute,private printService:PrintService,private couponService:CouponService,private memberService:MemberService) {
    seoService.setTitle("Impression de vos coupons de réduction");
    seoService.setMetaDescription("Impression de vos coupons de réduction");
    seoService.setMetaRobots("noindex,nofollow");
    seoService.setCanonical('https://www.tf1conso.fr/coupon-reduction/impression');
    breadcrumbService.hideRoute('/coupon-reduction');
    breadcrumbService.addFriendlyNameForRoute('/coupon-reduction/impression', 'Impression');
  }
  private errorMessage: string;
  private linkMessage: string="";
  ngOnInit() {

  }
  getTotalPrice(){
    return this.couponService.getCouponPrices().toFixed(2).replace(".",",");
  }
  getTotalNumber(){
    let number= this.couponService.getCouponCount();
    if(number <= 1){
      return number+' coupon selectionné';
    }
    else{
      return number+' coupons selectionnés';
    }
  }
  print(){
    getDOM().addClass(getDOM().query("body"), 'preventClick');
    getDOM().removeClass(getDOM().query("#load"), 'hided');
    let member_id=this.memberService.getuserloggedTab('member_id');
    let member_token=this.memberService.getuserloggedTab('member_token');
    let postcode=this.memberService.getuserloggedTab('postcode');
    let street=this.memberService.getuserloggedTab('street');
    let street_bis=this.memberService.getuserloggedTab('street_bis');
    let city=this.memberService.getuserloggedTab('city');
    let country=this.memberService.getuserloggedTab('country');

    if((street!="")&&(city!="")&&(postcode!="")){
      if(sessionStorage.getItem('idsTab')) {
        if(sessionStorage.getItem('idsTab').length>2)
        {
          var printWindow = window.open( '', 'Print', 'left=200, top=100, width=950, height=500, toolbar=0, resizable=0');
        }
      }
      else if(localStorage.getItem('idsTab')) {
        if(localStorage.getItem('idsTab').length>2)
        {
          var printWindow = window.open( '', 'Print', 'left=200, top=100, width=950, height=500, toolbar=0, resizable=0');
        }
      }
    }
    this.memberService.getCoupon(member_id,member_token).subscribe(
      (data: any) => {

        if(data.length!=0){
          this.printService.print().subscribe(
            (data: any) => {
              if(localStorage.getItem('idsTab'))
              {
                let blank: any[] =[];
                localStorage.removeItem('idsTab');
                localStorage.removeItem('offerTab');
                localStorage.removeItem('orderTab');
                localStorage.setItem('idsTab',JSON.stringify(blank));
                localStorage.setItem('offerTab',JSON.stringify(blank));
                localStorage.setItem('orderTab',JSON.stringify(blank));
              }
              if(sessionStorage.getItem('idsTab'))
              {
                let blank2: any[] =[];
                sessionStorage.removeItem('idsTab');
                sessionStorage.removeItem('offerTab');
                sessionStorage.removeItem('orderTab');
                sessionStorage.setItem('idsTab',JSON.stringify(blank2));
                sessionStorage.setItem('offerTab',JSON.stringify(blank2));
                sessionStorage.setItem('orderTab',JSON.stringify(blank2));
              }
              this.couponService.offers=[];
              this.couponService.ids=[];
              this.couponService.orderids=[];
              this.linkMessage=data.printable_url;
              let link=data.printable_url;
              getDOM().removeClass(getDOM().query("body"), 'preventClick');
              getDOM().addClass(getDOM().query("#load"), 'hided');
              printWindow.location.href=link;
              this.router.navigate(['/coupon-reduction/impression/imprime']);
            },
            error => {
              getDOM().removeClass(getDOM().query("body"), 'preventClick');
              getDOM().addClass(getDOM().query("#load"), 'hided');
              console.log(error);
              if(error=422){
                this.errorMessage= 'Pour imprimer vos coupons, veuillez renseigner vos informations personnelles.';
              }
              else{
                this.errorMessage = 'Une erreur est survenue';
              }
              printWindow.close();
            });
        }
        else{
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.errorMessage= 'Merci de sélectionner des coupons pour les imprimer.';
        }

      },
      error => {
        console.log(error);
      });




  }

}
