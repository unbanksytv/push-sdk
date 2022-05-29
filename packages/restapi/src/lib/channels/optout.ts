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
 
export type OptOutOptionsType = {
  signer: SignerType;
  channelAddress: string;
  userAddress: string;
  verifyingContractAddress?: string;
  chainId?: number;
  onSuccess?: () => void
  onError?: () => void,
  dev?: boolean
}

export const optOut = async (
 options: OptOutOptionsType
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
    const typeInformation = getTypeInformation("Unsubscribe");

    // get message
    const messageInformation = getSubscriptionMessage(
      channelAddress,
      userAddress,
      "Unsubscribe"
    );

    // sign a message using EIP712
    const signature = await signer._signTypedData(
      domainInformation,
      typeInformation,
      messageInformation
    );

    const apiEndpoint = Constants.API_ENDPOINTS.UNSUBSCRIBE_OFFCHAIN_API;
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

    return { status: "success", message: "successfully opted out the channel" };
  } catch ({ message }) {
    if (typeof onError === 'function') onError();

    return { status: "error", message };
  }
}