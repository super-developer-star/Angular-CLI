import { Component, OnInit,OnDestroy,AfterViewInit,HostListener } from '@angular/core';
import { RecaptchaNoFormsModule } from 'ng2-recaptcha/ng2-recaptcha.noforms';
import { FormGroup,FormControl,Validators,FormArray,FormBuilder } from '@angular/forms';
import {MemberService} from "../../service/member.service";
import {Router, NavigationEnd} from "@angular/router";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  private errorMessageContact:string;
  private successMessageContact:string;
  private nameV: boolean = false;
  private emailV: boolean = false;
  private subjectV: any = false;
  private messageV: boolean = false;
  private captchaV: boolean = false;
  private resoled: boolean = false;
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {

      let confirmMessage = 'You have unsaved data changes. Are you sure to close the page?'
      event.returnValue = confirmMessage;
      return confirmMessage;


  }
  constructor(private formBuilder: FormBuilder,private memberService:MemberService,private router: Router) {
    this.contactForm = formBuilder.group({
      'name': ['', Validators.required] ,
      'email': ['', [Validators.required, this.ValidatorEmail]],
      'subject': ['', Validators.required] ,
      'message': ['', Validators.required] 

    });

  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaV=true;
    this.resoled=true;
  }
  ValidatorEmail(c: FormControl) {
    let EMAIL_REGEXP = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
        validateEmail: {
          valid: false
        }
      };
  }
  ngOnInit() {
    if(document.documentElement.clientWidth<700){
      this.captchaV=true;
    }
    window.addEventListener('resize', (event)=>{
     if(document.documentElement.clientWidth<700){
       this.captchaV=true;
     }else if(document.documentElement.clientWidth>=700 && this.resoled==false){
       this.captchaV=false;
     }
    });
  }
  ngAfterViewInit(){

  }
  ngOnDestroy(){
    /*
    window.onbeforeunload = function(e) {
      window.open(document.URL,"_blank");
      return 'Dialog text here.';
    };
    */
  }
  onSubmitContact(){

  this.nameV=false;
  this.emailV=false;
  this.subjectV=false;
  this.messageV=false;

    let name = this.contactForm.get('name');
    let email = this.contactForm.get('email');
    let subject = this.contactForm.get('subject');
    let message = this.contactForm.get('message');

    if (name.invalid) {
      this.nameV = true;
    }
    if (email.invalid) {
      this.emailV = true;
    }
    if (subject.invalid) {
      this.subjectV = true;
    }
    if (message.invalid) {
      this.messageV = true;
    }

    if(this.contactForm.valid && this.captchaV){
      let form =this.contactForm.value;
      this.memberService.contactEmail(form).subscribe(
        (data: any) => {
          this.errorMessageContact ='';
          this.successMessageContact='Votre email vous a été envoyé avec succès';

        },
        error => {
          this.successMessageContact='';
          this.errorMessageContact = 'Une erreur est survenue';
        });

    }
  }
}
