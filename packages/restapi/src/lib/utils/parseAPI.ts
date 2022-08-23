import { ApiNotificationType, ParsedResponseType } from '../types';

/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
export function parseApiResponse(response: ApiNotificationType[]): ParsedResponseType[] {
  return response.map((apiNotification: ApiNotificationType) => {
    const {
      payload: {
        data: {
          acta: cta = "",
          amsg: bigMessage = "",
          asub = "",
          icon = "",
          url = "",
          sid = "",
          app = "",
          aimg = "",
          secret = ""
        },
        notification,
      },
      blockchain,
    } = apiNotification;

    return {
      cta,
      title: asub || notification.title || '',
      message: bigMessage || notification.body || '',
      icon,
      url,
      sid,
      app,
      image: aimg,
      blockchain,
      notification,
      secret
    };
  });
}