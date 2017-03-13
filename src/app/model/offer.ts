export class Offer {
    private _id:number;
    private _is_highlight:number;
    private _from:number;
    private _type:number;
    private _website:string;
    private _coupon:string;
    private _name:string;
    private _distance:number;
    private _short_description:string;
    private _description:string;
    private _brand:string;
    private _amount:string;
    private _picture_url:string;
    private _expiration_date:string;
    private _address:string;

    constructor(){

    }
    get id():number {
        return this._id;
    }

    get is_highlight():number {
        return this._is_highlight;
    }

    get from():number {
        return this._from;
    }

    get type():number {
        return this._type;
    }

    get website():string {
        return this._website;
    }

    get coupon():string {
        return this._coupon;
    }

    get name():string {
        return this._name;
    }

    get distance():number {
        return this._distance;
    }

    get short_description():string {
        return this._short_description;
    }

    get description():string {
        return this._description;
    }

    get brand():string {
        return this._brand;
    }

    get amount():string {
        return this._amount;
    }

    get picture_url():string {
        return this._picture_url;
    }

    get expiration_date():string {
        return this._expiration_date;
    }

    get address():string {
        return this._address;
    }

}
