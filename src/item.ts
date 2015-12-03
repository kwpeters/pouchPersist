
import {ISerializeInfo, ISerializable, ITrackDirty} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";

const TYPE_ID_ITEM:string = "item";


function deserializeItem(schema:number, pojo:any): Item {
    "use strict";

    let newItem: Item;

    switch (schema) {
        case 1:
            newItem = new Item(pojo.name);
            break;
        default:
            throw new Error("Unknown Item schema " + schema);

    }

    return newItem;
}


export class Item implements ISerializable, ITrackDirty {

    private _name: string;
    private _isDirty: boolean;

    public static register(serializationRegistry:SerializationRegistry):void {
        serializationRegistry.registerType(TYPE_ID_ITEM, deserializeItem);
    }


    constructor(name: string) {
        this._name = name;
        this._isDirty = false;
    }

    public get name(): string {
        return this._name;
    }

    //region ISerializable /////////////////////////////////////////////////////

    public getTypeId(): string{
        return ;
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
