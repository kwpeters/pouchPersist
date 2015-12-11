import {ISerializeInfo, ISerializable, ITrackDirty} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {idSep, getUniqueStr} from "./pouchHelpers";
import {StoreLocation} from "./StoreLocation";

const TYPE_ID_STORE:string = "store";


function createStore():Store {
    "use strict";
    return new Store();
}


export class Store implements ISerializable, ITrackDirty {

    private _id:string;
    private _name: string;
    private _storeLocations: StoreLocation[];
    private _isDirty: boolean;


    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_STORE, createStore);
    }


    constructor(name?: string) {
        this._id = TYPE_ID_STORE + idSep + getUniqueStr();
        this._name = name || "";
        this._storeLocations = [];
        this._isDirty = false;
    }


    public get name(): string {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
        this._isDirty = true;
    }


    public appendStoreLocation(storeLocation: StoreLocation): void {
        this._storeLocations.push(storeLocation);
        this._isDirty = true;
    }

    public getStoreLocations(): StoreLocation[] {
        return this._storeLocations.slice();
    }


    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string {
        return TYPE_ID_STORE;
    }


    public getId():string {
        return this._id;
    }


    public serialize(): ISerializeInfo {

        let pojo:any = {name: this._name};
        pojo.storeLocations = this._storeLocations.map(
            function (curStoreLoc:StoreLocation):string {
                return curStoreLoc.getId();
            }
        );

        return {
            schema:     1,
            pojo:       pojo,
            additional: this._storeLocations
        };
    }

    // todo: Create a type for the returned array of pass2 functions.
    public deserialize(schema: number, id:string, pojo:any): any[] {
        let pass2Funcs:{}[] = [];

        if (schema === 1) {
            this._id = id;
            this._name = pojo.name;
            pass2Funcs.push(
                (objIdMap:{}) => {
                    pojo.storeLocations.forEach((curStoreLocationId:string) => {
                        this._storeLocations.push(objIdMap[curStoreLocationId]);
                    });
                }
            );
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
