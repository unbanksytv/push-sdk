import { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Section, SectionItem } from './components/StyledComponents';
import Loader from './components/Loader'
import Web3Context from './web3context';
import * as EpnsAPI from '@epnsproject/sdk-restapi';
import { NotificationItem, chainNameType, SubscribedModal } from '@epnsproject/sdk-uiweb';

import sampleNotifications from './data';

const NotificationListContainer = styled.div`
  margin: 20px;
  padding: 20px;
  width: 100%;

  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }
`

const NavButton = styled.div`
  margin: 20px 0;
  display: flexbox;
  flex-direction: column;

  & button {
    margin-right: 15px;
  }
`;

const NotificationsTest = () => {
  const { account, chainId } = useContext<any>(Web3Context);
  const [isLoading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState<EpnsAPI.ParsedResponseType[]>();
  const [spams, setSpams] = useState<EpnsAPI.ParsedResponseType[]>();
  const [theme, setTheme] = useState('dark');
  const [viewType, setViewType] = useState('notif');
  const [showSubscribe, setShowSubscribe] = useState(false);


  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.fetchNotifications({
        user: account,
        chainId
      });

      const parsedResults = EpnsAPI.parseApiResponse([
        ...response.results,
        ...sampleNotifications
      ]);

      setNotifs(parsedResults);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [account, chainId]);

  const loadSpam = useCallback(async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.fetchSpamNotifications({
        user: account,
        chainId
      });

      const parsedResults = EpnsAPI.parseApiResponse(response.results);

      setSpams(parsedResults);
  
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [account, chainId]);

  const toggleTheme = () => {
    setTheme(lastTheme => {
      return lastTheme === 'dark' ? 'light' : 'dark'
    })
  };

  const toggleSubscribedModal = () => {
    setShowSubscribe((lastVal) => !lastVal);
  };


  useEffect(() => {
    if (account) {
      if (viewType === 'notif') {
        loadNotifications();
      } else {
        loadSpam();
      }
    }
  }, [account, viewType, loadNotifications, loadSpam]);

  console.log('viewType: ', viewType);

  return (
      <div>
        <h2>Notifications Test page</h2>
        <button onClick={toggleTheme}>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</button>
        
        
        <hr />
        <button onClick={toggleSubscribedModal}>show subscribed modal</button>
        {showSubscribe ? <SubscribedModal onClose={toggleSubscribedModal}/> : null}
        
        <hr />
        <NavButton>
          <button onClick={() => { setViewType('notif') }}>Notifications</button>
          <button onClick={() => { setViewType('spam') }}>Spam</button>
        </NavButton>
        <hr />

        <Loader show={isLoading} />

        <Section theme={theme}>
          {viewType === 'notif' ? (
            <>
            <b className='headerText'>Notifications: </b>
            <SectionItem>
              {notifs ? (
                <NotificationListContainer>
                  {notifs.map((oneNotification, i) => {
  
                  const { 
                    cta,
                    title,
                    message,
                    app,
                    icon,
                    image,
                    url,
                    blockchain,
                    secret,
                    notification
                  } = oneNotification;

                  // const chainName = blockchain as chainNameType;

                  return (
                    <NotificationItem
                      key={`notif-${i}`}
                      notificationTitle={secret ? notification['title'] : title}
                      notificationBody={secret ? notification['body'] : message}
                      cta={cta}
                      app={app}
                      icon={icon}
                      image={image}
                      url={url}
                      // optional parameters for rendering spambox
                      isSpam={false}
                      subscribeFn={async () => console.log("yayy")}
                      isSubscribedFn={async () => false}
                      theme={theme}
                      // chainName="ETH_TEST_KOVAN"
                      chainName={blockchain as chainNameType}
                    />
                  );
                })}
                </NotificationListContainer>
              ) : null}
            </SectionItem>
            </>

          ) : (
            <>
              <b className='headerText'>Spams: </b>
              <SectionItem>
              {spams ? (
                <NotificationListContainer>
                  {spams.map((oneNotification, i) => {
                  const { 
                    cta,
                    title,
                    message,
                    app,
                    icon,
                    image,
                    url,
                    blockchain,
                    secret,
                    notification
                  } = oneNotification;

                  return (
                    <NotificationItem
                    key={`spam-${i}`}
                      notificationTitle={secret ? notification['title'] : title}
                      notificationBody={secret ? notification['body'] : message}
                      cta={cta}
                      app={app}
                      icon={icon}
                      image={image}
                      url={url}
                      // optional parameters for rendering spambox
                      isSpam
                      subscribeFn={async () => console.log("yayy spam")}
                      isSubscribedFn={async () => false}
                      theme={theme}
                      chainName={blockchain as chainNameType}
                    />
                  );
                })}
                </NotificationListContainer>
              ) : null}
              </SectionItem>
            </>

          )}
        </Section>

      </div>
  );
}

export default NotificationsTest;