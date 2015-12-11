import {ISerializable, ICreator, IDocument, getBlankDocument} from "./interfaces";
import {ISerializeInfo} from "./interfaces";

type SerializationResults = {doc:IDocument, additional: ISerializable[]};

export class SerializationRegistry {

    private _registry: {};

    public constructor() {
        this._registry = {};
    }

    public registerType<T extends ISerializable>(typeId: string, creatorFunc:ICreator<T>): void {

        // If this registry already has the specified type registered, return
        // false;
        if (this._registry[typeId]) {
            throw new Error("Type " + typeId + " is already registered.");
        }

        this._registry[typeId] = creatorFunc;
    }

    public serializeGraph(rootObj:ISerializable):IDocument[] {
        let docs:IDocument[] = [];
        let toSerialize: ISerializable[] = [rootObj];

        while (toSerialize.length > 0) {
            let curObj:ISerializable = toSerialize.shift();

            let serializationResults:SerializationResults = this.serialize(curObj);
            docs.push(serializationResults.doc);
            toSerialize = toSerialize.concat(serializationResults.additional);
        }

        return docs;
    }

    public deserializeGraph(jsonText): ISerializable {

        let docsToDeserialize:IDocument[] = JSON.parse(jsonText);
        let rootObj:ISerializable;
        let objDict: {} = {};
        let callbacks: any[] = [];

        // First, go through the documents are create their associated objects.
        // As each object is deserialized, the object will return an array of
        // function that need to be invoked once all objects have been created.
        // This is done so that references to other objects can be reestablished.
        while (docsToDeserialize.length > 0) {
            let curDoc:IDocument = docsToDeserialize.shift();
            let curCreatorFunc: any = this._registry[curDoc.typeId];
            let curObj:ISerializable = curCreatorFunc();

            // Give the object any special persistence properties.
            curObj._rev = curDoc._rev;
            // Let the object fill in the properties that it knows about.
            let curCallbacks:any[] = curObj.deserialize(curDoc.schema, curDoc._id, curDoc.pojo);
            callbacks = callbacks.concat(curCallbacks);

            // Add the current object to a dictionary of all objects.  This will
            // help other objects find their referenced objects quicker when
            // calling the callbacks.
            objDict[curDoc._id] = curObj;

            // If this is the first document deserialized, it must be the root
            // object.
            if (rootObj === undefined) {
                rootObj = curObj;
            }
        }

        // Second, now that all objects have been created, invoke each callback
        // and let the objects reestablish thier references to other objects.
        callbacks.forEach((curCallback:any) => curCallback(objDict));

        return rootObj;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Helper methods
    ////////////////////////////////////////////////////////////////////////////

    private serialize(obj:ISerializable): SerializationResults {

        let curDoc:IDocument = getBlankDocument();
        let serializeInfo:ISerializeInfo = obj.serialize();

        curDoc.schema = serializeInfo.schema;
        curDoc.pojo   = serializeInfo.pojo;
        curDoc.typeId = obj.getTypeId();
        curDoc._id    = obj.getId();

        if (obj._rev) {
            curDoc._rev = obj._rev;
        }

        // todo: Save it.

        // Mock creation of _rev.
        if (curDoc._rev) {
            let newRevInt:number = parseInt(curDoc._rev, 10) + 1;
            curDoc._rev = newRevInt.toString();
        } else {
            curDoc._rev = "1";
        }

        obj._rev = curDoc._rev;

        return {doc: curDoc, additional: serializeInfo.additional};
    }


}
