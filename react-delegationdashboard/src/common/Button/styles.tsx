import styled from 'styled-components';

type Props = {
    color?: string;
    width?: string;
}

export const Button = styled.button<Props>`
  background: ${(props) => props.color || '#0d47a1'};
  color: ${(props) => (props.color ? '#0d47a1' : '#fff')};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: ${(props) => (props.color ? '1px solid #0d47a1' : '0px')};
  border-radius: 8px;
  height: 60px;
  outline: none;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: ${(props) => (props.width ? '180px' : '100%')};;

  @media only screen and (max-width: 1024px) {
    width: ${(props) => (props.width ? '160px' : '100%')};
  }

  @media only screen and (max-width: 768px) {
    width: ${(props) => (props.width ? '140px' : '100%')};
  }

  @media only screen and (max-width: 480px) {
    width: ${(props) => (props.width ? '130px' : '100%')};
  }
`;