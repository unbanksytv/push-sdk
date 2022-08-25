import axios from 'axios';
import { getConfig, getQueryParams, getCAIPFormat, getLimit } from '../helpers';
import Constants from '../constants';
import { parseApiResponse } from '../utils';

/**
 *  GET '/v1/users/:userAddressInCAIP/feeds
 *  optional params: page=(1)&limit=(20{min=1|max=50})&spam=(false)'
 */

export type FeedsOptionsType = {
  user: string;
  chainId?: number;
  page?: number;
  limit?: number;
  spam?: boolean;
  raw?: boolean;
  dev?: boolean;
}

export const getFeeds = async (
  options : FeedsOptionsType
) => {
  const {
    user,
    chainId = Constants.DEFAULT_CHAIN_ID,
    page = Constants.PAGINATION.INITIAL_PAGE,
    limit = Constants.PAGINATION.LIMIT,
    spam = false,
    raw = false,
    dev
  } = options || {};

  if (!user) throw Error('"user" not provided!')

  const userAddressInCAIP = getCAIPFormat(chainId, user);
  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/users/${userAddressInCAIP}/feeds`;

  const queryObj = {
    page,
    limit: getLimit(limit),
    spam
  };

  const requestUrl = `${apiEndpoint}?${getQueryParams(queryObj)}`;

  return axios.get(requestUrl)
    .then((response) => {
      console.log('response?.data?.feeds: --> ', response?.data?.feeds);
      if (raw) {
        return response?.data?.feeds || [];
      }
      return parseApiResponse(response?.data?.feeds) || [];
    })
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
