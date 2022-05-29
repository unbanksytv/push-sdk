import React, { useEffect, useState, useContext } from 'react';
import { Section, SectionItem, CodeFormatter } from './components/StyledComponents';
import Loader from './components/Loader'
import Web3Context from './web3context';
import * as EpnsAPI from '../../../../dist/packages/restapi/src';

const NotificationsTest = () => {
  const { account, chainId } = useContext<any>(Web3Context);
  const [isLoading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState();
  const [spams, setSpams] = useState();


  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.fetchNotifications({
        user: account,
        chainId
      });

      setNotifs(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadSpam = async () => {
    try {
      setLoading(true);
      const response = await EpnsAPI.fetchSpamNotifications({
        user: account,
        chainId
      });

      setSpams(response);
  
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (account) {
      loadNotifications();
      loadSpam();
    }
  }, [account]);

  return (
      <div>
        <h2>Notifications Test page</h2>

        <Loader show={isLoading} />

        <Section>
          <SectionItem>
            <b>Notifications: </b>
            {notifs ? (
              <CodeFormatter>
                {JSON.stringify(notifs, null, 4)}
              </CodeFormatter>
            ) : null}
          </SectionItem>

          <SectionItem>
            <b>Spams: </b>
            {spams ? (
              <CodeFormatter>
                {JSON.stringify(spams, null, 4)}
              </CodeFormatter>
            ) : null}
          </SectionItem>
        </Section>

      </div>
  );
}

export default NotificationsTest;