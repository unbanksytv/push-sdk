import axios from "axios";
import { getAPIUrl, checkForAliasAddress } from '../helpers';
import Constants from '../constants';

export type GetSubscribersOptionsType = {
  channel: string;
  channelAlias?: string;
  chainId?: number;
  dev?: boolean;
}

export const getSubscribers = async (
  options: GetSubscribersOptionsType
) => {

  const {
    channel,
    channelAlias,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  const _channelAddress = checkForAliasAddress(channel, chainId, channelAlias);

  const apiEndpoint = Constants.API_ENDPOINTS.GET_SUBSCRIBERS_API;
  const [apiUrl] = getAPIUrl(chainId, apiEndpoint, dev);

  const body = { channel: _channelAddress, op: "read" };

  const apiResponse = await axios.post(apiUrl, body);

  const { data: { subscribers = [] } } = apiResponse;

  return subscribers;
}
