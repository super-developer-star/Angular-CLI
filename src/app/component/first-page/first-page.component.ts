import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, Route} from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  constructor(  private router: Router ) { }

  ngOnInit() {
  }

   // redirect to website
  toWebSite() {
  	
  	//this.router.navigate(['/']);
  	window.location.href ='http://tf1-conso.dev.anypli.com/';
  }

  // get mobile opertaing system
    getMobileOperatingSystem() {
       // Android detection
       if (navigator.userAgent.match(/Android/i)) {
           return "Android";
        }
      // iOS detection 
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return "iOS";
        }
        return "unknown";
   }

   // start application
    startApp(){
        // case function does not exist
        setTimeout(() => {
           this.toStore();
        }, 1000);
        window.location.href = 'tf1conso://';
    }

    // download application
    toStore() {
        var os = this.getMobileOperatingSystem();
        // go to google store
        if(os == "Android"){
            window.open("https://play.google.com/store/apps/details?id=fr.tf1.tf1conso&hl=en");
        }
        // go to app store
        if(os == "iOS"){
        	window.open("https://itunes.apple.com/fr/app/tf1-conso-coupons-reduction/id977958337?mt=8");
        }
    }

}
