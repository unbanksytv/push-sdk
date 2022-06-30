import { getSubscribers } from './getsubscribers';
import Constants from '../constants';


export type IsUserSubscribedOptionsType = {
  user: string;
  channel: string;
  channelAlias?: string;
  chainId?: number;
  dev?: boolean;
}

export const isUserSubscribed = async (
  options: IsUserSubscribedOptionsType
) => {

  const {
    user,
    channel,
    channelAlias,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  let channelSubscribers = await getSubscribers({ channel, channelAlias, chainId, dev });

  channelSubscribers = channelSubscribers.map((address: string) => address.toLowerCase());
  const isUserPresentInTheList = channelSubscribers.includes(user.toLowerCase());

  return isUserPresentInTheList;
}
