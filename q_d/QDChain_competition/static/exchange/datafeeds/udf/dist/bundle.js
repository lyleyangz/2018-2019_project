(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Datafeeds = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * If you want to enable logs from datafeed set it to `true`
 */
var isLoggingEnabled = false;
function logMessage(message) {
    if (isLoggingEnabled) {
        var now = new Date();
        console.log(now.toLocaleTimeString() + "." + now.getMilliseconds() + "> " + message);
    }
}
function getErrorMessage(error) {
    if (error === undefined) {
        return '';
    }
    else if (typeof error === 'string') {
        return error;
    }
    return error.message;
}

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

var DataPulseProvider = /** @class */ (function () {
    function DataPulseProvider(historyProvider, updateFrequency) {
        this._subscribers = {};
        this._requestsPending = 0;
        this._historyProvider = historyProvider;
        setInterval(this._updateData.bind(this), updateFrequency);
    }
    DataPulseProvider.prototype.subscribeBars = function (symbolInfo, resolution, newDataCallback, listenerGuid) {
        if (this._subscribers.hasOwnProperty(listenerGuid)) {
            logMessage("DataPulseProvider: already has subscriber with id=" + listenerGuid);
            return;
        }
        this._subscribers[listenerGuid] = {
            lastBarTime: null,
            listener: newDataCallback,
            resolution: resolution,
            symbolInfo: symbolInfo,
        };
        logMessage("DataPulseProvider: subscribed for #" + listenerGuid + " - {" + symbolInfo.name + ", " + resolution + "}");
    };
    DataPulseProvider.prototype.unsubscribeBars = function (listenerGuid) {
        delete this._subscribers[listenerGuid];
        logMessage("DataPulseProvider: unsubscribed for #" + listenerGuid);
    };
    DataPulseProvider.prototype._updateData = function () {
        var this$1 = this;

        var _this = this;
        if (this._requestsPending > 0) {
            return;
        }
        this._requestsPending = 0;
        var _loop_1 = function (listenerGuid) {
            this_1._requestsPending += 1;
            this_1._updateDataForSubscriber(listenerGuid)
                .then(function () {
                _this._requestsPending -= 1;
                logMessage("DataPulseProvider: data for #" + listenerGuid + " updated successfully, pending=" + _this._requestsPending);
            })
                .catch(function (reason) {
                _this._requestsPending -= 1;
                logMessage("DataPulseProvider: data for #" + listenerGuid + " updated with error=" + getErrorMessage(reason) + ", pending=" + _this._requestsPending);
            });
        };
        var this_1 = this;
        for (var listenerGuid in this$1._subscribers) {
            _loop_1(listenerGuid);
        }
    };
    DataPulseProvider.prototype._updateDataForSubscriber = function (listenerGuid) {
        var _this = this;
        var subscriptionRecord = this._subscribers[listenerGuid];
        var rangeEndTime = parseInt((Date.now() / 1000).toString());
        // BEWARE: please note we really need 2 bars, not the only last one
        // see the explanation below. `10` is the `large enough` value to work around holidays
        var rangeStartTime = rangeEndTime - periodLengthSeconds(subscriptionRecord.resolution, 10);
        return this._historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeEndTime, rangeStartTime)
            .then(function (result) {
            _this._onSubscriberDataReceived(listenerGuid, result);
        });
    };
    DataPulseProvider.prototype._onSubscriberDataReceived = function (listenerGuid, result) {
        // means the subscription was cancelled while waiting for data
        if (!this._subscribers.hasOwnProperty(listenerGuid)) {
            logMessage("DataPulseProvider: Data comes for already unsubscribed subscription #" + listenerGuid);
            return;
        }
        var bars = result.bars;
        if (bars.length === 0) {
            return;
        }
        var lastBar = bars[bars.length - 1];
        var subscriptionRecord = this._subscribers[listenerGuid];
        if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) {
            return;
        }
        var isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime;
        // Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
        // old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
        if (isNewBar) {
            if (bars.length < 2) {
                throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
            }
            var previousBar = bars[bars.length - 2];
            subscriptionRecord.listener(previousBar);
        }
        subscriptionRecord.lastBarTime = lastBar.time;
        subscriptionRecord.listener(lastBar);
    };
    return DataPulseProvider;
}());
function periodLengthSeconds(resolution, requiredPeriodsCount) {
    var daysCount = 0;
    if (resolution === 'D') {
        daysCount = requiredPeriodsCount;
    }
    else if (resolution === 'M') {
        daysCount = 31 * requiredPeriodsCount;
    }
    else if (resolution === 'W') {
        daysCount = 7 * requiredPeriodsCount;
    }
    else {
        daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60);
    }
    return daysCount * 24 * 60 * 60;
}

