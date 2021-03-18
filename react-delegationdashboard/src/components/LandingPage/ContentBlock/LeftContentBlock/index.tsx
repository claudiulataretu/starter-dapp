import { Row, Col } from 'antd';
import { Slide } from 'react-awesome-reveal';

import SvgIcon from '../../../../common/SvgIcon';

import * as S from './styles';

interface LeftContentBlockType {
  icon?: string;
  title?: string,
  content?: string;
  section?: object[];
  id?: string;
}

const LeftContentBlock = ({ icon, title, content, section, id }: LeftContentBlockType) => {
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
              <S.Content>{content}</S.Content>
              <S.ServiceWrapper>
                <Row justify="space-between">
                  {/* {section &&
                    typeof section === 'object' &&
                    section.map((item, id) => {
                      return (
                        <Col key={id} span={11}>
                          <SvgIcon src={item.icon} width="60px" height="60px" />
                          <S.MinTitle>{item.title}</S.MinTitle>
                          <S.MinPara>{item.content}</S.MinPara>
                        </Col>
                      );
                    })} */}
                </Row>
              </S.ServiceWrapper>
            </S.ContentWrapper>
          </Slide>
        </Col>
      </Row>
    </S.LeftContentBlock>
  );
};

export default LeftContentBlock;
