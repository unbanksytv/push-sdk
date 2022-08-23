import axios from 'axios';
import { getConfig, getQueryParams, getLimit, isValidETHAddress } from '../helpers';
import Constants from '../constants';

/**
 *  GET /v1/channels/search/ 
 *  optional params: page=(1)&limit=(20{min:1}{max:30})&query=(searchquery)
 *  
 */

export type ChannelByAddressOptionsType = {
  channel: string;
  chainId?: number;
  page?: number;
  limit?: number;
  dev?: boolean;
}

export const getChannelByAddress = async (
  options : ChannelByAddressOptionsType
) => {
  const {
    channel,
    chainId = Constants.DEFAULT_CHAIN_ID,
    page = Constants.PAGINATION.INITIAL_PAGE,
    limit = Constants.PAGINATION.LIMIT,
    dev
  } = options || {};

  if (!isValidETHAddress(channel)) throw Error('Invalid "channel" provided!');

  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/channels/search/`;

  const queryObj = {
    page,
    limit: getLimit(limit),
    query: channel // Make it futureproof if CAIP is introduced
  };

  const requestUrl = `${apiEndpoint}?${getQueryParams(queryObj)}`;

  const response = await axios.get(requestUrl)
    .then((response) => response.data)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
  
  if (response?.itemcount === 0) {
    return null;
  }

  return response?.channels[0];
}