var QuotesPulseProvider = /** @class */ (function () {
    function QuotesPulseProvider(quotesProvider) {
        this._subscribers = {};
        this._requestsPending = 0;
        this._quotesProvider = quotesProvider;
        setInterval(this._updateQuotes.bind(this, 1 /* Fast */), 10000 /* Fast */);
        setInterval(this._updateQuotes.bind(this, 0 /* General */), 60000 /* General */);
    }
    QuotesPulseProvider.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
        this._subscribers[listenerGuid] = {
            symbols: symbols,
            fastSymbols: fastSymbols,
            listener: onRealtimeCallback,
        };
        logMessage("QuotesPulseProvider: subscribed quotes with #" + listenerGuid);
    };
    QuotesPulseProvider.prototype.unsubscribeQuotes = function (listenerGuid) {
        delete this._subscribers[listenerGuid];
        logMessage("QuotesPulseProvider: unsubscribed quotes with #" + listenerGuid);
    };
    QuotesPulseProvider.prototype._updateQuotes = function (updateType) {
        var this$1 = this;

        var _this = this;
        if (this._requestsPending > 0) {
            return;
        }
        var _loop_1 = function (listenerGuid) {
            this_1._requestsPending++;
            var subscriptionRecord = this_1._subscribers[listenerGuid];
            this_1._quotesProvider.getQuotes(updateType === 1 /* Fast */ ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols)
                .then(function (data) {
                _this._requestsPending--;
                if (!_this._subscribers.hasOwnProperty(listenerGuid)) {
                    return;
                }
                subscriptionRecord.listener(data);
                logMessage("QuotesPulseProvider: data for #" + listenerGuid + " (" + updateType + ") updated successfully, pending=" + _this._requestsPending);
            })
                .catch(function (reason) {
                _this._requestsPending--;
                logMessage("QuotesPulseProvider: data for #" + listenerGuid + " (" + updateType + ") updated with error=" + getErrorMessage(reason) + ", pending=" + _this._requestsPending);
            });
        };
        var this_1 = this;
        for (var listenerGuid in this$1._subscribers) {
            _loop_1(listenerGuid);
        }
    };
    return QuotesPulseProvider;
}());

