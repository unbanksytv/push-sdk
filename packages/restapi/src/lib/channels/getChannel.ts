import axios from 'axios';
import { getConfig, isValidETHAddress, getCAIPFormat } from '../helpers';
import Constants from '../constants';

/**
 *  GET /v1/channels/{addressinCAIP}   
 */

export type GetChannelOptionsType = {
  channel: string;
  chainId?: number;
  dev?: boolean;
}

export const getChannel = async (
  options : GetChannelOptionsType
) => {
  const {
    channel,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  if (!isValidETHAddress(channel)) throw Error('Invalid "channel" provided!');

  const channelInCAIP = getCAIPFormat(chainId, channel);

  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/channels`;

  const requestUrl = `${apiEndpoint}/${channelInCAIP}`;

  return await axios.get(requestUrl)
    .then((response) => response.data)
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
