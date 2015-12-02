import * as interfaces  from "./interfaces";
import {Item} from "./item";

let origItem: Item = new Item("my new item");
let serializeInfo: interfaces.ISerializeInfo = origItem.serialize();
let rehydratedItem: Item = Item.deserialize(serializeInfo.schema, serializeInfo.pojo);

console.log("After round trip, I have an Item with name", rehydratedItem.name);
