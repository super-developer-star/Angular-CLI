import { Component, ViewChild,OnInit ,OnChanges, Input} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup,FormControl,Validators,FormArray,FormBuilder } from '@angular/forms';
import {Router,ActivatedRoute ,NavigationEnd} from "@angular/router";
import * as moment from 'moment';
import {MemberService} from "../../service/member.service";
import { Observable } from 'rxjs/Rx';
import {CouponService} from "../../service/coupon.service";
import {PopUpService} from "../../service/pop-up.service";
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges{


  private userTab:any[]=[];
  private errorMessageAuth: string;
  private errorMessageRegister: string;
  private errorMessageReset: string;
  private successMessageReset: string;
  private translate: boolean = false;
  private islogged: boolean = false;
  private account: boolean = false;
  private hide: boolean = false;
  private retour: boolean = false;
  private size: boolean = false;
  private fixed: boolean = true;
  private topOne: boolean = true;
  private topTwo: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  resetPassForm: FormGroup;
  private lastnameV: boolean = false;
  private firstnameV: boolean = false;
  private birthdayV: boolean = false;
  private postcodeV: boolean = false;
  private emailV: boolean = false;
  private password1V: boolean = false;
  private password2V: boolean = false;
  private conditionV: boolean = false;
  private openCalendar: boolean = false;
  private emailAuthV: boolean = false;
  private emailResetV: boolean = false;
  private passwordAuthV: boolean = false;
  private fromJen: boolean = false;
  private hide_coup: boolean = false;
  @Input() infopo:any;
  set infopop(infopop2: any) {
    if(infopop2){
      this.lgModal.show();
      this.fromJen=true;
    }
  }


  constructor(private popUpService:PopUpService,private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,private couponService:CouponService,private memberService:MemberService) {
    this.loginForm = formBuilder.group({
      'email': ['', [Validators.required, this.ValidatorEmail]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'souvenir': [''],
    });

    this.registerForm =formBuilder.group({
      'gender': ['2', Validators.required],
       'lastname': ['', Validators.required],
      'firstname': ['', Validators.required],
      'birthday': ['', Validators.required],
      'postcode': ['', Validators.required],
      'email': ['', [Validators.required, this.ValidatorEmail]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'password2': ['', Validators.required],
      'condition': ['', Validators.required],
      'partner': [''],
      customDatepickerValue: new FormControl()
    },{validator: this.matchingPasswords('password', 'password2')});

    this.resetPassForm= formBuilder.group({
      'email': ['', [Validators.required, this.ValidatorEmail]]

    });

  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
   this.islogged=this.memberService.isLogged();
    this.router.events.subscribe((url) => {
      if(url.url=="/mon-compte"){
        this.account=true;
        this.hide_coup=false;
      }else if((url.url=="/coupon-reduction/impression")||(url.url=="/coupon-reduction/impression/imprime")){
        this.hide_coup=true;
        this.account=false;
      }
      else{
        this.account=false;
        this.hide_coup=false;
      }
    });
  this.lgModal.onEsc = function (){
    if (this.config.keyboard) {
      this.hide();
      getDOM().removeClass(getDOM().query("html"), 'htm-scroll');
    }

  }
  this.lgModal.onClick = function (event) {
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement) {
      return;
    }
    this.hide(event);
    getDOM().removeClass(getDOM().query("html"), 'htm-scroll');
  };

  }

  ngOnChanges(){
    if(this.popUpService.popUpState==true) {
      setTimeout(()=>{this.popUpService.popUpState = false;},1500);

      console.log('changes');
    }
  }
/*********************************COUPON******************************************/
getTable(){
  console.log(this.couponService.getpricesTable());
}
  getTotalPrice(){
    return this.couponService.getCouponPrices().toFixed(2).replace(".",",");
  }
  getTotalNumber(){
    let number= this.couponService.getCouponCount();
    if(number <= 1){
      return number+' coupon';
    }
    else{
      return number+' coupons';
    }
  }
  jenprofite(){
    if(this.memberService.isLogged()){
      this.router.navigate(['/coupon-reduction/impression']);
    }
    else{
      this.showChildModal();
      this.fromJen=true;
    }
  }
  /*********************************COUPON******************************************/
  ValidatorEmail(c: FormControl) { 
    let EMAIL_REGEXP = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;  
    return EMAIL_REGEXP.test(c.value) ? null : { 
      validateEmail: { 
        valid: false 
      } 
    }; 
  } 
  // FORM GROUP VALIDATORS 

   matchingPasswords(passwordKey: string, confirmPasswordKey: string) {

     return (group: FormGroup): {[key: string]: any} => {
       let password = group.controls[passwordKey];
       let confirmPassword = group.controls[confirmPasswordKey];
       if (password.value !== confirmPassword.value) {
         return {
           mismatchedPasswords: true
         };
       }
     }
   }
  ValidatorPassword(c: FormControl) { 
    return {isEqual: c.value === this.registerForm.get('password').value}; 
  }

  @ViewChild('lgModal') public lgModal:ModalDirective;

  public showChildModal():void {
    this.errorMessageAuth="";
    this.errorMessageRegister="";
    this.errorMessageReset="";
    this.successMessageReset="";
    this.translate = false;
    this.islogged = false;
    this.hide= false;
    this.fromJen=false;
    this.retour = false;
    this.size = false;
    this.fixed = true;
    this.topOne = true;
    this.topTwo = false;
    this.lastnameV= false;
    this.firstnameV = false;
    this.birthdayV = false;
    this.postcodeV = false;
    this.emailV= false;
    this.password1V = false;
    this.password2V = false;
    this.conditionV = false;
    this.openCalendar = false;
    this.emailAuthV = false;
    this.emailResetV = false;
    this.passwordAuthV = false;
    this.loginForm.reset();
    this.registerForm.reset();
    this.registerForm.get('gender').setValue("2");
    this.resetPassForm.reset();
    this.lgModal.show();
    getDOM().addClass(getDOM().query("html"), 'htm-scroll');
  }


  public hideChildModal():void {
    this.lgModal.hide();
    getDOM().removeClass(getDOM().query("html"), 'htm-scroll');

  }

  goToSlideTow(){ 
    this.retour=false; 
    this.hide=false; 
    this.translate=true; 
    this.size=true; 
    this.topOne=false; 
    this.topTwo=true; 
    setTimeout(() => { 
      this.fixed=false; 
    }, 800);  
  } 

  goToSlideThree(){ 
    this.retour=false; 
    this.hide=true; 
    this.translate=true; 
    this.size=true; 
    this.topOne=false; 
    this.topTwo=true; 
    setTimeout(() => { 
      this.fixed=false; 
    }, 800); 
  } 

  goToSlideOneFromTwo(){ 
    this.fixed=true; 
    this.retour=true; 
    this.topOne=true; 
    this.topTwo=false; 
    this.translate=false; 
    this.hide=false; 
    this.size=false;  
  } 
  goToSlideOneFromThree(){ 
    this.retour=true; 
    this.fixed=true; 
    this.topOne=true; 
    this.topTwo=false; 
    this.translate=false; 
    this.hide=true; 
    this.size=false; 
  }
  openDatePick(){

    this.openCalendar=true;
  }
  onBlurDatePick(){

      this.openCalendar=false;


  }
  strrop(ev){
    ev.stopPropagation();
  }
  keystop(ev){
    ev.preventDefault();
  }
  onSubmitRegister() {
    this.lastnameV = false;
    this.firstnameV = false;
    this.birthdayV = false;
    this.postcodeV = false;
    this.emailV = false;
    this.password1V = false;
    this.password2V = false;
    this.conditionV = false;
    let date=this.registerForm.get('customDatepickerValue').value;

    if(date!=null){
      this.registerForm.get('birthday').setValue(date);
    }
    let lastname = this.registerForm.get('lastname');
    let firstname = this.registerForm.get('firstname');
    let birthday = this.registerForm.get('birthday');
    let postcode = this.registerForm.get('postcode');
    let email = this.registerForm.get('email');
    let password = this.registerForm.get('password');
    let password2 = this.registerForm.get('password2');
    let condition = this.registerForm.get('condition');
    if (lastname.invalid) {
      this.lastnameV = true;
    }

    if (lastname.invalid) {
      this.lastnameV = true;
    }
    if (firstname.invalid) {
      this.firstnameV = true;
    }
    if (birthday.invalid) {
      this.birthdayV = true;
    }
    if (postcode.invalid) {
      this.postcodeV = true;
    }
    if (email.invalid) {
      this.emailV = true;
    }
    if (password.invalid) {
      this.password1V = true;
    }
    if ((password2.invalid) || (this.registerForm.hasError('mismatchedPasswords')) ){
      this.password2V = true;
    }
    if (condition.invalid) {
      this.conditionV = true;
    }

    if(this.registerForm.valid){
      getDOM().addClass(getDOM().query("body"), 'preventClick');
      getDOM().removeClass(getDOM().query("#load"), 'hided');
    const user = this.registerForm.value;
    this.memberService.register(user).subscribe(
      (data: any) => {

          this.userTab.push(data);
        sessionStorage.setItem('authUser', JSON.stringify(this.userTab));
        if(localStorage.getItem('idsTab')) {
          let tabidS=JSON.parse(window.localStorage.getItem('idsTab'));
          sessionStorage.setItem('idsTab', JSON.stringify(tabidS));
          localStorage.removeItem('idsTab');
        }
        if(localStorage.getItem('offerTab')) {
          let offerTabS = JSON.parse(window.localStorage.getItem('offerTab'));
          sessionStorage.setItem('offerTab', JSON.stringify(offerTabS));
          localStorage.removeItem('offerTab');
        }
        this.islogged = true;
        this.hideChildModal();
        getDOM().removeClass(getDOM().query("body"), 'preventClick');
        getDOM().addClass(getDOM().query("#load"), 'hided');
        let tabid = JSON.parse(window.sessionStorage.getItem('idsTab'));
        let member_id=this.memberService.getuserloggedTab('member_id');
        let member_token=this.memberService.getuserloggedTab('member_token');
        if(sessionStorage.getItem('idsTab')) {
          this.memberService.postCoupon(tabid,member_id,member_token).subscribe(
            (data: any) => {
              this.memberService.getCoupon(member_id,member_token).subscribe(
                (data: any) => {
                  let ids: any[] =[];
                  let offers: any[] =[];
                  let orderids: any[] =[];
                  for(let i=0;i<data.length;i++){
                    ids.push(data[i].offer_id);
                    orderids.push({"id":data[i].offer_id,"order":data[i].id});
                    offers.push(data[i].offer);
                  }

                  sessionStorage.setItem('idsTab', JSON.stringify(ids));
                  sessionStorage.setItem('offerTab', JSON.stringify(offers));
                  sessionStorage.setItem('orderTab', JSON.stringify(orderids));

                },
                error => {
                  console.log(error);
                });
              console.log(data);
            },
            error => {

            });

        }else{
          this.memberService.getCoupon(member_id,member_token).subscribe(
            (data: any) => {
              let ids: any[] =[];
              let offers: any[] =[];
              let orderids: any[] =[];
              for(let i=0;i<data.length;i++){
                ids.push(data[i].offer_id);
                orderids.push({"id":data[i].offer_id,"order":data[i].id});
                offers.push(data[i].offer);
              }
              sessionStorage.setItem('idsTab', JSON.stringify(ids));
              sessionStorage.setItem('offerTab', JSON.stringify(offers));
              sessionStorage.setItem('orderTab', JSON.stringify(orderids));

            },
            error => {
              console.log(error);
            });

        }
        if(this.fromJen){
          this.router.navigate(['/coupon-reduction/impression']);
        }
      },
      error => {
        getDOM().removeClass(getDOM().query("body"), 'preventClick');
        getDOM().addClass(getDOM().query("#load"), 'hided');
        if((error==409) || (error==500))
        {
          this.errorMessageRegister = 'L\'adresse e-mail existe déjà';
        }else{
          this.errorMessageRegister = 'Une erreur est survenue';
        }
      });
  }

  }

  onSubmitLogin(){

   this.emailAuthV=false;
   this.passwordAuthV=false;
    let email = this.loginForm.get('email');
    let password = this.loginForm.get('password');
    let souvenir = this.loginForm.get('souvenir').value;
    if (email.invalid) {
      this.emailAuthV = true;
    }
    if (password.invalid) {
      this.passwordAuthV = true;
    }


   if(this.loginForm.valid){
     getDOM().addClass(getDOM().query("body"), 'preventClick');
     getDOM().removeClass(getDOM().query("#load"), 'hided');
     const user = this.loginForm.value;
     this.memberService.loginfn(user).subscribe(

       (data: any) => {
         this.userTab.push(data);
         if(souvenir==null){
           sessionStorage.setItem('authUser', JSON.stringify(this.userTab));
           if(localStorage.getItem('idsTab')) {
             let tabidS=JSON.parse(window.localStorage.getItem('idsTab'));
             sessionStorage.setItem('idsTab', JSON.stringify(tabidS));
             localStorage.removeItem('idsTab');
           }
           if(localStorage.getItem('offerTab')) {
             let offerTabS = JSON.parse(window.localStorage.getItem('offerTab'));
             sessionStorage.setItem('offerTab', JSON.stringify(offerTabS));
             localStorage.removeItem('offerTab');
           }
           this.islogged = true;
           this.hideChildModal();
           getDOM().removeClass(getDOM().query("body"), 'preventClick');
           getDOM().addClass(getDOM().query("#load"), 'hided');
             let tabid = JSON.parse(window.sessionStorage.getItem('idsTab'));
           let member_id=this.memberService.getuserloggedTab('member_id');
           let member_token=this.memberService.getuserloggedTab('member_token');
           if(sessionStorage.getItem('idsTab')) {
             this.memberService.postCoupon(tabid,member_id,member_token).subscribe(
               (data: any) => {
                 this.memberService.getCoupon(member_id,member_token).subscribe(
                   (data: any) => {
                     let ids: any[] =[];
                     let offers: any[] =[];
                     let orderids: any[] =[];
                     for(let i=0;i<data.length;i++){
                       ids.push(data[i].offer_id);
                       orderids.push({"id":data[i].offer_id,"order":data[i].id});
                       offers.push(data[i].offer);
                     }

                       sessionStorage.setItem('idsTab', JSON.stringify(ids));
                       sessionStorage.setItem('offerTab', JSON.stringify(offers));
                       sessionStorage.setItem('orderTab', JSON.stringify(orderids));

                   },
                   error => {
                     console.log(error);
                   });
                 console.log(data);
               },
               error => {

               });

           }else{
             this.memberService.getCoupon(member_id,member_token).subscribe(
               (data: any) => {
                 let ids: any[] =[];
                 let offers: any[] =[];
                 let orderids: any[] =[];
                 for(let i=0;i<data.length;i++){
                   ids.push(data[i].offer_id);
                   orderids.push({"id":data[i].offer_id,"order":data[i].id});
                   offers.push(data[i].offer);
                 }
                   sessionStorage.setItem('idsTab', JSON.stringify(ids));
                   sessionStorage.setItem('offerTab', JSON.stringify(offers));
                   sessionStorage.setItem('orderTab', JSON.stringify(orderids));

               },
               error => {
                 console.log(error);
               });

           }
         }
         else{
           window.localStorage.setItem('authUser', JSON.stringify(this.userTab));
           this.islogged = true;
           this.hideChildModal();
           getDOM().removeClass(getDOM().query("body"), 'preventClick');
           getDOM().addClass(getDOM().query("#load"), 'hided');
           let tabidL = JSON.parse(window.localStorage.getItem('idsTab'));
           let member_id=this.memberService.getuserloggedTab('member_id');
           let member_token=this.memberService.getuserloggedTab('member_token');
           if(localStorage.getItem('idsTab')) {
             this.memberService.postCoupon(tabidL,member_id,member_token).subscribe(
               (data: any) => {
                 this.memberService.getCoupon(member_id,member_token).subscribe(
                   (data: any) => {
                     let ids: any[] =[];
                     let offers: any[] =[];
                     let orderids: any[] =[];
                     for(let i=0;i<data.length;i++){
                       ids.push(data[i].offer_id);
                       orderids.push({"id":data[i].offer_id,"order":data[i].id});
                       offers.push(data[i].offer);
                     }

                     localStorage.setItem('idsTab', JSON.stringify(ids));
                     localStorage.setItem('offerTab', JSON.stringify(offers));
                     localStorage.setItem('orderTab', JSON.stringify(orderids));

                   },
                   error => {
                     console.log(error);
                   });
                 console.log(data);
               },
               error => {

               });

           }else{
             this.memberService.getCoupon(member_id,member_token).subscribe(
               (data: any) => {
                 let ids: any[] =[];
                 let offers: any[] =[];
                 let orderids: any[] =[];
                 for(let i=0;i<data.length;i++){
                   ids.push(data[i].offer_id);
                   orderids.push({"id":data[i].offer_id,"order":data[i].id});
                   offers.push(data[i].offer);
                 }
                 localStorage.setItem('idsTab', JSON.stringify(ids));
                 localStorage.setItem('offerTab', JSON.stringify(offers));
                 localStorage.setItem('orderTab', JSON.stringify(orderids));

               },
               error => {
                 console.log(error);
               });

           }
         }
         if(this.fromJen){
           this.router.navigate(['/coupon-reduction/impression']);
         }

       },
         error => {
           getDOM().removeClass(getDOM().query("body"), 'preventClick');
           getDOM().addClass(getDOM().query("#load"), 'hided');
          if(error=403)
          {
            this.errorMessageAuth = 'Vos identifiants sont incorrects';
          }else{
            this.errorMessageAuth = 'Une erreur est survenue';
          }


         });
   }

  }
  onSubmitResetPass(){
   this.emailResetV=false;
     console.log('emaill form : ' +this.resetPassForm.get('email').value);
     if((this.resetPassForm.get('email').value=="") && (this.loginForm.get('email').value!="")){
       this.resetPassForm.get('email').setValue(this.loginForm.get('email').value);
     }
    let email = this.resetPassForm.get('email');
    if (email.invalid) {
      this.emailResetV = true;
    }
    if(this.resetPassForm.valid){
      const form = this.resetPassForm.value;
      this.memberService.resetPassword(form).subscribe(
        (data: any) => {
          this.errorMessageReset="";
          this.successMessageReset='Un email vous a été envoyé. Veuillez vérifier votre boite mail.';

        },
        error => {
          this.successMessageReset="";
          this.errorMessageReset='Aucun compte ne correspond à cet email';
        });
    }
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.userTab=[];
    this.couponService.offers=[];
    this.couponService.ids=[];
    this.couponService.orderids=[];
    this.islogged=this.memberService.isLogged();
    this.router.navigate(['/']);
  }
}
