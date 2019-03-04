import { getErrorMessage, } from './helpers';
var HistoryProvider = /** @class */ (function () {
    /**
     *
     * @param datafeedUrl 接口域名地址
     * @param requester
     * @param param 数据接口参数，外部传入（为新增参数）
     */
    function HistoryProvider(datafeedUrl, requester, param) {
        this._datafeedUrl = datafeedUrl;
        this._requester = requester;
        this._param = param;
        this._endData = 0;
    }
    HistoryProvider.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate) {
        var _this = this;
        /**
         * 交易历史记录，使用外部传入参数
         */
        // const requestParams: RequestParams = {
        // 	symbol: symbolInfo.ticker || '',
        // 	resolution: resolution,
        // 	from: rangeStartDate,
        // 	to: rangeEndDate
        // };
        var requestParams = this._param;
        return new Promise(function (resolve, reject) {
            // console.log(rangeEndDate*1000 +"=="+ this._endData)
            // 验证最后一条数据与K线图往左拉的时间验证，避免频繁刷新
            if (_this._endData <= rangeEndDate * 1000 || _this._endData == 0) {
                _this._requester.sendRequest(_this._datafeedUrl, 'api/json/kinfo.do', requestParams)
                    .then(function (response) {
                    if (response.success === false && response.s !== 'no_data') {
                        reject(response.errMsg);
                        return;
                    }
                    var bars = [];
                    var meta = {
                        noData: false,
                    };
                    /**
                     * 将交易平台的数据整合到bars对象里，下面需注意2点
                     * 1.不能直接将response的引用对象，JSON.parse(JSON.stringify(response))为赋值内容，
                     *   否则要改动response本身的数据接口，改动很大
                     * 2.由于本身的数据里的时间是由远到近，而我们的数据列表，时间是由近到远，渲染不了数据，
                     *   使用reverse将数据反转过来
                     */
                    var res = JSON.parse(JSON.stringify(response));
                    for (var _i = 0, _a = res.data.kinfos.reverse(); _i < _a.length; _i++) {
                        var item = _a[_i];
                        var barValue = {
                            time: item.createTime,
                            close: Number(item.close),
                            open: Number(item.open),
                            high: Number(item.high),
                            low: Number(item.low),
                            volume: Number(item.volume)
                        };
                        bars.push(barValue);
                    }
                    _this._endData = res.data.kinfos[0].createTime;
                    // if (response.s === 'no_data') {
                    // 	meta.noData = true;
                    // 	meta.nextTime = response.nextTime;
                    // } else {
                    // 	const volumePresent = response.v !== undefined;
                    // 	const ohlPresent = response.o !== undefined;
                    // 	for (let i = 0; i < response.t.length; ++i) {
                    // 		const barValue: Bar = {
                    // 			time: response.t[i] * 1000,
                    // 			close: Number(response.c[i]),
                    // 			open: Number(response.c[i]),
                    // 			high: Number(response.c[i]),
                    // 			low: Number(response.c[i]),
                    // 		};
                    // 		if (ohlPresent) {
                    // 			barValue.open = Number((response as HistoryFullDataResponse).o[i]);
                    // 			barValue.high = Number((response as HistoryFullDataResponse).h[i]);
                    // 			barValue.low = Number((response as HistoryFullDataResponse).l[i]);
                    // 		}
                    // 		if (volumePresent) {
                    // 			barValue.volume = Number((response as HistoryFullDataResponse).v[i]);
                    // 		}
                    // 		bars.push(barValue);
                    // 	}
                    // }
                    resolve({
                        bars: bars,
                        meta: meta,
                    });
                })
                    .catch(function (reason) {
                    var reasonString = getErrorMessage(reason);
                    console.warn("HistoryProvider: getBars() failed, error=" + reasonString);
                    reject(reasonString);
                });
            }
        });
    };
    return HistoryProvider;
}());
export { HistoryProvider };
