import { Component, OnInit ,AfterViewInit} from '@angular/core';
import {HomeService} from "../../../service/home.service";
import {SliderComponent} from "../../slider/slider.component";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent extends SliderComponent implements OnInit , AfterViewInit {

  private items;




  constructor(private homeService: HomeService) {
    super();
  }



  ngOnInit() {





    this.homeService.initHomePage().subscribe(
      (data: any) => {
        this.items=data.sliders;
        setTimeout(()=>{
          this._itemSelector = '.omar';
          this.initSlider();
        },100);


      },
      error => {
        console.log(error);
      });
  }


  ngAfterViewInit(){






  }



}
