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
