export interface ConfigMapType {
  [key: number]: {
    API_BASE_URL: string,
    EPNS_COMMUNICATOR_CONTRACT: string
  }
}

export const PROD = 1;
export const STAGING = 42;
export const DEV = 99999;

const CONFIG : ConfigMapType = {
  // MAIN NET (PROD)
  [PROD]: {
    API_BASE_URL: 'https://backend-prod.epns.io/apis',
    EPNS_COMMUNICATOR_CONTRACT: '0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa'
  },
  // KOVAN (STAGING)
  [STAGING]: {
    API_BASE_URL: 'https://backend-kovan.epns.io/apis',
    EPNS_COMMUNICATOR_CONTRACT: '0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC'
  },
  // EPNS DEV
  [DEV]: {
    API_BASE_URL: 'https://backend-dev.epns.io/apis',
    EPNS_COMMUNICATOR_CONTRACT: '0x99047d328496C14016222a998564B334A4A5723f'
  }
};

export default CONFIG;