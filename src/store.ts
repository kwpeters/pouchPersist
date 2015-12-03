import {ISerializeInfo, ISerializable, ITrackDirty} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {StoreLocation} from "./StoreLocation";

const TYPE_ID_STORE:string = "store";


function deserializeStore(schema:number, pojo:any): Store {
    "use strict";

    let newStore: Store;

    switch (schema) {
        case 1:
            newStore = new Store(pojo.name);
            break;

        default:
            throw new Error("Unknown Store schema " + schema);
    }

    return newStore;
}


export class Store implements ISerializable, ITrackDirty {

    private _name: string;
    private _storeLocations: StoreLocation[];
    private _isDirty: boolean;


    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_STORE, deserializeStore);
    }


    constructor(name: string) {
        this._name = name;
        this._storeLocations = [];
        this._isDirty = false;
    }

    public get name(): string {
        return this._name;
    }

    public appendStoreLocation(storeLocation: StoreLocation): void {
        this._storeLocations.push(storeLocation);
        this._isDirty = true;
    }


    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string {
        return TYPE_ID_STORE;
    }

    public serialize(): ISerializeInfo {

        let pojo:any = {name: this._name};
        pojo.storeLocations = this._storeLocations.map(function (curStoreLoc:StoreLocation):any {
            return curStoreLoc.serialize();
        });

        return {
            schema: 1,
            pojo: pojo
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
