import {ISerializable, ISerializeInfo, IDeserializer, IDocument, getBlankDocument} from "./interfaces";

export class SerializationRegistry {

    private _registry: any;

    public constructor() {
        this._registry = {};
    }

    public registerType<T extends ISerializable>(typeId: string, deserializer: IDeserializer<T>): void {

        // If this registry already has the specified type registered, return
        // false;
        if (this._registry[typeId]) {
            throw new Error("Type " + typeId + " is already registered.");
        }

        this._registry[typeId] = deserializer;
    }


    public serialize(obj: ISerializable):IDocument {

        // Build the document to be persisted.
        let doc:IDocument = getBlankDocument();
        let serializeInfo: ISerializeInfo = obj.serialize();

        doc.schema = serializeInfo.schema;
        doc.pojo   = serializeInfo.pojo;
        doc.typeId = obj.getTypeId();

        if (obj.serializationMetadata) {
            // The object already has serialization metadata.  Assign those
            // properties to the root of the document.
            _.assign(doc, obj.serializationMetadata);
        } else {
            // The object has not been serialized before.  Generate an _id
            // for it.

            // todo: Generate an _id for the object and add it to doc.
            // Mock assignment of _id.
            doc._id = "id";
        }

        // todo: Save it.
        // Mock the creation of _rev.
        doc._rev = "1";

        // Update the original object's serialization metadata.
        obj.serializationMetadata = {_id: doc._id, _rev: doc._rev};

        return doc;
    }

    public deserialize<T extends ISerializable>(doc: IDocument): T {
        if (!this._registry[doc.typeId]) {
            throw new Error("Unknown type " + doc.typeId);
        }

        let deserializer: IDeserializer<T> = this._registry[doc.typeId];
        let rehydratedObj: T = deserializer(doc.schema, doc.pojo);

        // Put serialization metadata onto the object.
        rehydratedObj.serializationMetadata = {_id: doc._id, _rev: doc._rev};

        return rehydratedObj;
    }

}
