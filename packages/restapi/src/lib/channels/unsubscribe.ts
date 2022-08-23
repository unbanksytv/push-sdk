import axios from "axios";
import { getConfig, checkForAliasAddress, getCAIPFormat } from '../helpers';
import {
  getTypeInformation,
  getDomainInformation,
  getSubscriptionMessage
} from './signature.helpers';
import Constants from '../constants';

type SignerType = {
  _signTypedData: (
    domain: unknown,
    types: unknown,
    value: unknown
  ) => Promise<string>
}
 
export type UnSubscribeOptionsType = {
  signer: SignerType;
  channelAddress: string;
  channelAlias?: string;
  userAddress: string;
  verifyingContractAddress?: string;
  chainId?: number;
  onSuccess?: () => void
  onError?: (err: Error) => void,
  dev?: boolean
}

export const unsubscribe = async (
 options: UnSubscribeOptionsType
) => {
  const {
    signer,
    channelAddress,
    channelAlias,
    userAddress,
    verifyingContractAddress,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev,
    onSuccess,
    onError,
  } = options || {};

  try {
    const _channelAddress = checkForAliasAddress(channelAddress, chainId, channelAlias);
    const channelAddressInCAIP = getCAIPFormat(chainId, _channelAddress);
    const [apiEnv, ,contractAddress] = getConfig(chainId, dev);
    const userAddressInCAIP = getCAIPFormat(chainId, userAddress);

    const requestUrl = `${apiEnv}/v1/channels/${channelAddressInCAIP}/unsubscribe`;

    // get domain information
    const domainInformation = getDomainInformation(
      chainId,
      verifyingContractAddress || contractAddress
    );

    // get type information
    const typeInformation = getTypeInformation("Unsubscribe");

    // get message
    const messageInformation = getSubscriptionMessage(
      _channelAddress,
      userAddress,
      "Unsubscribe"
    );

    // sign a message using EIP712
    const signature = await signer._signTypedData(
      domainInformation,
      typeInformation,
      messageInformation
    );

    const verificationProof = signature;  // might change

    const body = {
      verificationProof,
      message: {
        ...messageInformation,
        channel: channelAddressInCAIP,
        unsubscriber: userAddressInCAIP
      },
    };

    await axios.post(requestUrl, body);

    if (typeof onSuccess === 'function') onSuccess();

    return { status: "success", message: "successfully opted out channel" };
  } catch (err) {
    if (typeof onError === 'function') onError(err as Error);

    return { status: "error", message: err instanceof Error ? err.message : JSON.stringify(err) };
  }
}