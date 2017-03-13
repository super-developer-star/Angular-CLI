import { Component, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/fr';
import {MemberService} from "../service/member.service";
let DATEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomDatepickerComponent),
  multi: true,

};

@Component({
  selector: 'custom-datepicker[formControlName]',
  template: `
    <datepicker [(ngModel)]="datePickerValue" [showWeeks]="false" [maxDate]="maxDate" ></datepicker>
  `,
  providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class CustomDatepickerComponent implements ControlValueAccessor {
  public maxDate: Date = void 0;
  constructor(private memberService:MemberService){
    moment.locale('fr');
    this.maxDate = new Date();
    if(this.memberService.isLogged()) {
      this.changeDate();
    }

  }
  change = (_: any) => {};
  _customDatePickerValue;
  _datePickerValue: Date;


  get customDatePickerValue() {
    return this._customDatePickerValue;

  }
  set customDatePickerValue(value) {
    this._customDatePickerValue = value;
    this.change(value);
  }

  get datePickerValue() {
    return this._datePickerValue;
  }
  set datePickerValue(value) {
    this._datePickerValue = value;
    this.customDatePickerValue = moment(value).format('DD/MM/YYYY');
  }

  writeValue() {}
  registerOnChange(fn) {
    this.change = fn;
  }
  registerOnTouched() {

  }
  public changeDate(): void {
    let date=this.memberService.getuserloggedTab('birthday');
    let day=date.substr(date.length - 2);
    let year=date.substring(0, 4);
    let month=date.substring(5, 7);
    let birthday=day+"/"+month+"/"+year;
    this.datePickerValue = moment(birthday, 'DD/MM/YYYY')
      .toDate();
  }

}
