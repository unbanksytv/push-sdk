import * as ethers from 'ethers';
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
  isDev?: boolean
) : [string, number, string] => {
  const supportedNW = getEpnsSupportedNetwork(chainId, isDev);

  if (!supportedNW) throw Error(`[EPNS-SDK] - "chainId" passed is not supported!`)

  const { API_BASE_URL, EPNS_COMMUNICATOR_CONTRACT } = supportedNW;

  return [API_BASE_URL, chainId, EPNS_COMMUNICATOR_CONTRACT];
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

export function getQueryParams(obj: any) {
  return Object.keys(obj)
    .map(key => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join('&');
}

export function getCAIPFormat(chainId: number, address: string) {
  // EVM based chains
  if ([1, 42, 37, 80001].includes(chainId)) {
    return `eip155:${chainId}:${address}`;
  }

  return address;
  // TODO: add support for other non-EVM based chains
}

export function getLimit(passedLimit?: number) {
  if (!passedLimit) return Constants.PAGINATION.LIMIT;

  if (passedLimit > Constants.PAGINATION.LIMIT_MAX) {
    return Constants.PAGINATION.LIMIT_MAX;
  }

  return passedLimit;
}

export function isValidETHAddress(addr?: string) {
  return ethers.utils.isAddress(addr || '');
}