import {
	Bar,
	HistoryMetadata,
	LibrarySymbolInfo,
} from '../../../charting_library/datafeed-api';

import {
	getErrorMessage,
	RequestParams,
	UdfErrorResponse,
	UdfOkResponse,
	UdfResponse,
} from './helpers';

import { Requester } from './requester';

interface HistoryPartialDataResponse extends UdfOkResponse {
	a:number[];
	t: number[];
	c: number[];
	o?: never;
	h?: never;
	l?: never;
	v?: never;
}

interface HistoryFullDataResponse extends UdfOkResponse {
	a:number[];
	t: number[];
	c: number[];
	o: number[];
	h: number[];
	l: number[];
	v: number[];
}

interface HistoryNoDataResponse extends UdfResponse {
	s: 'no_data';
	nextTime?: number;
}

type HistoryResponse = HistoryFullDataResponse | HistoryPartialDataResponse | HistoryNoDataResponse;

export interface GetBarsResult {
	bars: Bar[];
	meta: HistoryMetadata;
}

export class HistoryProvider {
	private _datafeedUrl: string;
	private readonly _requester: Requester;
	private _param: RequestParams;
	private _endData: number;
	/**
	 * 
	 * @param datafeedUrl 接口域名地址
	 * @param requester 
	 * @param param 数据接口参数，外部传入（为新增参数）
	 */
	public constructor(datafeedUrl: string, requester: Requester,param: RequestParams) {
		this._datafeedUrl = datafeedUrl;
		this._requester = requester;
		this._param = param;
		this._endData = 0;
	}

	public getBars(symbolInfo: LibrarySymbolInfo, resolution: string, rangeStartDate: number, rangeEndDate: number): Promise<GetBarsResult> {

		/**
		 * 交易历史记录，使用外部传入参数
		 */
		// const requestParams: RequestParams = {
		// 	symbol: symbolInfo.ticker || '',
		// 	resolution: resolution,
		// 	from: rangeStartDate,
		// 	to: rangeEndDate
		// };
		const requestParams: RequestParams = this._param;		
		return new Promise((resolve: (result: GetBarsResult) => void, reject: (reason: string) => void) => {
			// console.log(rangeEndDate*1000 +"=="+ this._endData)
			
			// 验证最后一条数据与K线图往左拉的时间验证，避免频繁刷新
			if(this._endData<=rangeEndDate*1000 || this._endData == 0){
				this._requester.sendRequest<HistoryResponse>(this._datafeedUrl, 'api/json/kinfo.do', requestParams)
					.then((response: HistoryResponse | UdfErrorResponse) => {
						
						if (response.success === false && response.s !== 'no_data') {
							reject(response.errMsg);
							return;
						}	
						const bars: Bar[] = [];
						const meta: HistoryMetadata = {
							noData: false,
						};
						/**
						 * 将交易平台的数据整合到bars对象里，下面需注意2点
						 * 1.不能直接将response的引用对象，JSON.parse(JSON.stringify(response))为赋值内容，
						 *   否则要改动response本身的数据接口，改动很大
						 * 2.由于本身的数据里的时间是由远到近，而我们的数据列表，时间是由近到远，渲染不了数据，
						 *   使用reverse将数据反转过来
						 */
						const res = JSON.parse(JSON.stringify(response));
						for(var item of res.data.kinfos.reverse()){
							const barValue: Bar =  {
								time: item.createTime,
								close: Number(item.close),
								open: Number(item.open),
								high: Number(item.high),
								low: Number(item.low),
								volume:Number(item.volume)
							};
							bars.push(barValue);
						}
						this._endData = res.data.kinfos[0].createTime;
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
					.catch((reason?: string | Error) => {
						const reasonString = getErrorMessage(reason);
						console.warn(`HistoryProvider: getBars() failed, error=${reasonString}`);
						reject(reasonString);
					});
			}
			
		});
	}
}
