import {ISerializeInfo, ISerializable, ITrackDirty} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {idSep, getUniqueStr} from "./pouchHelpers";


const TYPE_ID_STORELOCATION:string = "storelocation";


function createStoreLocation():StoreLocation {
    "use strict";
    return new StoreLocation();
}


export class StoreLocation implements ISerializable, ITrackDirty {

    private _id:string;
    private _name: string;
    private _isDirty: boolean;


    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_STORELOCATION, createStoreLocation);
    }


    constructor(name?: string) {
        this._id = TYPE_ID_STORELOCATION + idSep + getUniqueStr();
        this._name = name || "";
        this._isDirty = false;
    }


    public get name(): string {
        return this._name;
    }

    public set name(val:string) {
        this._name = val;
        this._isDirty = true;
    }


    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string {
        return TYPE_ID_STORELOCATION;
    }


    public getId():string {
        return this._id;
    }


    public serialize(): ISerializeInfo {
        return {
            schema: 1,
            pojo: {name: this._name},
            additional: []
        };
    }


    // todo: Create a type for the returned array of pass2 functions.
    public deserialize(schema: number, id:string, pojo:any): any[] {
        let pass2Funcs:{}[] = [];

        if (schema === 1) {
            this._id = id;
            this._name = pojo.name;
            this._isDirty = false;
        } else {
            throw new Error("Unknown Store schema " + schema);
        }

        return pass2Funcs;
    }
    //endregion

    //region ITrackDirty ///////////////////////////////////////////////////////

    public isDirty():boolean {
        return this._isDirty;
    }
    public setClean():void {
        this._isDirty = false;
    }

    //endregion
}
