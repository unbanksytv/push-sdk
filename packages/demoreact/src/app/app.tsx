import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import ConnectButton from './components/Connect';
import Web3Context from './web3context';
import NotificationsTest from './NotificationsTest';
import SecretNotificationsTest from './SecretNotificationsTest';
import ChannelsTest from './ChannelsTest';
import EmbedTest from './EmbedTest';


interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}

const StyledApp = styled.div`
  & h1 {
    text-align: center;
  }

  .nav-button {
    align-items: center;
    background-image: linear-gradient(132deg,#574762,#4a36c4 50%,#ee5555);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 19px 24px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
  }

  .nav-button:hover {
    opacity: 0.8;
  }

  .nav-button:active,
  .nav-button:hover {
    outline: 0;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`

const checkForWeb3Data = ({ library, active, account, chainId  } : Web3ReactState) => {
  return library && active && account && chainId;
}

export function App() {
  const web3Data : Web3ReactState = useWeb3React();
  return (
    <StyledApp>
      <Link to="/"><h1>EPNS-SDK Demo React App</h1></Link>

      <ConnectButton />
      <hr />
      {checkForWeb3Data(web3Data) ? (
        <Web3Context.Provider value={web3Data}>
          <Routes>
            <Route
              path="/"
              element={
                <NavMenu>
                  <Link to="/notifications" className='nav-button'>NOTIFICATIONS</Link>
                  <Link to="/secret" className='nav-button'>SECRET NOTIFICATION</Link>
                  <Link to="/channels" className='nav-button'>CHANNELS</Link>
                  <Link to="/embed" className='nav-button'>EMBDED</Link>
                </NavMenu>
              }
            />
            <Route
              path="/notifications"
              element={<NotificationsTest />}
            />
            <Route
              path="/secret"
              element={<SecretNotificationsTest />}
            />
        
            <Route
              path="/channels"
              element={<ChannelsTest />}
            />

            <Route
              path="/embed"
              element={<EmbedTest />}
            />
          </Routes>
        </Web3Context.Provider>
      ) : null}
    </StyledApp>
  );
}

export default App;
