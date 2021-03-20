import { Row, Col } from 'antd';
import { Slide } from 'react-awesome-reveal';
import { SectionDetails } from '../../../../helpers/types';

import SvgIcon from '../../../../common/SvgIcon';
import Button from '../../../../common/Button';
import { ButtonDetails } from '../../../../helpers/types';

import * as S from './styles';

interface LeftContentBlockType {
  icon?: string;
  title?: string,
  content?: string[];
  section?: SectionDetails[];
  button?: ButtonDetails[];
  id?: string;
}

const LeftContentBlock = ({ icon, title, content, section, button, id }: LeftContentBlockType) => {
  return (
    <S.LeftContentBlock>
      <Row justify='space-between' align="middle" id={id} style={{display:'flex'}}>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide direction='left'>
            <SvgIcon
              src={icon}
              className="about-block-image"
              width="100%"
              height="100%"
            />
          </Slide>
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          <Slide direction='right'>
            <S.ContentWrapper>
              <h6>{title}</h6>
              <S.Content>
                <Row justify="space-between">
                  {content &&
                  content.map((item, id) => {
                    return (
                      <p>
                        {item}
                      </p>
                    );
                  })}
                </Row>
                  {section &&
                    section.map((item, id) => {
                      return (
                        <Row justify="start" style={{display:'flex'}}>
                        <Col span={2}>
                          <SvgIcon src={item.icon} width="20px" height="20px" />
                        </Col>
                        <Col span={22}>{item.content}</Col>
                        </Row>
                      );
                    })}
                </S.Content>
                <S.ButtonWrapper>
                {button &&
                  button.map((item, id) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
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
      </Row>
    </S.LeftContentBlock>
  );
};

export default LeftContentBlock;
