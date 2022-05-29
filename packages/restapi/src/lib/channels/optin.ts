import axios from "axios";
import CONFIG from "../config";
import { getAPIUrl } from '../helpers';
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
 
export type OptInOptionsType = {
  signer: SignerType;
  channelAddress: string;
  userAddress: string;
  verifyingContractAddress?: string;
  chainId?: number;
  onSuccess?: () => void
  onError?: () => void,
  dev?: boolean
}

export const optIn = async (
 options: OptInOptionsType
) => {
  const {
    signer,
    channelAddress,
    userAddress,
    verifyingContractAddress,
    chainId = Constants.DEFAULT_CHAIN_ID,
    dev,
    onSuccess,
    onError,
  } = options || {};

  const contractAddress = verifyingContractAddress || 
    CONFIG[chainId].EPNS_COMMUNICATOR_CONTRACT;

  try {
    // get domain information
    const domainInformation = getDomainInformation(
      chainId,
      contractAddress
    );

    // get type information
    const typeInformation = getTypeInformation("Subscribe");

    // get message
    const messageInformation = getSubscriptionMessage(
      channelAddress,
      userAddress,
      "Subscribe"
    );

    // sign a message using EIP712
    const signature = await signer._signTypedData(
      domainInformation,
      typeInformation,
      messageInformation
    );

    const apiEndpoint = Constants.API_ENDPOINTS.SUBSCRIBE_OFFCHAIN_API;
    const [apiUrl] = getAPIUrl(chainId, apiEndpoint, dev);
    const body = {
      signature,
      message: messageInformation,
      op: "write",
      chainId,
      contractAddress,
    };

    await axios.post(apiUrl, body);

    if (typeof onSuccess === 'function') onSuccess();

    return { status: "success", message: "successfully opted into channel" };
  } catch ({ message }) {
    if (typeof onError === 'function') onError();

    return { status: "error", message };
  }
}