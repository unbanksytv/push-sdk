import CONFIG, { 
  ETH_MAINNET, 
  POLYGON_MAINNET, 
  PROD, STAGING,
  DEV,
  ConfigType
} from './config';
import Constants from './constants';

export const getEpnsSupportedNetwork = (chainId: number, isDev?: boolean) : ConfigType => {
  // for Mainnet
  if ([ETH_MAINNET, POLYGON_MAINNET].includes(chainId)) {
    return CONFIG[chainId][PROD];
  }

  // if explicitly passed "dev: true"
  if (isDev) {
    return CONFIG[chainId][DEV];
  }

  // by default
  return CONFIG[chainId][STAGING];
};

export const getConfig = (
  chainId: number,
  API_ENDPOINT: string,
  isDev?: boolean
) : [string, number, string] => {
  const supportedNW = getEpnsSupportedNetwork(chainId, isDev);

  if (!supportedNW) throw Error(`[EPNS-SDK] - ${API_ENDPOINT}: "chainId" passed is not supported!`)

  const { API_BASE_URL, EPNS_COMMUNICATOR_CONTRACT } = supportedNW;

  return [`${API_BASE_URL}/${API_ENDPOINT}`, chainId, EPNS_COMMUNICATOR_CONTRACT];
};

export type ChannelsSearchAPIPayloadType = {
  query: string;
  op: string;
  page?: number;
  pageSize?: number;
}

/**
 * This is to offset BE payload restrictions
 */
export const PayloadProcessor = {
  getChannelByAddress(
    payload: ChannelsSearchAPIPayloadType,
    chainId: number
  ) {
    const { query, op } = payload || {};

    if ([ETH_MAINNET, POLYGON_MAINNET].includes(chainId)) {
      return { query, op }
    }

    return payload;
  }
};

export function checkForAliasAddress(_address: string, _chainId: number, _alias?: string) {
  if (Constants.NON_ETH_CHAINS.includes(_chainId)) {
    if (!_alias) {
      throw `"channelAlias" is not provided! for chainId: ${_chainId}`
    }
    return _alias;
  } else {
    return _address;
  }
}
