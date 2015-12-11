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






