import { Component, OnInit , AfterViewInit } from '@angular/core';
import {SeoService} from '../../common/seo.service';

import {CouponService} from "../../service/coupon.service";
import {HomeService} from "../../service/home.service";
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewInit {

  constructor(seoService: SeoService , private homeService: HomeService,private breadcrumbService: BreadcrumbService) {
    seoService.setTitle('Coupon réduction à imprimer, bons plans et bons de réduction | TF1 Conso');
    seoService.setMetaDescription('TF1 Conso, site de bons plans et réductions de vos enseignes préférées, disponibles près de chez vous. Economisez sur vos achat en profitant de nos bons de réduction.');
    seoService.setMetaRobots('Index, Follow');
    seoService.setCanonical('https://www.tf1conso.fr');
    breadcrumbService.hideRoute('/bon-de-reduction/reduction');
    breadcrumbService.hideRoute('/bon-de-reduction');


  }

  ngOnInit() {


  }

  ngAfterViewInit(){











  }



}
