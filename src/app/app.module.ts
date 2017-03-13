//core dependency
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import {NgModule, LOCALE_ID} from '@angular/core';

//external dependency
import {TranslateModule} from 'ng2-translate';
import {NgPipesModule} from 'angular-pipes'
import {Ng2BootstrapModule} from 'ng2-bootstrap'
import { ModalModule } from 'ng2-bootstrap/modal';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { MnFullpageDirective, MnFullpageService } from "ng2-fullpage";
import { DropdownModule } from 'ng2-bootstrap';
import { AgmCoreModule } from "angular2-google-maps/core";
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { RecaptchaModule } from 'ng2-recaptcha';

//directives import
import { IsMobileDirective } from './directive/is-mobile.directive';

//services import
import { SeoService } from './common/seo.service';
import {MemberService} from './service/member.service';
import {AuthGuard} from "./auth.guard";
import {HomeService} from './service/home.service';
import {OfferService} from './service/offer.service';
import {BrandService} from './service/brand.service';
import {PrintService} from './service/print.service';
import {PopUpService} from './service/pop-up.service';
import {ListShoppingService} from './service/list-shopping.service';



//components import
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CouponCounterComponent } from './component/header/coupon-counter/coupon-counter.component';
import { HomeComponent } from './component/home/home.component';
import { CatalinaHighlightComponent } from './component/home/catalina-highlight/catalina-highlight.component';
import { OfferComponent } from './component/home/offer/offer.component';
import { CellComponent } from './component/cell/cell.component';
import { CatalinaOfferComponent } from './component/catalina-offer/catalina-offer.component';
import {ShoppingOfferComponent, SafeHtmlPipe} from './component/shopping-offer/shopping-offer.component';
import { MapComponent } from './component/shopping-offer/map/map.component';
import { AuthenticationComponent } from './component/header/authentication/authentication.component';
import { BrandComponent } from './component/brand/brand.component';
import { PrintComponent } from './component/print/print.component';
import { PrintedComponent } from './component/printed/printed.component';
import { ProfileComponent } from './component/profile/profile.component';
import { LegalNoticesComponent } from './component/legal-notices/legal-notices.component';
import { TermsAndConditionsComponent } from './component/terms-and-conditions/terms-and-conditions.component';
import { ContactComponent } from './component/contact/contact.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { BreadcrumbService} from './common/breadcrumb/breadcrumb.service';
import {CouponService} from "./service/coupon.service";
import { CellShoppingComponent } from './component/cell-shopping/cell-shopping.component';
import { CellSliderComponent } from './component/cell-slider/cell-slider.component';
import { TermsAndConditionsCatalinaComponent } from './component/terms-and-conditions/terms-and-conditions-catalina/terms-and-conditions-catalina.component';
import { CustomDatepickerComponent } from './common/CustomDatepickerComponent';
import {OfferShoppingService} from "./service/offer-shopping.service";
import { ShoppingListeComponent } from './component/shopping-liste/shopping-liste.component';
import { CarouselComponent } from './component/home/carousel/carousel.component';
import { FirstPageComponent } from './component/first-page/first-page.component';



@NgModule({
  declarations: [
    AppComponent,
    IsMobileDirective,
    HeaderComponent,
    FooterComponent,
    CouponCounterComponent,
    HomeComponent,
    CatalinaHighlightComponent,
    OfferComponent,
    CellComponent,
    CatalinaOfferComponent,
    ShoppingOfferComponent,
    MapComponent,
    AuthenticationComponent,
    BrandComponent,
    PrintComponent,
    PrintedComponent,
    ProfileComponent,
    LegalNoticesComponent,
    TermsAndConditionsComponent,
    ContactComponent,
    BreadcrumbComponent,
    MnFullpageDirective,
    CellShoppingComponent,
    CellSliderComponent,
    TermsAndConditionsCatalinaComponent,
    CustomDatepickerComponent,
    SafeHtmlPipe,
    ShoppingListeComponent,
    CarouselComponent,
    FirstPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgPipesModule,
    routing,
    Ng2BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot(),
    DropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA9v7IdpjLw2g-GZKiowftxIGu-FFJTkNc",
      libraries: ["places"]
    }),
    DatepickerModule.forRoot(),
    RecaptchaModule.forRoot()

  ],
  providers: [
    Title,
    SeoService,
    BreadcrumbService,
    CouponService,
    MnFullpageService,
    MemberService,
    AuthGuard,
    HomeService,
    OfferService,
    OfferShoppingService,
    BrandService,
    PrintService,
    PopUpService,
    ListShoppingService,
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
