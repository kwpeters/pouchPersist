import {getUniqueStr} from "./pouchHelpers";

describe("getUniqueStr()", function ():void {
    "use strict";

    it("should generate a unique string each time", function ():void {

        let str1:string = getUniqueStr();
        let str2:string;

        runs(function ():void {
            setTimeout(
                function ():void {
                    str2 = getUniqueStr();
                },
                10);
            }
        );

        waitsFor(function ():boolean {
            return str2 !== undefined;
        });

        runs(function ():void {
            expect(str1).not.toEqual(str2);
        });

    });
});
