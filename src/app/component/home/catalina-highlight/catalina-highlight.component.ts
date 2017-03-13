import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HomeService} from "../../../service/home.service";




@Component({
  selector: 'app-catalina-highlight',
  templateUrl: './catalina-highlight.component.html',
  styleUrls: ['./catalina-highlight.component.css']

})
export class CatalinaHighlightComponent implements OnInit , AfterViewInit {
  private items:string[];


  constructor(private homeService:HomeService){
  }



  ngOnInit() {
    this.homeService.initHomePage().subscribe(
      (data: any) => {
        this.items=data.highlights;

      },
      error => {
        console.log(error);
      });
  }

  ngAfterViewInit(){

    setTimeout(()=>{(<any>$('.carousel')).carousel();},1000);


  }




}
