import { Component, OnInit } from '@angular/core';
import {ListShoppingService} from  '../../service/list-shopping.service'
import {MemberService} from "../../service/member.service";
import {Http} from "@angular/http";
import {BreadcrumbService} from "../../common/breadcrumb/breadcrumb.service";

@Component({
  selector: 'app-shopping-liste',
  templateUrl: './shopping-liste.component.html',
  styleUrls: ['./shopping-liste.component.scss']
})
export class ShoppingListeComponent implements OnInit {
  private shop:any[]=[];

  constructor(private http: Http,private memberService:MemberService ,private listShoppingService:ListShoppingService,private breadcrumbService: BreadcrumbService) {
    breadcrumbService.addFriendlyNameForRoute('/bon-plan/toutes-les-reductions', 'Bons plans');
    breadcrumbService.hideRoute('/bon-plan');


  }



  ngOnInit() {
    this.listShoppingService.initShoppingList().subscribe(
      (data: any) => {
        this.shop=data;
        console.log(this.shop);
      },
      error => {
        console.log(error);
      });

  }

}
