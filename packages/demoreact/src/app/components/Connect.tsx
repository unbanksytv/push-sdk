import { useEffect } from "react"
import styled from "styled-components"
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

interface NwMappingType {
  [key: number]: string
}

const NETWORK_MAPPING : NwMappingType = {
  1: 'ETH_MAIN_NET',
  42: 'KOVAN',
  3: 'ROPSTEN',
  37: 'POLYGON_MAINNET',
  80001: 'POLYGON_MUMBAI'
};

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 37, 80001],
})

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20;

  & .account {
    font-size: 1.2rem;
    border: 1px solid green;
    border-radius: 3px;
    padding: 4px 7px;
    font-weight: 500;
    font-family: monospace;
  }

  & .network {
    margin: 5px 0;
  }
`;

const ConnectButton = () => {
  const { active, account, activate, deactivate, chainId } = useWeb3React()


  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', 'true')
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', 'false')
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', 'true')
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [activate]);

  return (
    <Wrapper>
      {active ? (
          <>
            <p>Connected with <span className="account">{account}</span></p>
            {chainId ? <p className="network">{NETWORK_MAPPING[chainId]}</p> : null}
            <button onClick={disconnect}>Disconnect Metamask</button>
          </>
      ) : (
        <button onClick={connect}>Connect to MetaMask</button>
      )}
    </Wrapper>
  )
};

export default ConnectButton;