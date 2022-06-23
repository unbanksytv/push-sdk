// the type for the the response of the input data to be parsed
export type ApiNotificationType =   {
    "payload_id": number,
    "channel": string,
    "epoch": string,
    "payload": {
        "apns": {
            "payload": {
                "aps": {
                    "category": string,
                    "mutable-content": number,
                    "content-available": number
                }
            },
            "fcm_options": {
                "image": string
            }
        },
        "data": {
            "app": string,
            "sid": string,
            "url": string,
            "acta": string,
            "aimg": string,
            "amsg": string,
            "asub": string,
            "icon": string,
            "type": string,
            "epoch": string,
            "appbot": string,
            "hidden": string,
            "secret": string
        },
        "android": {
            "notification": {
                "icon": string,
                "color": string,
                "image": string
                "default_vibrate_timings": boolean
            }
        },
        "notification": {
            "body": string,
            "title": string
        }
    },
    "blockchain": string
}

// The output response from parsing a notification object
export type ParsedResponseType = {
    cta : string,
    title: string,
    message: string,
    icon: string,
    url: string,
    sid: string,
    app: string,
    image: string,
    blockchain: string,
    secret: string,
    notification: {
      title: string,
      body: string,
    }
}

/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
 export function parseApiResponse(
    response: ApiNotificationType[]
  ): ParsedResponseType[] {
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