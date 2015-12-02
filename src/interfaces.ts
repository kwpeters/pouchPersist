
export interface ISerializeInfo {
    schema: number;
    pojo:   any;
}

export interface IDocument{
    schema: number;
    pojo:   any;
    typeId: string;
    _id:    string;
    _rev?:  string;
}

export const DOCUMENT_BLANK:IDocument = {schema: 0, pojo: undefined, typeId: "", _id: "", _rev: ""};

export interface ISerializationMetadata {
    _id: string;
    _rev: string;
}


export interface ISerializable {
    serializationMetadata?: ISerializationMetadata;
    getTypeId(): string;
    serialize(): ISerializeInfo;
}


export interface IDeserializer {
    (schema: number, pojo: any): ISerializable;
}
