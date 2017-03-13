import {Component, NgZone,OnDestroy, OnInit, ViewChild, ElementRef,Pipe, PipeTransform} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {OfferShoppingService} from "../../service/offer-shopping.service";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import {SeoService} from '../../common/seo.service';
import { DomSanitizer } from '@angular/platform-browser';
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";
import {TF1Constant} from '../../constant/constant';
import {MemberService} from "../../service/member.service";


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-shopping-offer',
  templateUrl: './shopping-offer.component.html',
  styleUrls: ['./shopping-offer.component.css'],

})
export class ShoppingOfferComponent implements OnInit,OnDestroy {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public measurement: any;
  public latlngBounds: any;
  private subscription: Subscription;

  @ViewChild("search")
  /*1 ==> Bon plan
   2 ==> Partenaire
   3 ==> Reduction*/
  public searchElementRef: ElementRef;
  private condition:any;
  private nb_stores:any;
  private brand:any;
  private mgasUrl:any;
  private titleUrl:any;
  private picture_url:any;
  private picture_url_logo:any;
  private title:any;
  private expiration_date:any;
  private expiration_date2:any;
  private type:any;
  private store_street:any;
  private store_lat:any;
  private store_lng:any;
  private store_name:any;
  private store_distance:any;
  private store_tel:any;
  private store_postal_code:any;
  private store_city:any;
  private subtitle:any;
  private offer_id:any;
  private coupon_type:any;
  private coupon_code:any;
  private website:any;
  private coupon_pdf:any;
  private coupon_exclusif_code:any;
  private coupon_exclusif_random=Math.random().toString(36).substr(2, 6);
  private googleStoreShop:string=TF1Constant.googleStore;
  private appleStoreShop:string=TF1Constant.appleStore;
  constructor(private memberService:MemberService,private breadcrumbService: BreadcrumbService,private offreShoopingService:OfferShoppingService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private router: Router, private route: ActivatedRoute ,private seoService: SeoService) {
    seoService.setTitle("Promotion {Nom Magasin}: {Titre de la page} | TF1 Conso");
    seoService.setMetaDescription("{150 premiers caractères du détail offre} - Couper au mot");
    seoService.setMetaRobots('Index, Follow');
    seoService.setCanonical('https://www.tf1conso.fr/bon-plan/reductions-{nom-magasin}/{titre-de-la-page}.html');
    breadcrumbService.hideRouteRegex('/[0-9]');
    breadcrumbService.hideRoute('/bon-plan/reduction');
    breadcrumbService.hideRoute('/partenaire/reduction');
    breadcrumbService.hideRoute('/coupon/reduction');
    breadcrumbService.hideRoute('/bon-plan');
    breadcrumbService.hideRoute('/partenaire');
    breadcrumbService.hideRoute('/coupon');

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.offer_id = params['id'];
        this.mgasUrl = params['store'];
        this.titleUrl = params['title'];
      }
    );
    this.seoService.setCanonical('https://www.tf1conso.fr/bon-plan/reductions-'+this.mgasUrl+'/'+this.titleUrl+'.html');
    this.seoService.setTitle("Promotion "+this.mgasUrl.replace(/-/g," ")+" : "+this.titleUrl.replace(/-/g," ")+" | TF1 Conso");
    this. breadcrumbService.hideRoute('/coupon/reduction/'+this.mgasUrl);
    this. breadcrumbService.hideRoute('/partenaire/reduction/'+this.mgasUrl);
    this. breadcrumbService.hideRoute('/bon-plan/reduction/'+this.mgasUrl);
    //set google maps defaults
    this.latitude =TF1Constant.DefaultLat;
    this.longitude =TF1Constant.DefaultLong;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

  this.getOffer(this.offer_id,this.latitude,this.longitude,2);
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {


      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: "FR"}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getOffer(this.offer_id,this.latitude,this.longitude,2);

        });
      });
    });

  }
  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getOffer(this.offer_id,this.latitude,this.longitude,2);
      });
    }
  }
  private getOffer(id:number,lat:number,lng:number,from:number){
    let offer={id:id,lat:lat,lng:lng,from:from};
    this.offreShoopingService.getOffershopping(offer).subscribe(
      (data: any) => {
        console.clear();
         console.log(data);
        this.condition=data.condition;
        this.nb_stores=data.nb_stores;
        this.brand=data.brand;
        this.picture_url=data.picture_url;
        this.picture_url_logo=data.picture_url_logo;
        this.title=data.title;
        this.type=data.type;
        this.coupon_pdf=data.coupon_pdf;
        this.store_street=data.store_street;
        this.store_lat = Number(data.store_lat);
        this.store_lng = Number(data.store_lng);
        this.store_name = data.store_name;
        this.store_distance = data.store_distance;

        if(this.store_distance>=1000){
          this.store_distance=parseFloat((this.store_distance/1000).toFixed(1))+" Km";
        }
        else{
          this.store_distance=this.store_distance+" m"
        }
        this.store_tel = data.store_tel;
        this.store_postal_code = data.store_postal_code;
        this.store_city = data.store_city;
        this.subtitle = data.subtitle;
        this.coupon_type = data.coupon_type;
        this.coupon_code = data.coupon_code;
        this.website = data.website;
        let coupon_exclusif = data.coupon_exclusif_code;
        this.coupon_exclusif_code=coupon_exclusif+this.coupon_exclusif_random;
        var now = moment(new Date()); //todays date
        var end = moment(data.expiration_date); // another date
        var duration = moment.duration(end.diff(now));
        this.expiration_date = duration.asDays()+1|0;
        let date=data.expiration_date;
        let day=date.substr(date.length - 2);
        let month=date.substring(5, 7);
        let year=date.substring(0, 4);
        this.expiration_date2=day+"/"+month+"/"+year;
        let x=(Number(this.store_distance/1000)|0);
        this.zoom=15-x;
        if(x>=15)
        {
          this.zoom=4;
        }



      },
      error => {
        console.log(error);
      });
  }

  getJours(){
    let number= this.expiration_date;
    if(number == 1){
      return 'dans '+number+' jour';
    }else if(number==0){
      return 'aujourd\'hui';
    }
    else{
      return 'dans '+number+' jours';
    }
  }


  getMagasin(){
    let number= this.nb_stores;
    if(number <= 1){
      return number+' magasin participant';
    }
    else{
      return number+' magasins participants';
    }
  }
    postOfferToBasket(){
      if(this.memberService.isLogged()){
        let member_id=this.memberService.getuserloggedTab('member_id');
        this.offreShoopingService.postOfferToBasket(this.offer_id,member_id).subscribe(
          (data: any) => {

          },
          error => {

          });
      }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
