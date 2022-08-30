import axios from 'axios';
import { getAPIBaseUrls, getQueryParams, getLimit } from '../helpers';
import Constants from '../constants';

/**
 *  GET /v1/channels/search/ 
 *  optional params: page=(1)&limit=(20{min:1}{max:30})&query=(searchquery)
 *  
 */

export type SearchChannelOptionsType = {
  query: string;
  env?: string;
  page?: number;
  limit?: number;
}

export const search = async (
  options : SearchChannelOptionsType
) => {
  const {
    query,
    env = Constants.ENV.PROD,
    page = Constants.PAGINATION.INITIAL_PAGE,
    limit = Constants.PAGINATION.LIMIT,
  } = options || {};

  if (!query) throw Error('"query" not provided!');

  const API_BASE_URL = getAPIBaseUrls(env);
 
  const apiEndpoint = `${API_BASE_URL}/v1/channels/search/`;

  const queryObj = {
    page,
    limit: getLimit(limit),
    query: query
  };

  const requestUrl = `${apiEndpoint}?${getQueryParams(queryObj)}`;

  return axios.get(requestUrl)
    .then((response) => response.data.channels)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
