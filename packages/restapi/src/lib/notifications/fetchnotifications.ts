import axios from 'axios';
import { getConfig } from '../helpers';
import Constants from '../constants';

export type NotificationsOptionsType = {
  user: string;
  page?: number;
  pageSize?: number;
  chainId?: number;
  dev?: boolean;
}

export const fetchNotifications = async (
    options : NotificationsOptionsType
  ) => {
    const {
      user,
      page = Constants.PAGINATION.INITIAL_PAGE,
      pageSize = Constants.PAGINATION.PAGE_SIZE,
      chainId = Constants.DEFAULT_CHAIN_ID,
      dev
    } = options || {};

    if (!user) throw Error('"user" not provided!')

    const apiEndpoint = Constants.API_ENDPOINTS.FEEDS_API;
    const [apiUrl] = getConfig(chainId, apiEndpoint, dev);
    const body = { user, page, pageSize, op: "read" };
  
    return axios.post(apiUrl, body)
      .then((response) => response.data)
      .catch((err) => {
        console.error(`[EPNS-SDK] - API ${apiEndpoint}: `, err);
      });
}
