import axios from "axios";
import { getConfig, checkForAliasAddress } from '../helpers';
import Constants from '../constants';

export type GetSubscribersOptionsType = {
  channel: string;
  channelAlias?: string;
  chainId?: number;
  dev?: boolean;
}

/**
 * LEGACY SDK method, kept to support old functionality
 * can be removed if not needed in future.
 */

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
  
  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/channels/_get_subscribers`;

  const requestUrl = `${apiEndpoint}`;

  const body = { channel: _channelAddress, op: "read", blockchain: chainId };

  const apiResponse = await axios.post(requestUrl, body);

  const { data: { subscribers = [] } } = apiResponse;

  return subscribers;
}
