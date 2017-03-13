export class Category {
    private _id:number;
    private _name:string;
    private _tag:string;

    constructor(){

    }
    get id():number {
        return this._id;
    }

    get name():string {
        return this._name;
    }

    get tag():string {
        return this._tag;
    }


}

