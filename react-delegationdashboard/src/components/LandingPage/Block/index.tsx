import { Fade } from 'react-awesome-reveal';

import * as S from './styles';

interface BlockType {
  title?: string;
  content?: string;
  padding?: boolean;
}

const Block = ({ title, content, padding }: BlockType) => {
  return (
    <S.Container>
      <Fade direction='left'>
        <h6>{title}</h6>
        <S.TextWrapper>
          <S.Content>{content}</S.Content>
        </S.TextWrapper>
      </Fade>
    </S.Container>
  );
};

export default Block;
