export class Member {

    private _id:number;
    private _email:string;
    private _city:string;
    private _street:string;
    private _street_bis:string;
    private _postcode:number;
    private _full_persistence_token:string;
    private _beneficiary:string;
    private _bank_bic:string;
    private _bank_iban:string;
    private _paypal_id:string;
    private _news_optin:boolean;

    constructor(){

    }

    get id():number {
        return this._id;
    }

    get email():string {
        return this._email;
    }

    get city():string {
        return this._city;
    }

    get street():string {
        return this._street;
    }

    get street_bis():string {
        return this._street_bis;
    }

    get postcode():number {
        return this._postcode;
    }

    get full_persistence_token():string {
        return this._full_persistence_token;
    }

    get beneficiary():string {
        return this._beneficiary;
    }

    get bank_bic():string {
        return this._bank_bic;
    }

    get bank_iban():string {
        return this._bank_iban;
    }

    get paypal_id():string {
        return this._paypal_id;
    }

    get news_optin():boolean {
        return this._news_optin;
    }

}
