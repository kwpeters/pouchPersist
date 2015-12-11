var q = require('q'),
    mergeStream = require('merge-stream');



function processTsResults(tsResults, mergedStream) {

    var dfd     = q.defer(),
        consume = require('stream-consume');

    // Errors are not propagated in merged streams, so we subscribe for
    // error events on the individual streams.
    tsResults.js.once('error', function (err) {
        var message = "TypeScript stream errored.";
        console.log(message);
        dfd.reject(new Error(message));
    });

    tsResults.dts.once('error', function (err) {
        var message = "DTS stream errored.";
        console.log(message);
        dfd.reject(new Error(message));
    });

    // Workaround for issue where readable streams are not processed
    // unless there is a consumer.
    consume(mergedStream);

    mergedStream.once('end', function () {
        dfd.resolve();
    });

    return dfd.promise;
}

module.exports = {
    processTsResults: processTsResults
};