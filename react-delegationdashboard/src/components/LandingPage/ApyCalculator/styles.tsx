import styled from 'styled-components';

export const Content = styled.p`
  margin-top: 1.5rem;
`;

export const Container = styled.div`
  position: relative;
  padding: 3.5rem 0 3rem;
  text-align: center;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 5.5rem 0 3rem;
  }
`;

export const TextWrapper = styled.div`
  border-radius: 3rem;
  max-width: 400px;
`;

export const SubTitle = styled.h6`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 2rem;
  
  @media only screen and (max-width: 414px) {
    font-size: 1.625rem;
  }
`;

export const ApyPeriodTitle = styled.h6`
  margin: 0px;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.6rem;
  
  @media only screen and (max-width: 414px) {
    font-size: 1rem;
  }
`;

export const NoMargin = styled.p`
  margin: 0px;
`;
