import * as tslib_1 from "tslib";
import { UDFCompatibleDatafeedBase } from './udf-compatible-datafeed-base';
import { QuotesProvider } from './quotes-provider';
import { Requester } from './requester';
var UDFCompatibleDatafeed = /** @class */ (function (_super) {
    tslib_1.__extends(UDFCompatibleDatafeed, _super);
    /**
     *
     * @param datafeedURL 接口域名地址
     * @param updateFrequency
     * @param param 数据接口参数，外部传入（为新增参数）
     */
    function UDFCompatibleDatafeed(datafeedURL, updateFrequency, param) {
        if (updateFrequency === void 0) { updateFrequency = 10 * 1000; }
        var _this = this;
        var requester = new Requester();
        var quotesProvider = new QuotesProvider(datafeedURL, requester);
        _this = _super.call(this, datafeedURL, quotesProvider, requester, updateFrequency, param) || this;
        return _this;
    }
    return UDFCompatibleDatafeed;
}(UDFCompatibleDatafeedBase));
export { UDFCompatibleDatafeed };
