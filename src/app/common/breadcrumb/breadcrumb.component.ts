import {Component, OnChanges, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {BreadcrumbService} from './breadcrumb.service';
import {PopUpService} from "../../service/pop-up.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  private _urls: string[];
  private _routerSubrciption: any;
  private impress_page: Boolean=false;

  constructor(private popUpService:PopUpService,private router: Router, private breadcrumbService: BreadcrumbService) {
    this._urls = new Array();
    this._routerSubrciption = this.router.events.subscribe((navigationEnd:NavigationEnd) => {
      this._urls.length = 0; //Fastest way to clear out array
      this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
    });
  }

  generateBreadcrumbTrail(url: string): void {
    if (!this.breadcrumbService.isRouteHidden(url)) {
      //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
      this._urls.unshift(url);
    }

    if (url.lastIndexOf('/') > 0) {
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
    }
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  friendlyName(url: string): string {
    return decodeURIComponent(!url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url)).replace(/-/g," ");
  }

  ngOnDestroy(): void {
    this._routerSubrciption.unsubscribe();
  }
  ngOnInit(){
    this.router.events.subscribe((url) => {
      if((url.url=="/coupon-reduction/impression")||(url.url=="/coupon-reduction/impression/imprime")){
        this.impress_page=true;
      }
    });
  }

}
