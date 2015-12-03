import {Store} from "./Store";
import {StoreLocation} from "./storeLocation";

describe("Store", function ():void {
    "use strict";

    let store1:Store;

    beforeEach(function ():void {
        store1 = new Store("Store 1");
    });

    it("should be creatable", function (): void {
        let store:Store = new Store("New Store");
        expect(store).toBeDefined();
    });

    describe("appendStoreLocation()", function ():void {

        it("appendStoreLocation() should make the store dirty", function ():void {
            let produce:StoreLocation = new StoreLocation("Produce");
            store1.appendStoreLocation(produce);
            expect(store1.isDirty()).toBeTruthy();
        });

    });

});
