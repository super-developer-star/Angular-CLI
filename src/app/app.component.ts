import {Component, Input} from '@angular/core';
import  {TF1Constant} from './constant/constant';
import {TranslateService} from 'ng2-translate';
import {BreadcrumbService} from './common/breadcrumb/breadcrumb.service';
import {PopUpService} from './service/pop-up.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {










  private visited: any;

  constructor(private  popUpService:PopUpService,private translate:TranslateService,private breadcrumbService: BreadcrumbService){

     breadcrumbService.addFriendlyNameForRoute('/mon-compte', 'Mon compte');
     breadcrumbService.addFriendlyNameForRoute('/mentions-legales', 'Mentions légales');
     breadcrumbService.hideRoute('/cgu');
     breadcrumbService.addFriendlyNameForRoute('/cgu/coupons-shopping', 'CGU');
     breadcrumbService.addFriendlyNameForRoute('/cgu/coupons-alimentaires', 'CGU');
     breadcrumbService.addFriendlyNameForRoute('/contact', 'Contact');
     translate.addLangs(["en","fr"]);
     translate.setDefaultLang("fr");
     translate.use("fr");

     //check if user visited the app
     this.visited = false;
     this.checkVisited();
    //this.vider();
 }

  //check visited
  checkVisited() {
    var width = screen.width;
    // test if device is mobile
    if(width < 420){
    var check = localStorage.getItem('visited');
      if(check){
         this.visited = true;
      }else{
        this.setVisited();
      }
    }else{
      // desktop
      this.visited = true;
    }
  }

  //set visited
  setVisited() {
       localStorage.setItem('visited', <any>true);
  }
  // empty visited
  vider() {
       localStorage.removeItem('visited');
       console.log("empty "+this.visited);
  }
}