function extractField$1(data, field, arrayIndex) {
    var value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
}
var SymbolsStorage = /** @class */ (function () {
    function SymbolsStorage(datafeedUrl, datafeedSupportedResolutions, requester) {
        this._exchangesList = ['NYSE', 'FOREX', 'AMEX'];
        this._symbolsInfo = {};
        this._symbolsList = [];
        this._datafeedUrl = datafeedUrl;
        this._datafeedSupportedResolutions = datafeedSupportedResolutions;
        this._requester = requester;
        this._readyPromise = this._init();
        this._readyPromise.catch(function (error) {
            // seems it is impossible
            console.error("SymbolsStorage: Cannot init, error=" + error.toString());
        });
    }
    // BEWARE: this function does not consider symbol's exchange
    SymbolsStorage.prototype.resolveSymbol = function (symbolName) {
        var _this = this;
        return this._readyPromise.then(function () {
            var symbolInfo = _this._symbolsInfo[symbolName];
            if (symbolInfo === undefined) {
                return Promise.reject('invalid symbol');
            }
            return Promise.resolve(symbolInfo);
        });
    };
    SymbolsStorage.prototype.searchSymbols = function (searchString, exchange, symbolType, maxSearchResults) {
        var _this = this;
        return this._readyPromise.then(function () {
            var weightedResult = [];
            var queryIsEmpty = searchString.length === 0;
            searchString = searchString.toUpperCase();
            var _loop_1 = function (symbolName) {
                var symbolInfo = _this._symbolsInfo[symbolName];
                if (symbolInfo === undefined) {
                    return "continue";
                }
                if (symbolType.length > 0 && symbolInfo.type !== symbolType) {
                    return "continue";
                }
                if (exchange && exchange.length > 0 && symbolInfo.exchange !== exchange) {
                    return "continue";
                }
                var positionInName = symbolInfo.name.toUpperCase().indexOf(searchString);
                var positionInDescription = symbolInfo.description.toUpperCase().indexOf(searchString);
                if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
                    var alreadyExists = weightedResult.some(function (item) { return item.symbolInfo === symbolInfo; });
                    if (!alreadyExists) {
                        var weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
                        weightedResult.push({ symbolInfo: symbolInfo, weight: weight });
                    }
                }
            };
            for (var _i = 0, _a = _this._symbolsList; _i < _a.length; _i++) {
                var symbolName = _a[_i];
                _loop_1(symbolName);
            }
            var result = weightedResult
                .sort(function (item1, item2) { return item1.weight - item2.weight; })
                .slice(0, maxSearchResults)
                .map(function (item) {
                var symbolInfo = item.symbolInfo;
                return {
                    symbol: symbolInfo.name,
                    full_name: symbolInfo.full_name,
                    description: symbolInfo.description,
                    exchange: symbolInfo.exchange,
                    params: [],
                    type: symbolInfo.type,
                    ticker: symbolInfo.name,
                };
            });
            return Promise.resolve(result);
        });
    };
    SymbolsStorage.prototype._init = function () {
        var this$1 = this;

        var _this = this;
        var promises = [];
        var alreadyRequestedExchanges = {};
        for (var _i = 0, _a = this._exchangesList; _i < _a.length; _i++) {
            var exchange = _a[_i];
            if (alreadyRequestedExchanges[exchange]) {
                continue;
            }
            alreadyRequestedExchanges[exchange] = true;
            promises.push(this$1._requestExchangeData(exchange));
        }
        return Promise.all(promises)
            .then(function () {
            _this._symbolsList.sort();
            logMessage('SymbolsStorage: All exchanges data loaded');
        });
    };
    SymbolsStorage.prototype._requestExchangeData = function (exchange) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._requester.sendRequest(_this._datafeedUrl, 'symbol_info', { group: exchange })
                .then(function (response) {
                try {
                    _this._onExchangeDataReceived(exchange, response);
                }
                catch (error) {
                    reject(error);
                    return;
                }
                resolve();
            })
                .catch(function (reason) {
                logMessage("SymbolsStorage: Request data for exchange '" + exchange + "' failed, reason=" + getErrorMessage(reason));
                resolve();
            });
        });
    };
    SymbolsStorage.prototype._onExchangeDataReceived = function (exchange, data) {
        var this$1 = this;

        var symbolIndex = 0;
        try {
            var symbolsCount = data.symbol.length;
            var tickerPresent = data.ticker !== undefined;
            for (; symbolIndex < symbolsCount; ++symbolIndex) {
                var symbolName = data.symbol[symbolIndex];
                var listedExchange = extractField$1(data, 'exchange-listed', symbolIndex);
                var tradedExchange = extractField$1(data, 'exchange-traded', symbolIndex);
                var fullName = tradedExchange + ':' + symbolName;
                var ticker = tickerPresent ? extractField$1(data, 'ticker', symbolIndex) : symbolName;
                var symbolInfo = {
                    ticker: ticker,
                    name: symbolName,
                    base_name: [listedExchange + ':' + symbolName],
                    full_name: fullName,
                    listed_exchange: listedExchange,
                    exchange: tradedExchange,
                    description: extractField$1(data, 'description', symbolIndex),
                    has_intraday: definedValueOrDefault(extractField$1(data, 'has-intraday', symbolIndex), false),
                    has_no_volume: definedValueOrDefault(extractField$1(data, 'has-no-volume', symbolIndex), false),
                    minmov: extractField$1(data, 'minmovement', symbolIndex) || extractField$1(data, 'minmov', symbolIndex) || 0,
                    minmove2: extractField$1(data, 'minmove2', symbolIndex) || extractField$1(data, 'minmov2', symbolIndex),
                    fractional: extractField$1(data, 'fractional', symbolIndex),
                    pricescale: extractField$1(data, 'pricescale', symbolIndex),
                    type: extractField$1(data, 'type', symbolIndex),
                    session: extractField$1(data, 'session-regular', symbolIndex),
                    timezone: extractField$1(data, 'timezone', symbolIndex),
                    supported_resolutions: definedValueOrDefault(extractField$1(data, 'supported-resolutions', symbolIndex), this$1._datafeedSupportedResolutions),
                    force_session_rebuild: extractField$1(data, 'force-session-rebuild', symbolIndex),
                    has_daily: definedValueOrDefault(extractField$1(data, 'has-daily', symbolIndex), true),
                    intraday_multipliers: definedValueOrDefault(extractField$1(data, 'intraday-multipliers', symbolIndex), ['1', '5', '15', '30', '60']),
                    has_weekly_and_monthly: extractField$1(data, 'has-weekly-and-monthly', symbolIndex),
                    has_empty_bars: extractField$1(data, 'has-empty-bars', symbolIndex),
                    volume_precision: definedValueOrDefault(extractField$1(data, 'volume-precision', symbolIndex), 0),
                };
                this$1._symbolsInfo[ticker] = symbolInfo;
                this$1._symbolsInfo[symbolName] = symbolInfo;
                this$1._symbolsInfo[fullName] = symbolInfo;
                this$1._symbolsList.push(symbolName);
            }
        }
        catch (error) {
            throw new Error("SymbolsStorage: API error when processing exchange " + exchange + " symbol #" + symbolIndex + " (" + data.symbol[symbolIndex] + "): " + error.message);
        }
    };
    return SymbolsStorage;
}());
function definedValueOrDefault(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
}

