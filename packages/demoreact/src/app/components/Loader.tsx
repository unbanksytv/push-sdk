import React from 'react';
import styled from 'styled-components';

type LoaderType = {
  show?: boolean;
}

const Loader = ({ show }: LoaderType) => {
    if (!show) return null;

    return (
        <LoadingOverlay>
            <div className="loaderText">Loading...</div>
        </LoadingOverlay>
    );
};

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.2;

    & .loaderText {
      font-size: 3rem;
      color: #fff;
    }
`;

export default Loader;