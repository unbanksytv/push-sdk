import CONFIG, { PROD, STAGING, DEV } from './config';

export const isEpnsSupportedNetwork = (chainId: number) : boolean => {
  return !!CONFIG[chainId];
};

export const getAPIUrl = (
  chainId: number,
  API_ENDPOINT: string,
  isDev?: boolean
) : [string, number] => {
  let nwSelector = STAGING; // default N/W

  if (!isDev) {
    const isSupported = isEpnsSupportedNetwork(chainId);
    if (!isSupported) throw Error(`[EPNS-SDK] - ${API_ENDPOINT}: "chainId" passed is not supported!`)
    nwSelector = chainId;
  } else {
    /**
     * when "dev": true is passed.
     * In our "dApp-dev" we connect to dev database
     */
    nwSelector =  DEV;
  }

  const baseApiUrl = CONFIG[nwSelector].API_BASE_URL;
  const apiUrl = `${baseApiUrl}/${API_ENDPOINT}`;

  /**
   * send the formulated full apiUrl &
   * the chainId derived from passed chainId & dev:bool options
   */
  return [apiUrl, nwSelector];
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

    if (chainId === PROD) {
      return { query, op }
    }

    return payload;
  }
};