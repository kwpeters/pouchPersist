import {IDocument} from "./interfaces";
import {SerializationRegistry} from "./serializationRegistry";
import {Store} from "./store";
import {StoreLocation} from "./storeLocation";

describe("SerializationRegistry", function ():void {
    "use strict";

    it("should serialize as expected", function ():void {

        let serReg:SerializationRegistry = new SerializationRegistry();
        Store.register(serReg);
        StoreLocation.register(serReg);

        let store1:Store = new Store("Store 1");
        let sl1:StoreLocation = new StoreLocation("Aisle 1");
        store1.appendStoreLocation(sl1);
        let sl2:StoreLocation = new StoreLocation("Aisle 2");
        store1.appendStoreLocation(sl2);

        let result:IDocument[] = serReg.serializeGraph(store1);

        //console.log(JSON.stringify(result, null, 2));

        expect(result).toEqual(
            [
                {
                    typeId: "store",
                    schema: 1,
                    _id:    store1.getId(),
                    _rev:   "1",
                    pojo:   {
                        name: "Store 1",
                        storeLocations: [sl1.getId(), sl2.getId()]
                    }
                },
                {
                    typeId: "storelocation",
                    schema: 1,
                    _id:    sl1.getId(),
                    _rev:   "1",
                    pojo:   {
                        name: "Aisle 1"
                    }
                },
                {
                    typeId: "storelocation",
                    schema: 1,
                    _id:    sl2.getId(),
                    _rev:   "1",
                    pojo:   {
                        name: "Aisle 2"
                    }
                }

            ]
        );

    });

    it("should deserialize as expected", function ():void {
        let json:string = `
        [
          {
            "schema": 1,
            "pojo": {
              "name": "Store 1",
              "storeLocations": [
                "storelocation/2015-12-11T02:20:12.313Z_4",
                "storelocation/2015-12-11T02:20:12.314Z_5"
              ]
            },
            "typeId": "store",
            "_id": "store/2015-12-11T02:20:12.313Z_3",
            "_rev": "1"
          },
          {
            "schema": 1,
            "pojo": {
              "name": "Aisle 1"
            },
            "typeId": "storelocation",
            "_id": "storelocation/2015-12-11T02:20:12.313Z_4",
            "_rev": "1"
          },
          {
            "schema": 1,
            "pojo": {
              "name": "Aisle 2"
            },
            "typeId": "storelocation",
            "_id": "storelocation/2015-12-11T02:20:12.314Z_5",
            "_rev": "1"
          }
        ]`;

        let serReg:SerializationRegistry = new SerializationRegistry();
        Store.register(serReg);
        StoreLocation.register(serReg);

        let store:Store = <Store>serReg.deserializeGraph(json);
        expect(store).toBeDefined();
        expect(store.isDirty()).toBeFalsy();
        expect(store.name).toEqual("Store 1");
        expect(store.getTypeId()).toEqual("store");
        expect(store.getId()).toEqual("store/2015-12-11T02:20:12.313Z_3");

        let storeLocations:StoreLocation[] = store.getStoreLocations();
        expect(storeLocations.length).toBe(2);

        let location1:StoreLocation = storeLocations[0];
        let location2:StoreLocation = storeLocations[1];

        expect(location1.name).toBe("Aisle 1");
        expect(location2.name).toBe("Aisle 2");
        expect(location1.getTypeId()).toBe("storelocation");
        expect(location2.getTypeId()).toBe("storelocation");
        expect(location1.getId()).toBe("storelocation/2015-12-11T02:20:12.313Z_4");
        expect(location2.getId()).toBe("storelocation/2015-12-11T02:20:12.314Z_5");
    });
});
