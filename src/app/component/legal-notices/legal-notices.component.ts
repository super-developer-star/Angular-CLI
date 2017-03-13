import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../common/seo.service';


@Component({
  selector: 'app-legal-notices',
  templateUrl: './legal-notices.component.html',
  styleUrls: ['./legal-notices.component.css']
})
export class LegalNoticesComponent implements OnInit {

  constructor(seoService: SeoService) {
    seoService.setTitle("Mentions légales - TF1 Conso");
    seoService.setMetaDescription("Mentions légales - TF1 Conso");
    seoService.setMetaRobots("noindex,nofollow");
    seoService.setCanonical("https://www.tf1conso.fr/mentions-legales");

  }

  ngOnInit() {
  }

}
