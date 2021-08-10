import { ResponseMsg, PagingResponseMsg, BatchResponseMsg } from './response-types';
import { NormalResponseOption, BatchResponseOption, ErrorResponseOption } from './response-options';

let __error_messages__: Map<number, string> = null;

export const ResponseUtils = {
  registerErrorMessages(errorMessages: Map<number, string>) {
    __error_messages__ = errorMessages;
  },
  getErrorMessage(errorNo: number): string {
    let _msg = 'Unknown Error!';
    if (__error_messages__ && __error_messages__.has(errorNo)) {
      _msg = __error_messages__.get(errorNo);
    }
    return _msg;
  },

  /* normal response */
  normal<T>(option: NormalResponseOption<T>): ResponseMsg<T> | PagingResponseMsg<T> {
    const responseMsg: ResponseMsg<T> | PagingResponseMsg<T> = {
      code: 0,
      message: null,
      data: option.data
    };
    if (option.totalCount >= 0) {
      (responseMsg as PagingResponseMsg<T>).totalCount = option.totalCount;
    }
    if (option.pageNo && option.pageSize && option.totalCount >= 0) {
      (responseMsg as PagingResponseMsg<T>).pageSize = option.pageSize;
      (responseMsg as PagingResponseMsg<T>).pageNo = option.pageNo;
      (responseMsg as PagingResponseMsg<T>).pageCount = Math.ceil(option.totalCount / option.pageSize);
    }
    return responseMsg;
  },

  /* batch response */
  batch<T>(option: BatchResponseOption<T>): BatchResponseMsg<T> {
    const responseMsg: BatchResponseMsg<T> = {
      code: 0,
      message: null,
      data: {
        succeed: option.succeedData,
        failed: option.failedData
      },
      succeedCount: option.succeedData && option.succeedData.length,
      failedCount: option.failedData && option.failedData.length,
      repeatCount: option.repeatCount,
      totalCount: option.totalCount
    };
    return responseMsg;
  },

  /* error response */
  error<T>(option: ErrorResponseOption): ResponseMsg<T> {
    const responseMsg: ResponseMsg<T> = {
      code: option.error_no,
      message: option.error_message ? option.error_message : ResponseUtils.getErrorMessage(option.error_no),
      data: null
    };
    return responseMsg;
  },

  /**
   * 抛出自定义接口错误响应信息，此类型Error会被koa-api-error-response中间件捕获，并返回给客户端
   */
  throwError(error_no: number, error_message?: string) {
    const apiErrorMsg = ResponseUtils.error({ error_no, error_message });
    throw new Error(JSON.stringify(apiErrorMsg));
  },

  /**
   * 判断是否为自定义接口错误响应
   */
  isError(errorMsg: string) {
    return /{"code":[^0]\d+?,"message":".*","data":null}/.test(errorMsg);
  }
};
