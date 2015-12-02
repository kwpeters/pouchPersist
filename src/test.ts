import * as interfaces  from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {Item} from "./item";
import {Store} from "./store";

let serializationRegistry: SerializationRegistry = new SerializationRegistry();
Item.register(serializationRegistry);
Store.register(serializationRegistry);


// The original object.
let origItem: Item = new Item("my new item");
let origStore:Store = new Store("my new store");

// Serialize it.
let itemDoc:interfaces.IDocument = serializationRegistry.serialize(origItem);
let storeDoc:interfaces.IDocument = serializationRegistry.serialize(origStore);

// Deserialize it.
let rehydratedItem: Item = serializationRegistry.deserialize<Item>(itemDoc);
let rehydratedStore: Store = serializationRegistry.deserialize<Store>(storeDoc);

console.log("rehydratedItem", rehydratedItem);
console.log("rehydratedStore", rehydratedStore);
