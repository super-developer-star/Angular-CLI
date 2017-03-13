import { Component, OnInit,OnChanges, OnDestroy } from '@angular/core';
import {CouponService} from "../../service/coupon.service";
import {SeoService} from '../../common/seo.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import {OfferService} from "../../service/offer.service";
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";
@Component({
  selector: 'app-catalina-offer',
  templateUrl: './catalina-offer.component.html',
  styleUrls: ['./catalina-offer.component.css']
})
export class CatalinaOfferComponent implements OnInit,OnChanges,OnDestroy {
  private clicked:boolean=true;
  constructor(private couponService:CouponService, private seoService: SeoService,private router: Router, private route: ActivatedRoute,private offerService: OfferService,private breadcrumbService: BreadcrumbService ) {
    seoService.setMetaRobots('Index, Follow');
    seoService.setCanonical('https://www.tf1conso.fr/coupon-{nom-marque}-{ID}');
    breadcrumbService.hideRouteRegex('/[0-9]');
    breadcrumbService.hideRoute('/coupon');
  }
  private offer_id:number;
  private subscription: Subscription;
  private branTab:any[]=[];
  private offerTab:any[]=[];
  private relatedTab:any[]=[];

  private brand:any;
  private picture_url:any;
  private discount_value:any;
  private subtitle:any;
  private title:any;
  ngOnChanges(){

  }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.offer_id = params['id'];
        this.offerService.getOfferDetail(this.offer_id).subscribe(
          (data: any) => {
             this.offerTab=data;
            let brand_id=data.brand_id;
            this.picture_url=data.picture_url;
            this.discount_value=data.discount_value;
            this.subtitle=data.subtitle;
            this.title=data.title;
            this.brand=data.brand.name;

                this.seoService.setTitle("Bon de réduction "+this.brand+" d'une valeur de "+this.discount_value+" € à imprimer - TF1 Conso");
                this.seoService.setMetaDescription("Economisez sur vos courses en profitant de d'une réduction d'"+this.discount_value+" € sur votre produit "+this.title+". Coupon de réduction à imprimer et à présenter en magasin, offert par TF1 Conso.");

          },
          error => {
            console.log(error);
          });
        this.offerService.getRelatedOffer(this.offer_id).subscribe(
          (data: any) => {

            this.relatedTab=data.items;
          },
          error => {
            console.log(error);
          });

      }
    );



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
