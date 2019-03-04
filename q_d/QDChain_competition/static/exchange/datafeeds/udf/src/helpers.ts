export interface RequestParams {
	[paramName: string]: string | string[] | number;
}

export interface UdfResponse {
	s: string;
	success:boolean; // 新增属性，为了与后台返回的字段保持一致,用于接口请求验证
}

export interface UdfOkResponse extends UdfResponse {
	s: 'ok';
	success: true;// 新增属性，与UdfResponse对应的属性类型一致
}

export interface UdfErrorResponse {
	s: 'error';
	errmsg: string;
	success: false;// 新增属性，与UdfResponse对应的属性类型一致
	errMsg: string;// 新增属性，用于错误提示，为了与后台返回的字段保持一致
}

/**
 * If you want to enable logs from datafeed set it to `true`
 */
const isLoggingEnabled = false;
export function logMessage(message: string): void {
	if (isLoggingEnabled) {
		const now = new Date();
		console.log(`${now.toLocaleTimeString()}.${now.getMilliseconds()}> ${message}`);
	}
}

export function getErrorMessage(error: string | Error | undefined): string {
	if (error === undefined) {
		return '';
	} else if (typeof error === 'string') {
		return error;
	}

	return error.message;
}
