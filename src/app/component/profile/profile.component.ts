import { Component, OnInit } from '@angular/core';
import {TF1Constant} from '../../constant/constant';
import { FormGroup,FormControl,Validators,FormArray,FormBuilder } from '@angular/forms';
import {Router,ActivatedRoute} from "@angular/router";
import {MemberService} from "../../service/member.service";
import {SeoService} from '../../common/seo.service';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public arrayOfKeys;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  adresseForm: FormGroup;
  private successMessageInfos: string;
  private errorMessageInfos: string;
  private successMessageAdr: string;
  private errorMessageAdr: string;
  private successMessagePwd: string;
  private errorMessagePwd: string;
  private passwordV: boolean = false;
  private password1V: boolean = false;
  private password2V: boolean = false;
  private password3V: boolean = false;
  private openCalendar: boolean = false;
  private lastnameV: boolean = false;
  private firstnameV: boolean = false;
  private postcodeV: boolean = false;
  private adresseVide: boolean = false;
  private countryTab=TF1Constant.country;
  constructor(private formBuilder: FormBuilder,private router: Router ,private memberService:MemberService, seoService: SeoService  ) {
    seoService.setTitle("Mon Compte - TF1 Conso");
    seoService.setMetaDescription("Mon Compte - TF1 Conso");
    seoService.setMetaRobots("noindex,nofollow");
    seoService.setCanonical('https://www.tf1conso.fr/mon-compte');

    this.arrayOfKeys = Object.keys(this.countryTab);

  }
  private lastnameTitle=this.memberService.getuserloggedTab('lastName');
  private firstnameTitle=this.memberService.getuserloggedTab('firstName');
  private postcode=this.memberService.getuserloggedTab('postcode');
  private email=this.memberService.getuserloggedTab('email');
  private news_optin_partners=this.memberService.getuserloggedTab('news_optin_partners');
  private street=this.memberService.getuserloggedTab('street');
  private street_bis=this.memberService.getuserloggedTab('street_bis');
  private city=this.memberService.getuserloggedTab('city');
  private country=this.memberService.getuserloggedTab('country');
  private birthday;
  private gender=this.memberService.getuserloggedTab('gender').toString();

  ngOnInit() {
    if((this.street=="")||(this.street_bis=="")||(this.city=="")||(this.postcode=="")||(this.country=="")){
      this.adresseVide=true;
    }
    let date=this.memberService.getuserloggedTab('birthday');
    let day=date.substr(date.length - 2);
    let year=date.substring(0, 4);
    let month=date.substring(5, 7);
    this.birthday=day+"/"+month+"/"+year;
    this.profileForm = this.formBuilder.group({
      'gender': [this.gender],
      'lastname': [this.lastnameTitle, Validators.required],
      'firstname': [this.firstnameTitle, Validators.required],
      'birthday': [''],
      //'postcode': [this.postcode, Validators.required],
      'email': [this.email],
      'partner': [this.news_optin_partners] ,
      customDatepickerValue: new FormControl(this.birthday)
    });
    this.passwordForm = this.formBuilder.group({
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'newPassword': ['', [Validators.required,Validators.minLength(6)]],
      'newPassword2': ['', Validators.required],

    },{validator: this.matchingPasswords('newPassword', 'newPassword2')});

    this.adresseForm= this.formBuilder.group({
      'street': [this.street],
      'street_bis': [this.street_bis],
      'postcode': [this.postcode, Validators.required],
      'city': [this.city],
      'country': [this.country],
    });
/*
    let member_id=this.memberService.getuserloggedTab().member_id;
    let member_token=this.memberService.getuserloggedTab().member_token;
    let uid=this.memberService.getuserloggedTab().uid;
    const user = {"member_id":member_id,"member_token":member_token,"uid":uid};
    this.memberService.getUserProfile(user).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.news_optin_partners);

        this.profileForm.get('lastname').setValue(data.firstName);
        this.profileForm.get('firstname').setValue(data.lastName);
        //this.profileForm.get('birthday').setValue(data.birthday);
        this.profileForm.get('postcode').setValue(data.postcode);
        this.profileForm.get('email').setValue(data.email);
        //this.profileForm.get('gender').setValue(data.gender);
        this.profileForm.get('partner').setValue(data.news_optin_partners);
      },
      error => {
        console.log(error);
      });
      */
  }
  ValidatorEmail(c: FormControl) {
    let EMAIL_REGEXP = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
        validateEmail: {
          valid: false
        }
      };
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
  onSubmitAdresse(){
    this.postcodeV=false;
    let postcode = this.adresseForm.get('postcode');

    if (postcode.invalid) {
      this.postcodeV = true;
    }
    if(this.adresseForm.valid){
      getDOM().addClass(getDOM().query("body"), 'preventClick');
      getDOM().removeClass(getDOM().query("#load"), 'hided');
      const user = this.adresseForm.value;

      this.memberService.updateAdr(user).subscribe(
        (data: any) => {
          this.memberService.setuserloggedTab('postcode',this.adresseForm.get('postcode').value);
          this.memberService.setuserloggedTab('street',this.adresseForm.get('street').value);
          this.memberService.setuserloggedTab('street_bis',this.adresseForm.get('street_bis').value);
          this.memberService.setuserloggedTab('city',this.adresseForm.get('city').value);
          this.memberService.setuserloggedTab('country',this.adresseForm.get('country').value);
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.errorMessageAdr='';
          this.successMessageAdr='Votre compte a été modifié avec succès';

        },
        error => {
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.successMessageAdr='';
          this.errorMessageAdr='Une erreur est survenue';


        });

    }
  }
  onSubmitProfile(){
    this.lastnameV=false;
    this.firstnameV=false;
    //this.postcodeV=false;
    let lastname = this.profileForm.get('lastname');
    let firstname = this.profileForm.get('firstname');
    //let postcode = this.profileForm.get('postcode');

    if (lastname.invalid) {
      this.lastnameV = true;
    }
    if (firstname.invalid) {
      this.firstnameV = true;
    }
    /*
    if (postcode.invalid) {
      this.postcodeV = true;
    }
*/
    if(this.profileForm.valid){
      getDOM().addClass(getDOM().query("body"), 'preventClick');
      getDOM().removeClass(getDOM().query("#load"), 'hided');
      const user = this.profileForm.value;

      this.memberService.updateInfos(user).subscribe(
        (data: any) => {
          let date=this.profileForm.get('customDatepickerValue').value;
          let year=date.substr(date.length - 4);
          let day=date.substring(0, 2);
          let month=date.substring(3, 5);
          let birthday=year+"-"+month+"-"+day;
          this.memberService.setuserloggedTab('lastName',this.profileForm.get('lastname').value);
          this.memberService.setuserloggedTab('firstName',this.profileForm.get('firstname').value);
          //this.memberService.setuserloggedTab('postcode',this.profileForm.get('postcode').value);
          this.memberService.setuserloggedTab('news_optin_partners',this.profileForm.get('partner').value);
          this.memberService.setuserloggedTab('gender',this.profileForm.get('gender').value);
          this.memberService.setuserloggedTab('birthday',birthday);
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.errorMessageInfos='';
          this.successMessageInfos='Votre compte a été modifié avec succès';

        },
        error => {
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.successMessageInfos='';
          this.errorMessageInfos='Une erreur est survenue';


        });

    }

  }
  onSubmitPassword(){
    this.passwordV = false;
    this.password1V = false;
    this.password2V = false;
    this.password3V = false;

    let password = this.passwordForm.get('password');
    let newPassword = this.passwordForm.get('newPassword');
    let newPassword2 = this.passwordForm.get('newPassword2');

    if (password.invalid) {
      this.passwordV = true;
    }
    if (newPassword.invalid) {
      this.password1V = true;
    }
    if((this.passwordForm.hasError('mismatchedPasswords')))
    {
      this.password3V = true;
    }
    if ((newPassword2.invalid) || (this.passwordForm.hasError('mismatchedPasswords')) ) {
      this.password2V = true;
    }

    if(this.passwordForm.valid){
      getDOM().addClass(getDOM().query("body"), 'preventClick');
      getDOM().removeClass(getDOM().query("#load"), 'hided');
      const user = this.passwordForm.value;

      this.memberService.updatePwd(user).subscribe(
        (data: any) => {
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.errorMessagePwd='';
          this.successMessagePwd='Votre compte a été modifié avec succès';

        },
        error => {
          getDOM().removeClass(getDOM().query("body"), 'preventClick');
          getDOM().addClass(getDOM().query("#load"), 'hided');
          this.successMessagePwd='';
          if(error=403)
          {
            this.errorMessagePwd='Votre ancien mot de passe est incorrect. Veuillez réessayer.';
          }
          else{
            this.errorMessagePwd='Une erreur est survenue';
          }



        });
    }
  }
  solde(){
    return 0;
  }
}
