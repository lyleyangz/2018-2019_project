import { UDFCompatibleDatafeedBase } from './udf-compatible-datafeed-base';
import { QuotesProvider } from './quotes-provider';
import { Requester } from './requester';
import { RequestParams} from './helpers';

export class UDFCompatibleDatafeed extends UDFCompatibleDatafeedBase {
	/**
	 * 
	 * @param datafeedURL 接口域名地址
	 * @param updateFrequency 
	 * @param param 数据接口参数，外部传入（为新增参数）
	 */
	public constructor(datafeedURL: string, updateFrequency: number = 10 * 1000,param: RequestParams) {
		const requester = new Requester();
		const quotesProvider = new QuotesProvider(datafeedURL, requester);
		super(datafeedURL, quotesProvider, requester, updateFrequency,param);
	}
}
