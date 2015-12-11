export interface ISerializable {
    _rev?: string;

    getTypeId(): string;
    getId(): string;
    serialize(): ISerializeInfo;
    // todo: Create a type for the following return type (func).
    deserialize(schema: number, id:string, pojo:any): any[];

}


export interface ISerializeInfo {
    schema: number;
    pojo:   any;
    additional: ISerializable[];
}


export interface IDocument {
    schema: number;
    pojo:   any;
    typeId: string;
    _id:    string;
    _rev?:  string;
}


export function getBlankDocument(): IDocument {
    "use strict";
    return {schema: 0, pojo: undefined, typeId: "", _id: "", _rev: ""};
}


//export interface IDeserializer<T extends ISerializable> {
//    (schema: number, pojo: any, id:string): T;
//}
export interface ICreator<T extends ISerializable> {
    (): T;
}


export interface ITrackDirty {
    isDirty():boolean;
    setClean():void;
}
