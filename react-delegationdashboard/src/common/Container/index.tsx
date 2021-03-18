import * as S from './styles';

interface ContainerType {
  padding?: string;
  border?: string;
  children: any;
}


const Container = ({ padding, border, children }: ContainerType) => (
  <S.Container padding={padding} border={border}>
    {children}
  </S.Container>
);

export default Container;
