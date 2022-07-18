import React, { useEffect, useState, useContext } from 'react';
import { Section, SectionItem, CodeFormatter, SectionButton } from './components/StyledComponents';
import Loader from './components/Loader'
import Web3Context from './web3context';
import * as EpnsAPI from '@epnsproject/sdk-restapi';

const ChannelsTest = () => {
  const { library, account, chainId } = useContext<any>(Web3Context);
  
  const [channelAddr, setChannelAddr] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState();
  const [subscriberData, setSubscriberData] = useState();
  const [subscriberStatus, setSubscriberStatus] = useState<boolean>();
  

  const updateChannelAddress = (e: React.SyntheticEvent<HTMLElement>) => {
    setChannelAddr(
      (e.target as HTMLInputElement).value
    );
  };

  const testGetChannel = async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.getChannelByAddress({
        channel: channelAddr,
        chainId
      });
  
      setChannelData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

  };

  const testGetSubscribers = async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.getSubscribers({
        channel: channelAddr,
        channelAlias: [80001, 37].includes(chainId) ? (channelData && channelData['alias_address']) : channelAddr,
        chainId
      });
  
      setSubscriberData(response);
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  const testSubscriberStatus = async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.isUserSubscribed({
        channel: channelAddr,
        channelAlias: [80001, 37].includes(chainId) ? (channelData && channelData['alias_address']) : channelAddr,
        user: account,
        chainId
      });
  
      setSubscriberStatus(response);
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false);
    }


  };

  const testOptFunctionality = async () => {
    const _signer = library.getSigner(account);

    try {
      setLoading(true);

      if (subscriberStatus) {
        await EpnsAPI.optOut({
          signer: _signer,
          channelAddress: channelAddr,
          channelAlias: [80001, 37].includes(chainId) ? (channelData && channelData['alias_address']) : channelAddr,
          userAddress: account,
          chainId,
          onSuccess: () => {
            console.log('opt out success');
            setSubscriberStatus(false);
          },
          onError: (e) => {
            console.error('opt out error', e);
          },
        })
      } else {
        await EpnsAPI.optIn({
          signer: _signer,
          channelAddress: channelAddr,
          channelAlias: [80001, 37].includes(chainId) ? (channelData && channelData['alias_address']) : channelAddr,
          userAddress: account,
          chainId,
          onSuccess: () => {
            console.log('opt in success');
            setSubscriberStatus(true);
          },
          onError: (e) => {
            console.error('opt in error', e);
          },
        })
      }

    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (channelData && channelData['addr']) {
      setChannelAddr(channelData['addr'])
    }
  }, [channelData])

  useEffect(() => {
    // update the other data sections as well on opt in/out completion
    if (typeof subscriberStatus === 'boolean') {
      testGetChannel();
      testGetSubscribers();
    }
  }, [subscriberStatus]);

  return (
    <div>
      <h2>Channels Test page</h2>

      <Loader show={isLoading} />

      <Section>
        <SectionItem>
          <label>Channel Address/Name</label>
          <input type="text" onChange={updateChannelAddress} value={channelAddr} style={{ width: 400 }} />
        </SectionItem>
       
        <SectionItem>
          <div>
            <p>
              <SectionButton onClick={testGetChannel}>get channel data</SectionButton>
            </p>
            {channelData ? (
              <CodeFormatter>
                {JSON.stringify(channelData, null, 4)}
              </CodeFormatter>
            ) : null}

            <p>
              <SectionButton onClick={testGetSubscribers}>get subscribers</SectionButton>
            </p>
            {subscriberData ? (
              <CodeFormatter>
                {JSON.stringify(subscriberData, null, 4)}
              </CodeFormatter>
            ) : null}

            <p>
              <SectionButton onClick={testSubscriberStatus}>check if logged-in user is subscribed</SectionButton>
            </p>
            {typeof subscriberStatus === 'boolean' ? (
              <>
                <CodeFormatter>
                  {JSON.stringify(subscriberStatus, null, 4)}
                </CodeFormatter>

                <SectionButton onClick={testOptFunctionality}>{subscriberStatus ? 'OPT OUT' : 'OPT IN'}</SectionButton>
              </>
            ) : null}
          </div>
        </SectionItem>
      </Section>
    </div>
  );
}

export default ChannelsTest;