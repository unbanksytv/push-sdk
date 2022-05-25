import CONFIG from "./config";

export function restapi(): string {
  return 'restapi';
}

export function callApi(chainId: number): string {
  const { API_BASE_URL } = CONFIG[chainId] || {};
  console.log('API_BASE_URL: ', API_BASE_URL);
  return API_BASE_URL;
}
