import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./component/home/home.component";
import {CatalinaOfferComponent} from "./component/catalina-offer/catalina-offer.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {PrintedComponent} from "./component/printed/printed.component";
import {ShoppingOfferComponent} from "./component/shopping-offer/shopping-offer.component";
import {LegalNoticesComponent} from "./component/legal-notices/legal-notices.component";
import {TermsAndConditionsComponent} from "./component/terms-and-conditions/terms-and-conditions.component";
import {TermsAndConditionsCatalinaComponent} from "./component/terms-and-conditions/terms-and-conditions-catalina/terms-and-conditions-catalina.component";
import {ContactComponent} from "./component/contact/contact.component";
import {PrintComponent} from "./component/print/print.component";
import {BrandComponent} from "./component/brand/brand.component";
import {ShoppingListeComponent} from "./component/shopping-liste/shopping-liste.component";

import {FirstPageComponent} from "./component/first-page/first-page.component";

import {MapComponent} from "./component/shopping-offer/map/map.component";
import {AuthGuard} from "./auth.guard";



export const APP_ROUTES_PROVIDERS =[
    { path:'',component:HomeComponent},
    { path:'bon-de-reduction/reduction/:category',component:HomeComponent},
    { path:'coupon/:titre/:id',component:CatalinaOfferComponent},
    { path:'mon-compte',component:ProfileComponent,canActivate:[AuthGuard]},
    { path:'coupon-reduction/impression/imprime',component:PrintedComponent,canActivate:[AuthGuard]},
    { path:':type/reduction/:store/:title/:id',component:ShoppingOfferComponent},
    { path:'mentions-legales',component:LegalNoticesComponent},
    { path:'cgu/coupons-alimentaires',component:TermsAndConditionsCatalinaComponent},
    { path:'cgu/coupons-shopping',component:TermsAndConditionsComponent},
    { path:'contact',component:ContactComponent},
    { path:'coupon-reduction/impression',component:PrintComponent,canActivate:[AuthGuard]},
    { path:'coupons/:nom',component:BrandComponent},
    { path:'bon-plan/toutes-les-reductions',component:ShoppingListeComponent},
    { path:'firstpage',component:FirstPageComponent}



];
export const routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);
