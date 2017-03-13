import { Component, OnInit } from '@angular/core';
import {TF1Constant} from '../../constant/constant';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
   private linkPolitique:string=TF1Constant.linkPolitique;
   private linkCookies:string=TF1Constant.linkCookies;
  constructor() { }

  ngOnInit() {
  }

}
