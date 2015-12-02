
export interface ISerializeInfo {
    schema: number;
    pojo:   any;
}


export interface ISerialize {
    serialize(): ISerializeInfo;
}


export interface IDeserialize {
    (schema: number, pojo: any): any;
}