function extractField(data, field, arrayIndex) {
    var value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
}
/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
var UDFCompatibleDatafeedBase = /** @class */ (function () {
    /**
     *
     * @param datafeedURL 接口域名地址
     * @param quotesProvider
     * @param requester
     * @param updateFrequency
     * @param param 数据接口参数，外部传入（为新增参数）
     */
    function UDFCompatibleDatafeedBase(datafeedURL, quotesProvider, requester, updateFrequency, param) {
        if (updateFrequency === void 0) { updateFrequency = 10 * 1000; }
        this._configuration = defaultConfiguration();
        this._symbols = defaultSymbols();
        // private readonly _configurationReadyPromise: Promise<void>;
        this._symbolsStorage = null;
        this._datafeedURL = datafeedURL;
        this._requester = requester;
        this._historyProvider = new HistoryProvider(datafeedURL, this._requester, param);
        this._quotesProvider = quotesProvider;
        this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
        this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);
        /**
         * 屏蔽向服务器请求config参数 使用代码最下面的默认配置参数  defaultConfiguration()
         */
        // this._configurationReadyPromise = this._requestConfiguration()
        // 	.then((configuration: UdfCompatibleConfiguration | null) => {
        // 		if(configuration == null){
        // 			configuration = defaultConfiguration();
        // 		}
        // 		this._setupWithConfiguration(configuration);
        // 	});
        this._setupWithConfiguration(this._configuration);
    }
    UDFCompatibleDatafeedBase.prototype.onReady = function (callback) {
        /**
         * 屏蔽config请求，同上
         */
        // this._configurationReadyPromise.then(() => {
        // 	callback(this._configuration);
        // });
        callback(this._configuration);
    };
    UDFCompatibleDatafeedBase.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
        this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
    };
    UDFCompatibleDatafeedBase.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
        this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.unsubscribeQuotes = function (listenerGuid) {
        this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.calculateHistoryDepth = function (resolution, resolutionBack, intervalBack) {
        return undefined;
    };
    UDFCompatibleDatafeedBase.prototype.getMarks = function (symbolInfo, startDate, endDate, onDataCallback, resolution) {
        if (!this._configuration.supports_marks) {
            return;
        }
        var requestParams = {
            symbol: symbolInfo.ticker || '',
            from: startDate,
            to: endDate,
            resolution: resolution,
        };
        this._send('marks', requestParams)
            .then(function (response) {
            if (!Array.isArray(response)) {
                var result = [];
                for (var i = 0; i < response.id.length; ++i) {
                    result.push({
                        id: extractField(response, 'id', i),
                        time: extractField(response, 'time', i),
                        color: extractField(response, 'color', i),
                        text: extractField(response, 'text', i),
                        label: extractField(response, 'label', i),
                        labelFontColor: extractField(response, 'labelFontColor', i),
                        minSize: extractField(response, 'minSize', i),
                    });
                }
                response = result;
            }
            onDataCallback(response);
        })
            .catch(function (error) {
            logMessage("UdfCompatibleDatafeed: Request marks failed: " + getErrorMessage(error));
            onDataCallback([]);
        });
    };
    UDFCompatibleDatafeedBase.prototype.getTimescaleMarks = function (symbolInfo, startDate, endDate, onDataCallback, resolution) {
        if (!this._configuration.supports_timescale_marks) {
            return;
        }
        var requestParams = {
            symbol: symbolInfo.ticker || '',
            from: startDate,
            to: endDate,
            resolution: resolution,
        };
        this._send('timescale_marks', requestParams)
            .then(function (response) {
            if (!Array.isArray(response)) {
                var result = [];
                for (var i = 0; i < response.id.length; ++i) {
                    result.push({
                        id: extractField(response, 'id', i),
                        time: extractField(response, 'time', i),
                        color: extractField(response, 'color', i),
                        label: extractField(response, 'label', i),
                        tooltip: extractField(response, 'tooltip', i),
                    });
                }
                response = result;
            }
            onDataCallback(response);
        })
            .catch(function (error) {
            logMessage("UdfCompatibleDatafeed: Request timescale marks failed: " + getErrorMessage(error));
            onDataCallback([]);
        });
    };
    UDFCompatibleDatafeedBase.prototype.getServerTime = function (callback) {
        if (!this._configuration.supports_time) {
            return;
        }
        this._send('time')
            .then(function (response) {
            var time = parseInt(response);
            if (!isNaN(time)) {
                callback(time);
            }
        })
            .catch(function (error) {
            logMessage("UdfCompatibleDatafeed: Fail to load server time, error=" + getErrorMessage(error));
        });
    };
    UDFCompatibleDatafeedBase.prototype.searchSymbols = function (userInput, exchange, symbolType, onResult) {
        if (this._configuration.supports_search) {
            var params = {
                limit: 30 /* SearchItemsLimit */,
                query: userInput.toUpperCase(),
                type: symbolType,
                exchange: exchange,
            };
            this._send('search', params)
                .then(function (response) {
                if (response.s !== undefined) {
                    logMessage("UdfCompatibleDatafeed: search symbols error=" + response.errmsg);
                    onResult([]);
                    return;
                }
                onResult(response);
            })
                .catch(function (reason) {
                logMessage("UdfCompatibleDatafeed: Search symbols for '" + userInput + "' failed. Error=" + getErrorMessage(reason));
                onResult([]);
            });
        }
        else {
            if (this._symbolsStorage === null) {
                throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
            }
            this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30 /* SearchItemsLimit */)
                .then(onResult)
                .catch(onResult.bind(null, []));
        }
    };
    UDFCompatibleDatafeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
        logMessage('Resolve requested');
        var resolveRequestStartTime = Date.now();
        function onResultReady(symbolInfo) {
            logMessage("Symbol resolved: " + (Date.now() - resolveRequestStartTime) + "ms");
            onResolve(symbolInfo);
        }
        if (!this._configuration.supports_group_request) {
            /**
             * 屏蔽symbols请求，使用代码最下面的默认参数  defaultSymbols()
             */
            // const params: RequestParams = {
            // 	symbol: symbolName,
            // };
            // this._send('symbols', params)
            // 	.then((response: ResolveSymbolResponse | UdfErrorResponse) => {
            // 		if (response.s !== undefined) {
            // 			onError('unknown_symbol');
            // 		} else {
            // 			onResultReady(response);
            // 		}
            // 	})
            // 	.catch((reason?: string | Error) => {
            // 		logMessage(`UdfCompatibleDatafeed: Error resolving symbol: ${getErrorMessage(reason)}`);
            // 		onError('unknown_symbol');
            // 	});
            this._symbols.name = symbolName;
            this._symbols.full_name = symbolName;
            this._symbols.ticker = symbolName;
            onResultReady(this._symbols);
        }
        else {
            if (this._symbolsStorage === null) {
                throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
            }
            this._symbolsStorage.resolveSymbol(symbolName).then(onResultReady).catch(onError);
        }
    };
    UDFCompatibleDatafeedBase.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
        this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
            .then(function (result) {
            onResult(result.bars, result.meta);
        })
            .catch(onError);
    };
    UDFCompatibleDatafeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
        this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.unsubscribeBars = function (listenerGuid) {
        this._dataPulseProvider.unsubscribeBars(listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.setList = function () {
        console.log(1111);
    };
    UDFCompatibleDatafeedBase.prototype._requestConfiguration = function () {
        return this._send('config')
            .catch(function (reason) {
            logMessage("UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=" + getErrorMessage(reason));
            return null;
        });
    };
    UDFCompatibleDatafeedBase.prototype._send = function (urlPath, params) {
        return this._requester.sendRequest(this._datafeedURL, urlPath, params);
    };
    UDFCompatibleDatafeedBase.prototype._setupWithConfiguration = function (configurationData) {
        this._configuration = configurationData;
        if (configurationData.exchanges === undefined) {
            configurationData.exchanges = [];
        }
        if (!configurationData.supports_search && !configurationData.supports_group_request) {
            throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
        }
        if (configurationData.supports_group_request || !configurationData.supports_search) {
            this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
        }
        logMessage("UdfCompatibleDatafeed: Initialized with " + JSON.stringify(configurationData));
    };
    return UDFCompatibleDatafeedBase;
}());
function defaultConfiguration() {
    return {
        "supports_search": true,
        "supports_group_request": false,
        "supports_marks": false,
        "supports_timescale_marks": false,
        "supports_time": false,
        "exchanges": [
            { "value": "", "name": "All Exchanges", "desc": "" },
            { "value": "NasdaqNM", "name": "NasdaqNM", "desc": "NasdaqNM" },
            { "value": "NYSE", "name": "NYSE", "desc": "NYSE" },
            { "value": "NCM", "name": "NCM", "desc": "NCM" },
            { "value": "NGM", "name": "NGM", "desc": "NGM" }
        ],
        "symbols_types": [
            { "name": "All types", "value": "" },
            { "name": "Stock", "value": "stock" },
            { "name": "Index", "value": "index" }
        ],
        "supported_resolutions": ["1", "5", "15", "30", "60", "D", "M"]
    };
}
function defaultSymbols() {
    return {
        ticker: 'AAPL',
        name: 'AAPL',
        full_name: 'APPL',
        listed_exchange: 'NasdaqNM',
        exchange: 'NasdaqNM',
        description: '1',
        has_intraday: true,
        has_no_volume: false,
        minmov: 5,
        pricescale: 100000000,
        type: 'stock',
        session: '0900-1630',
        timezone: 'UTC',
        supported_resolutions: ["1", "5", "15", "30", "60", "D", "W"]
    };
}

