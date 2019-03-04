import { getErrorMessage, logMessage, } from './helpers';
import { HistoryProvider, } from './history-provider';
import { DataPulseProvider } from './data-pulse-provider';
import { QuotesPulseProvider } from './quotes-pulse-provider';
import { SymbolsStorage } from './symbols-storage';
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
export { UDFCompatibleDatafeedBase };
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
