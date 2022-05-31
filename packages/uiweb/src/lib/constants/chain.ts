export interface ChainImagesTypes {
  [key: string]: {
    ETH_TEST_KOVAN: string,
    ETH_MAINNET: string,
    POLYGON_TEST_MUMBAI: string,
    POLYGON_MAINNET: string
  }
}

const ChainImages: ChainImagesTypes = {
  CHAIN_ICONS: {
    ETH_TEST_KOVAN: "https://backend-kovan.epns.io/assets/ethereum.org.ico",
    ETH_MAINNET: "https://backend-kovan.epns.io/assets/ethereum.org.ico",
    POLYGON_TEST_MUMBAI: "https://backend-kovan.epns.io/assets/polygon.technology.ico",
    POLYGON_MAINNET: "https://backend-kovan.epns.io/assets/polygon.technology.ico"
  },
};

export default ChainImages;