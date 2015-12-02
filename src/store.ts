
import {ISerializeInfo, ISerializable} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";

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


export class Store implements ISerializable {

    private _name: string;

    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_STORE, deserializeStore);
    }


    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }



    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string {
        return TYPE_ID_STORE;
    }

    public serialize(): ISerializeInfo {
        return {
            schema: 1,
            pojo: {name: this._name}
        };
    }
    //endregion
}
