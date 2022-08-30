import axios from 'axios';
import { ISendNotificationInputOptions } from '../types';
import {
  getPayloadForAPIInput,
  getPayloadIdentity,
  getRecipients,
  getRecipientFieldForAPIPayload,
  getVerificationProof,
  getSource,
  getUUID
} from './helpers';
import { getCAIPAddress, getCAIPDetails, getConfig } from '../helpers';
import { NOTIFICATION_TYPE } from './constants';


export async function sendNotification(options: ISendNotificationInputOptions) {
  try {
    const {
      signer,
      type,
      identityType,
      payload,
      recipients,
      channel,
      graph,
      ipfsHash,
      env = 'prod'
    } = options || {};

    const _channelAddress = getCAIPAddress(env, channel, 'Channel');
    const channelCAIPDetails = getCAIPDetails(_channelAddress);

    if (!channelCAIPDetails) throw Error('Invalid Channel CAIP!');

    if (type === NOTIFICATION_TYPE.BROADCAST && !channel) {
      throw '[EPNS-SDK] - Error - sendNotification() - "channel" mandatory for Notification Type: Broadcast!';
    }

    const uuid = getUUID();
    const chainId = parseInt(channelCAIPDetails.networkId, 10);

    const { API_BASE_URL, EPNS_COMMUNICATOR_CONTRACT } = getConfig(env, channelCAIPDetails);

    const _recipients = await getRecipients({
      env,
      notificationType: type,
      channel: _channelAddress,
      recipients,
      secretType: payload?.sectype
    });

    const notificationPayload = getPayloadForAPIInput(options, _recipients);

    const verificationProof = await getVerificationProof({
      signer,
      chainId,
      identityType,
      notificationType: type,
      verifyingContract: EPNS_COMMUNICATOR_CONTRACT,
      payload: notificationPayload,
      graph,
      ipfsHash,
      uuid
    });

    const identity = getPayloadIdentity({
      identityType,
      payload: notificationPayload,
      notificationType: type,
      graph,
      ipfsHash
    });

    const source = getSource(chainId, identityType);
   
    const apiPayload = {
      verificationProof,
      identity,
      sender: _channelAddress,
      source,
      /** note this recipient key has a different expectation from the BE API, see the funciton for more */
      recipient: getRecipientFieldForAPIPayload({
        env,
        notificationType: type,
        recipients: recipients || '',
        channel: _channelAddress
      })
    };

    const requestURL = `${API_BASE_URL}/v1/payloads/`;

    // console.log(
    //   '\n\nAPI call :-->> ',
    //   requestURL,
    //   '\n\n',
    //   apiPayload,
    //   '\n\n\n\n'
    // );

    return await axios.post(
      requestURL,
      apiPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (err) {
    console.error('[EPNS-SDK] - Error - sendNotification() - ', JSON.stringify(err));
    throw err;
  }
}