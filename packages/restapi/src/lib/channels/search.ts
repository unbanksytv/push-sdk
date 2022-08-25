import axios from 'axios';
import { getConfig, getQueryParams, getLimit, isValidETHAddress, getCAIPFormat } from '../helpers';
import Constants from '../constants';

/**
 *  GET /v1/channels/search/ 
 *  optional params: page=(1)&limit=(20{min:1}{max:30})&query=(searchquery)
 *  
 */

export type SearchChannelOptionsType = {
  query: string;
  chainId?: number;
  page?: number;
  limit?: number;
  dev?: boolean;
}

export const search = async (
  options : SearchChannelOptionsType
) => {
  const {
    query,
    chainId = Constants.DEFAULT_CHAIN_ID,
    page = Constants.PAGINATION.INITIAL_PAGE,
    limit = Constants.PAGINATION.LIMIT,
    dev
  } = options || {};

  if (!query) throw Error('"query" not provided!')

  let _query = query;

  /*
   * in case ETH address is passed then convert to CAIP 
   * before assigning to query params
  */
  if (isValidETHAddress(query)) {
    _query = getCAIPFormat(chainId, query);
  }

  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/channels/search/`;

  const queryObj = {
    page,
    limit: getLimit(limit),
    query: _query
  };

  const requestUrl = `${apiEndpoint}?${getQueryParams(queryObj)}`;

  return axios.get(requestUrl)
    .then((response) => response.data.channels)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
