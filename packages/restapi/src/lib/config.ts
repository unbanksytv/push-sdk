export interface ConfigMapType {
  [key: number]: { API_BASE_URL: string }
}
  
const CONFIG : ConfigMapType = {
  // MAIN NET
  1: {
    API_BASE_URL: 'https://backend-prod.epns.io/apis'
  },
  // KOVAN
  42: {
    API_BASE_URL: 'https://backend-kovan.epns.io/apis'
  },
};

export default CONFIG;