import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../common/seo.service';
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";
import {TF1Constant} from '../../constant/constant';

@Component({
  selector: 'app-printed',
  templateUrl: './printed.component.html',
  styleUrls: ['./printed.component.css']
})
export class PrintedComponent implements OnInit {
   private googleStore:string=TF1Constant.googleStore;
   private appleStore:string=TF1Constant.appleStore;
  constructor(private breadcrumbService: BreadcrumbService,seoService: SeoService) {
    seoService.setTitle("Vos coupons sont imprimés");
    seoService.setMetaDescription("Vos coupons sont imprimés");
    seoService.setMetaRobots("noindex,nofollow");
    seoService.setCanonical('https://www.tf1conso.fr/coupon-reduction/imprimession/imprime');
    breadcrumbService.hideRoute('/coupon-reduction');
    breadcrumbService.hideRoute('/coupon-reduction/impression');
    breadcrumbService.addFriendlyNameForRoute('/coupon-reduction/impression/imprime', 'Imprimer');
  }

  ngOnInit() {
  }

}
