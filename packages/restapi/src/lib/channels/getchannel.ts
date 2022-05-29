import axios from "axios";
import { getAPIUrl, PayloadProcessor } from '../helpers';
import Constants from '../constants';

export type GetChannelOptionsType = {
  channel: string;
  page?: number;
  pageSize?: number;
  chainId?: number;
  dev?: boolean;
}

export const getChannelByAddress = async (
  options : GetChannelOptionsType
) => {
  const {
    channel,
    page = Constants.PAGINATION.INITIAL_PAGE,
    pageSize = Constants.PAGINATION.PAGE_SIZE,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  if (!channel) throw Error('"channel" not provided!');

  const apiEndpoint = Constants.API_ENDPOINTS.CHANNELS_SEARCH_API;
  const [apiUrl, _chainId] = getAPIUrl(chainId, apiEndpoint, dev);

  const payload = { query: channel, op: "read", page, pageSize }

  const body = PayloadProcessor.getChannelByAddress(payload, _chainId);

  return axios.post(apiUrl, body)
    .then((response) => response.data?.channels?.[0] || null)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${apiEndpoint}: `, err);
    });
}

