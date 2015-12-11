
export const idSep:string = "/";

let incr:number = 0;

export function getUniqueStr():string {
    "use strict";
    let str:string = new Date().toISOString() + "_" + ++incr;
    return str;
}
