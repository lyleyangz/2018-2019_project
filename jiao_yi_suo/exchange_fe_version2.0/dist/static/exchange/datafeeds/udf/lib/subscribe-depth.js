var SubscribeDepth = /** @class */ (function () {
    function SubscribeDepth(symbolInfo) {
        this._data = {
            snapshot: true,
            asks: [{
                    price: 0.1, volume: 1
                }],
            bids: [{
                    price: 0.3, volume: 1
                }],
        };
    }
    SubscribeDepth.prototype.subscribeDepth = function (symbolInfo, callback) {
        console.log(callback(this._data));
        return new Promise(function (resolve) {
            resolve(({
                snapshot: true,
                asks: [{
                        price: 0.1, volume: 1
                    }],
                bids: [{
                        price: 0.3, volume: 1
                    }],
            }));
        });
    };
    return SubscribeDepth;
}());
export { SubscribeDepth };
