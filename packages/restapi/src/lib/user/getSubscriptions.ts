import axios from 'axios';
import { getConfig, getCAIPFormat } from '../helpers';
import Constants from '../constants';

/**
 *  GET /users/:userAddressInCAIP/subscriptions
 */

export type UserSubscriptionsOptionsType = {
  user: string;
  chainId?: number;
  dev?: boolean;
}

export const getSubscriptions = async (
  options : UserSubscriptionsOptionsType
) => {
  const {
    user,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  if (!user) throw Error('"user" not provided!')

  const userAddressInCAIP = getCAIPFormat(chainId, user);
  const [apiEnv] = getConfig(chainId, dev);
  const apiEndpoint = `${apiEnv}/v1/users/${userAddressInCAIP}/subscriptions`;

  const requestUrl = `${apiEndpoint}`;

  return axios.get(requestUrl)
    .then((response) => response.data?.subscriptions || [])
    .catch((err) => {
      console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
}
