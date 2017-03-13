import { Component, OnInit,OnDestroy } from '@angular/core';
import {SeoService} from '../../common/seo.service';
import { Router, ActivatedRoute } from "@angular/router";
import {BrandService} from '../../service/brand.service'
import { Subscription } from "rxjs/Rx";
import {CouponService} from "../../service/coupon.service";
import {OfferService} from "../../service/offer.service";
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";
import {MemberService} from "../../service/member.service";
import {PopUpService} from "../../service/pop-up.service";


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit,OnDestroy {
  private subscription: Subscription;
  private brand:string;
  private brand_id:number;
  private branTab:any[]=[];
  private sameBrand:any[]=[];
  private brandInfo:any;
  private total=0;
  private brandURLImg:string='';
  private brandDiscription:string='';

  constructor(private breadcrumbService: BreadcrumbService,private offerService:OfferService,private couponService :CouponService ,seoService: SeoService,private router: Router, private route: ActivatedRoute , private brandService:BrandService,private memberService:MemberService,private popUpService:PopUpService) {
    seoService.setTitle('Coupons de réduction {Marque} à imprimer | TF1 Conso');
    seoService.setMetaDescription("Économisez jusqu'à {XX} euros sur les produits {Nom Marque} en profitant de nos {XX} coupons de réductions alimentaires. Sélectionnez les coupons et imprimer les sur TF1 Conso !");
    seoService.setMetaRobots('Index, Follow');
    seoService.setCanonical('https://www.tf1conso.fr/coupons-{nom-marque}');
    breadcrumbService.hideRoute('/coupons');
  }




  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.brand= params['nom'];
        let brandName=this.brand;
        this.brandService.getAllBrands().subscribe(
          (data: any) => {
            this.branTab.push(data);
            let obj = this.branTab[0].filter(function ( obj ) {
              return obj.name === brandName;
            })[0];
            this.brand_id=obj.id;
            this.brandService.getSameBrand(this.brand_id).subscribe((data: any) => {
              this.sameBrand=data.items;
              for(let i=0;i<this.sameBrand.length;i++){
                this.total +=  parseFloat(this.sameBrand[i].discount_value);

              }
              this.total.toFixed(2).replace(".",",");
            });
            this.brandService.getBrandInfo(this.brand_id).subscribe((data: any) => {
              this.brandInfo=data;
              if(data.length>0){
                console.log(data);
                this.brandURLImg=data.picture_url;
                this.brandDiscription='';
              }

            });


          },
          error => {
            console.log(error);
          });

      });


  }
  public openPopUp(){
    console.log(this.sameBrand);
    for(let i=0;i<this.sameBrand.length;i++){
        this.couponService.addOfferPrintAll(this.sameBrand[i],this.sameBrand[i].id);

    }
    if(this.memberService.isLogged()){
      this.router.navigate(['/coupon-reduction/impression']);
    }else{
      this.popUpService.popUpState=true;
    }



  }


  getTotalNumber(){
    let number= this.sameBrand.length;
    if(number <= 1){
      return number+' coupon';
    }
    else{
      return number+' coupons';
    }
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
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
