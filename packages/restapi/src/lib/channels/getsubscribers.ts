import axios from "axios";
import { getAPIUrl } from '../helpers';
import Constants from '../constants';

export type GetSubscribersOptionsType = {
  channel: string;
  chainId?: number;
  dev?: boolean;
}

export const getSubscribers = async (
  options: GetSubscribersOptionsType
) => {

  const {
    channel,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  const apiEndpoint = Constants.API_ENDPOINTS.GET_SUBSCRIBERS_API;
  const [apiUrl] = getAPIUrl(chainId, apiEndpoint, dev);

  const body = { channel, op: "read" };

  const apiResponse = await axios.post(apiUrl, body);

  const { data: { subscribers = [] } } = apiResponse;

  return subscribers;
}
