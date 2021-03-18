import { lazy } from 'react';
import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { ButtonDetails } from '../../../helpers/types';

import * as S from './styles';

const Button = lazy(() => import('../../../common/Button'));

interface MiddleBlockType {
  icon?: string;
  title?: string,
  content?: string;
  button?: ButtonDetails[];
}

const MiddleBlock = ({ title, content, button }: MiddleBlockType) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <S.MiddleBlock>
      <Row justify='center' align="middle" style={{display:'flex'}}>
        <Fade direction='down'>
          <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              <S.Content>{content}</S.Content>
              {button ? (
                <Button
                  name='submit'
                  type='submit'
                  onClick={() => scrollTo('mission')}
                >
                  {button[0].title}
                </Button>
              ) : (
                ''
              )}
            </Col>
          </S.ContentWrapper>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default MiddleBlock;
