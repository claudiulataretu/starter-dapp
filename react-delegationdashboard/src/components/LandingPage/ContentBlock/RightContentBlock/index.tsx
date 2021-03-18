import { Row, Col } from 'antd';
import { Slide } from 'react-awesome-reveal';

import SvgIcon from '../../../../common/SvgIcon';
import Button from '../../../../common/Button';

import { ButtonDetails } from '../../../../helpers/types';

import * as S from './styles';

interface RightContentBlockType {
  icon?: string;
  title?: string,
  content?: string;
  button?: ButtonDetails[];
  id?: string;
}

const RightBlock = ({ title, content, button, icon, id }: RightContentBlockType) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <S.RightBlockContainer>
      <Row justify='space-between' align="middle" id={id} style={{display:'flex'}}>
        <Col lg={11} md={11} sm={11} xs={24}>
          <Slide direction='left'>
            <S.ContentWrapper>
              <h6>{title}</h6>
              <S.Content>{content}</S.Content>
              <S.ButtonWrapper>
                {button &&
                  button.map((item, id) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        width="true"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.link) window.location.href=item.link;
                        }}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Slide>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide direction='right'>
            <SvgIcon
              src={icon}
              className="about-block-image"
              width="100%"
              height="100%"
            />
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
};

export default RightBlock;
