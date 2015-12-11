describe("true", function ():void {
    "use strict";

    // jasmine-node uses jasmine version 1.3.

    it("should be truthy", function (): void {
        expect(true).toBeTruthy();
    });
});

describe("misc tests", function ():void {
    it("should work", function ():void {


        type entry = {type: string, val: number};

        let entry1:entry = {type: "foo", val: 1};
        let entry2:entry = {type: "bar", val: 1};

        let reg:{} = {};

        reg[entry1.type] = entry1;
        reg[entry2.type] = entry2;

        expect(reg[entry1.type].val).toEqual(1);

    });
});
