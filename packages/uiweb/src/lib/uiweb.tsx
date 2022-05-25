import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface ReactwebProps {}

const StyledReactweb = styled.div`
  color: pink;
`;

export function Reactweb(props: ReactwebProps) {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    console.log('React Version inside pkg @runtime: ', React.version);
    setVersion(React.version);
  }, [version]);

  
  return (
    <StyledReactweb>
      <h1>Welcome to Reactweb! {version}</h1>
    </StyledReactweb>
  );
}

export default Reactweb;
