import * as interfaces  from "./interfaces";


let itemDeserializer: interfaces.IDeserialize = interfaces.itemDeserialize;
let newItem: interfaces.Item = itemDeserializer(1);
console.log(newItem);
console.log(newItem.name);
