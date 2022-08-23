import axios from 'axios';
import { getConfig, getQueryParams, getLimit } from '../helpers';
import Constants from '../constants';

/**
 *  GET /v1/channels/search/ 
 *  optional params: page=(1)&limit=(20{min:1}{max:30})&query=(searchquery)
 *  
 */

export type ChannelByNameOptionsType = {
  channelName: string;
  chainId?: number;
  page?: number;
  limit?: number;
  dev?: boolean;
}

export const getChannelByName = async (
  options : ChannelByNameOptionsType
) => {
  const {
    channelName,
    chainId = Constants.DEFAULT_CHAIN_ID,
    page = Constants.PAGINATION.INITIAL_PAGE,
    limit = Constants.PAGINATION.LIMIT,
    dev
  } = options || {};

  if (!channelName) throw Error('"channel" not provided!')

  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/channels/search/`;

  const queryObj = {
    page,
    limit: getLimit(limit),
    query: channelName
  };

  const requestUrl = `${apiEndpoint}?${getQueryParams(queryObj)}`;

  return axios.get(requestUrl)
    .then((response) => response.data.channels)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