var QuotesProvider = /** @class */ (function () {
    function QuotesProvider(datafeedUrl, requester) {
        this._datafeedUrl = datafeedUrl;
        this._requester = requester;
    }
    QuotesProvider.prototype.getQuotes = function (symbols) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._requester.sendRequest(_this._datafeedUrl, 'quotes', { symbols: symbols })
                .then(function (response) {
                if (response.s === 'ok') {
                    resolve(response.d);
                }
                else {
                    reject(response.errmsg);
                }
            })
                .catch(function (error) {
                var errorMessage = getErrorMessage(error);
                logMessage("QuotesProvider: getQuotes failed, error=" + errorMessage);
                reject("network error: " + errorMessage);
            });
        });
    };
    return QuotesProvider;
}());

var Requester = /** @class */ (function () {
    function Requester(headers) {
        if (headers) {
            this._headers = headers;
        }
    }
    Requester.prototype.sendRequest = function (datafeedUrl, urlPath, params) {
        if (params !== undefined) {
            var paramKeys = Object.keys(params);
            if (paramKeys.length !== 0) {
                urlPath += '?';
            }
            urlPath += paramKeys.map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(params[key].toString());
            }).join('&');
        }
        logMessage('New request: ' + urlPath);
        // Send user cookies if the URL is on the same origin as the calling script.
        var options = { credentials: 'same-origin' };
        if (this._headers !== undefined) {
            options.headers = this._headers;
        }
        return fetch(datafeedUrl + "/" + urlPath, options)
            .then(function (response) { return response.text(); })
            .then(function (responseTest) { return JSON.parse(responseTest); });
    };
    return Requester;
}());

var UDFCompatibleDatafeed = /** @class */ (function (_super) {
    __extends(UDFCompatibleDatafeed, _super);
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

exports.UDFCompatibleDatafeed = UDFCompatibleDatafeed;

Object.defineProperty(exports, '__esModule', { value: true });

})));
