import Constants from '../constants';
import { getSubscriptions } from './getSubscriptions';


export type IsSubscribedToChannelOptionsType = {
  user: string;
  channel: string;
  chainId?: number;
  dev?: boolean;
}

export const isSubscribedToChannel = async (
  options : IsSubscribedToChannelOptionsType
) => {
  const {
    user,
    channel,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev
  } = options || {};

  if (!user) throw Error('"user" not provided!');
  if (!channel) throw Error('"channel" not provided!');

  const userSubscriptions = await getSubscriptions({
    user,
    chainId,
    dev
  });

  const subscriptionList = userSubscriptions.map((subscription: any) => {
    return subscription?.channel?.toLowerCase();
  });

  const isUserSubscribed = subscriptionList.includes(channel.toLowerCase());

  return isUserSubscribed;
}
