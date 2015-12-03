import * as interfaces  from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {Item} from "./item";
import {Store} from "./store";
import {StoreLocation} from "./storeLocation";

// Setup the serialization registry.
let serializationRegistry: SerializationRegistry = new SerializationRegistry();
Item.register(serializationRegistry);
Store.register(serializationRegistry);
StoreLocation.register(serializationRegistry);







// The original object.
let origStore:Store = new Store("Heinens");
origStore.appendStoreLocation(new StoreLocation("Produce"));
origStore.appendStoreLocation(new StoreLocation("Healthcare"));
origStore.appendStoreLocation(new StoreLocation("Breakfast"));

// Serialize it.
let storeDoc:interfaces.IDocument = serializationRegistry.serialize(origStore);
console.log(JSON.stringify(storeDoc, null, 2));

// Deserialize it.
//let rehydratedStore: Store = serializationRegistry.deserialize<Store>(storeDoc);


//console.log("rehydratedStore", rehydratedStore);
