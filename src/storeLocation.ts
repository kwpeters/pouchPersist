import {ISerializeInfo, ISerializable, ITrackDirty} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";

const TYPE_ID_STORELOCATION:string = "storelocation";


function deserializeStoreLocation(schema:number, pojo:any): StoreLocation {
    "use strict";

    let newStoreLocation: StoreLocation;

    switch (schema) {
        case 1:
            newStoreLocation = new StoreLocation(pojo.name);
            break;

        default:
            throw new Error("Unknown StoreLocation schema " + schema);
    }

    return newStoreLocation;
}


export class StoreLocation implements ISerializable, ITrackDirty {

    private _name: string;
    private _isDirty: boolean;

    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_STORELOCATION, deserializeStoreLocation);
    }


    constructor(name: string) {
        this._name = name;
        this._isDirty = false;
    }

    public get name(): string {
        return this._name;
    }


    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string {
        return TYPE_ID_STORELOCATION;
    }

    public serialize(): ISerializeInfo {
        return {
            schema: 1,
            pojo: {name: this._name}
        };
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
