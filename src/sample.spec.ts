/* global describe */
/* global it */
/* global expect */
/* global jasmine */

describe("true", function ():void {
    "use strict";

    // jasmine-node uses jasmine version 1.3.

    it("should be truthy", function (): void {
        expect(true).toBeTruthy();
    });
});
