import * as interfaces  from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {Item} from "./item";

let serializationRegistry: SerializationRegistry = new SerializationRegistry();
Item.register(serializationRegistry);


// The original object.
let origItem: Item = new Item("my new item");

// Serialize it.
let doc:interfaces.IDocument = serializationRegistry.serialize(origItem);

// Deserialize it.
let rehydrated: interfaces.ISerializable = serializationRegistry.deserialize(doc);

console.log("After round trip, I have an Item:", rehydrated);
