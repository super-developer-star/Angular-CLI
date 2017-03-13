import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../../common/seo.service';


@Component({
  selector: 'app-terms-and-conditions-catalina',
  templateUrl: './terms-and-conditions-catalina.component.html',
  styleUrls: ['./terms-and-conditions-catalina.component.scss']
})
export class TermsAndConditionsCatalinaComponent implements OnInit {

  constructor(seoService: SeoService) {
    seoService.setTitle("Conditions générales d'utilisation - TF1 Conso");
    seoService.setMetaDescription("Conditions générales d'utilisation - TF1 Conso");
    seoService.setMetaRobots("noindex,nofollow");
    seoService.setCanonical('https://www.tf1conso.fr/cgu');

  }

  ngOnInit() {
  }

}
