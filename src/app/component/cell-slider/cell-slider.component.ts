import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cell-slider',
  templateUrl: './cell-slider.component.html',
  styleUrls: ['./cell-slider.component.scss']
})
export class CellSliderComponent implements OnInit {
  @Input() offerInfo:any;
  private hoverDisplay='none';
  private hover:Boolean=false;
  private titleOffer:string;
  private titleOffer2:string;
  private store:string;
  private typeOffer:string;
  private description:string;










  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.description=this.offerInfo.description.replace(/<[^>]*>/g, "");
    this.titleOffer=this.offerInfo.title;
    this.store=this.offerInfo.first_store.trim().replace(/\s\s+/g, ' ').replace(/ /g,"-");


    this.titleOffer=this.offerInfo.title.trim().replace(/\s\s+/g, ' ').replace(/ /g,"-");
    switch(this.offerInfo.type) {
      case "1":
        this.typeOffer="bon-plan";
        break;
      case "2":
        this.typeOffer="partenaire";
        break;
      case "3":
        this.typeOffer="coupon";
        break;
    }
  }
  navigateToDetail(id:any){
    this.router.navigate([this.typeOffer,'reduction',this.store,this.titleOffer,id ]);

  }

}
