

export interface ISerialize {
    serialize(): {schema: number, value: any};
}


export interface IDeserialize {
    (schema: number): any;
}


export class Item implements ISerialize {
    private _name: string;

    constructor() {
        this._name = "new_item_name";
    }

    public get name(): string {
        return this._name;
    }

    public serialize(): {schema: number, value: any} {
        return {
            schema: 1,
            value: {name: "item_name"}
        };
    }
}


export function itemDeserialize(schema: number): Item {
    "use strict";

    return new Item();
}

