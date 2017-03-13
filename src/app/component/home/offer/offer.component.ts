import { Component, OnInit,OnDestroy } from '@angular/core';
import {HomeService} from "../../../service/home.service";
import {OfferService} from "../../../service/offer.service";
import {Router, ActivatedRoute , NavigationEnd} from "@angular/router";
import { Subscription } from "rxjs/Rx";
import {SeoService} from '../../../common/seo.service';
import {PopUpService} from '../../../service/pop-up.service';
import {MemberService} from '../../../service/member.service';
import {CouponService} from "../../../service/coupon.service";
import {BreadcrumbService} from "../../../common/breadcrumb/breadcrumb.service";
// import {isDefined} from "ng2-translate/src/util";


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit,OnDestroy {
  private offers;
  private offersCatalina:any[]=[];
  private offersShopping:any[]=[];
  private mixedOffers:any[]=[];
  private i=0;
  private rayon:string='RAYON';
  private homePageTitle='OFFRES';
  private total=0;
  private emptyCategorie:Boolean=false;
  private subscription: Subscription;
  private filter:string;
  private adURL:string;

  public category:any[] = [];
  public brand:any[] = [];
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public offerType:any[] = [{name:'Toutes les offres!', id:1}, {name:'Bons plans', id:2}, {name:'Courses', id:3}];


  constructor(private couponService:CouponService,private memberService:MemberService,private popUpService:PopUpService,private homeService : HomeService , private offerService : OfferService,private router: Router, private route: ActivatedRoute ,private seoService:SeoService,private breadcrumbService: BreadcrumbService) { }

  public addOffer(offer:any,id:any){
    this.couponService.addOfferPrintAll(offer,id);

  }
  public openPopUp(){
    for(let i=0;i<this.mixedOffers.length;i++){
      if(this.mixedOffers[i].from==1){
        this.addOffer(this.mixedOffers[i],this.mixedOffers[i].id);
      }

    }
    if(this.memberService.isLogged()){
      this.router.navigate(['/coupon-reduction/impression']);
    }else{
      this.popUpService.popUpState=true;
    }



  }




  public homeInit(){
    this.homeService.initHomePage().subscribe(
      (data: any) => {
        this.adURL=data.archPub.picture_url;
        this.offersCatalina=[];
        this.offersShopping=[];
        this.offers=data.offers;
        for (let item of this.offers)
        {
          if(item.from=="1" ){
            this.offersCatalina.push(item);
          }else{
            this.offersShopping.push(item);
          }
          this.mixedOffers=data.offers;
        }
        for(let i=0;i<this.offersCatalina.length;i++){
          this.total +=  parseFloat(this.offersCatalina[i].discount_value);

        }
        this.total.toFixed(2).replace(".",",");


      },
      error => {
        console.log(error);
      });

  }

  public courseInit(){
    this.homeService.initHomePage().subscribe(
      (data: any) => {
        this.adURL=data.archPub.picture_url;

        this.offers=data.offers;
        for (let item of this.offers)
        {
          if(item.from=="1" ){
            this.mixedOffers.push(item);
          }
        }




      },
      error => {
        console.log(error);
      });
  }

  selectType(x:any){
    this.i=0;
    this.rayon='RAYON';
    if(x==1){
      this.total=0;
      this.homeInit();
    }else {
      if (x == 3) {
        this.mixedOffers=[];
        this.courseInit();

      }else {
        if(x==2){
          this.router.navigate(['/bon-plan/toutes-les-reductions']);

        }
      }
    }

  }

  goToBrand(x:any){
    this.router.navigate(['/coupons',x]);
  }

  filterByCategory(x:any , y:any){
    this.homeService.filterOfferByCategory(x).subscribe(
      (data: any) => {
        this.rayon=y;
        this.mixedOffers=data.items;
        this.offersShopping=[];
        if(this.offersCatalina.length==0){
          this.emptyCategorie=true;
        }else{
          this.emptyCategorie=false;
        }

        this.total=0;
        for(let i=0;i<this.offersCatalina.length;i++){
          this.total +=  parseFloat(this.offersCatalina[i].discount_value);
        }
        // this.total.toFixed(2).replace(".",",");



      },
      error => {
        console.log(error);
      });

  }

  public toggled(open:boolean):void {}

  afficher(){
    let elmnt = document.querySelector('.sss');
    // let x = elmnt.scrollLeft;
    let y = elmnt.scrollTop;
    if(Math.floor(y/400)>this.i ){
      this.i++;


      this.offerService.initOffer(1+this.i).subscribe(
        (data: any) => {
          // this.mixedOffers.push(data);
          for (let item of data)
          {
            this.mixedOffers.push(item);

            if(item.from=="1" ){
              this.offersCatalina.push(item);
            }else{
              this.offersShopping.push(item);
            }
          }
          this.total=0;
          for(let i=0;i<this.offersCatalina.length;i++){
            this.total +=  parseFloat(this.offersCatalina[i].discount_value);
          }
          this.total.toFixed(2).replace(".",",");
        },
        error => {
          console.log(error);
        });
    }
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }



  //life cycles
  ngOnInit() {
    this.homeInit();


    if(this.memberService.isLogged()){
      let member_id=this.memberService.getuserloggedTab('member_id');
      this.homeService.getAllCategories(member_id).subscribe(
        (data: any) => {
          let filer = this.filter;
          this.category=data;
          let obj = this.category.filter(function ( obj ) {
            return obj.name === filer;
          })[0];
          if( obj ){
            this.filterByCategory(obj.id,obj.name);

            this.homePageTitle='COUPONS '+obj.name;
            this.rayon=obj.name;

          }else{

          }

        },
        error => {
          console.log(error);
        });
     }else{
      this.homeService.getAllCategories().subscribe(
        (data: any) => {
          let filer = this.filter;
          this.category=data;
          let obj = this.category.filter(function ( obj ) {
            return obj.name === filer;
          })[0];
          if( obj ){
            this.filterByCategory(obj.id,obj.name);

            this.homePageTitle='COUPONS '+obj.name;
            this.rayon=obj.name;

          }else{

          }

        },
        error => {
          console.log(error);
        });
    }







    this.homeService.getAllBrands().subscribe(
      (data: any) => {
        this.brand=data;
      },
      error => {
        console.log(error);
      });





    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.filter= params['category'];



        if(this.memberService.isLogged()) {
          let member_id = this.memberService.getuserloggedTab('member_id');
          this.homeService.getAllCategories(member_id).subscribe(
            (data: any) => {

              let filer = this.filter.replace(/-/g," ");
              this.category = data;
              let obj = this.category.filter(function (obj) {
                return obj.name === filer;
              })[0];
              if (obj) {
                this.i = 20;

                this.filterByCategory(obj.id, obj.name);
                this.homePageTitle = 'COUPONS ' + obj.name;
                this.rayon = obj.name;


                this.seoService.setTitle('Coupons alimentaires ' + obj.name + ', bons de réduction à imprimer | TF1 Conso');
                this.seoService.setMetaDescription("Économisez jusqu'à " + this.total + " euros sur vos courses {Nom Catégorie} en profitant de nos " + this.offersCatalina.length + " coupons de réductions alimentaires. Sélectionnez les coupons et imprimer les sur TF1 Conso !");
                this.seoService.setMetaRobots('Index, Follow');
                this.seoService.setCanonical('https://www.tf1conso.fr/bon-de-reduction/reduction/' + obj.name);
                this.breadcrumbService.hideRoute('/bon-de-reduction/reduction');
                this.breadcrumbService.hideRoute('/bon-de-reduction');


              } else {
                //go to home
                this.router.navigate(['/']);

              }

            },
            error => {
              console.log(error);
            });
        }
        else{
          this.homeService.getAllCategories().subscribe(
            (data: any) => {
              let filer = this.filter.replace(/-/g," ");
              this.category = data;
              let obj = this.category.filter(function (obj) {
                return obj.name === filer;
              })[0];
              if (obj) {
                this.i = 20;

                this.filterByCategory(obj.id, obj.name);
                this.homePageTitle = 'COUPONS ' + obj.name;
                this.rayon = obj.name;


                this.seoService.setTitle('Coupons alimentaires ' + obj.name + ', bons de réduction à imprimer | TF1 Conso');
                this.seoService.setMetaDescription("Économisez jusqu'à " + this.total + " euros sur vos courses {Nom Catégorie} en profitant de nos " + this.offersCatalina.length + " coupons de réductions alimentaires. Sélectionnez les coupons et imprimer les sur TF1 Conso !");
                this.seoService.setMetaRobots('Index, Follow');
                this.seoService.setCanonical('https://www.tf1conso.fr/bon-de-reduction/reduction/' + obj.name);
                this.breadcrumbService.hideRoute('/bon-de-reduction/reduction');
                this.breadcrumbService.hideRoute('/bon-de-reduction');


              } else {
                //go to home
                this.router.navigate(['/']);

              }

            },
            error => {
              console.log(error);
            });
        }
      });





  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
   navigateToFilter(name:any){
    let nameCat=name.trim().replace(/\s\s+/g, ' ').replace(/ /g,"-");
     this.router.navigate(['/bon-de-reduction/reduction/',nameCat]);
   }
}
