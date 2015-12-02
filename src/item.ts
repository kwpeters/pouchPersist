
import {ISerializeInfo, ISerialize} from "./interfaces";

export class Item implements ISerialize {

    private _name: string;

    public static deserialize(schema: number, pojo: any): Item {
        return new Item(pojo.name);
    }

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public serialize(): ISerializeInfo {
        return {
            schema: 1,
            pojo: {name: this._name}
        };
    }
}
