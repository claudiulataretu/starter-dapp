import { lazy, Fragment } from 'react';
import { Row, Col } from 'antd';

import * as S from './styles';

const SvgIcon = lazy(() => import('../../../common/SvgIcon'));
const Container = lazy(() => import('../../../common/Container'));

interface SocialLinkType {
  href?: string;
  src?: string;
  flag?: string;
}

const Footer = () => {

  const SocialLink = ({ href, src }: SocialLinkType) => {
    return (
      <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="35px" height="35px" />
      </a>
      </div>
    );
  };

  const SocialFlagsLink = ({ href, src, flag }: SocialLinkType) => {
    return (
      <div style={{display: 'inline-flex'}}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="35px" height="35px" />
      </a>
      /
      <SvgIcon src={flag} width="15px" height="15px" />
      </div>
    );
  };


  return (
    <Fragment>
        <S.Extra>
          <Container>
            <Row
              justify="space-between"
              align="middle"
              style={{ paddingTop: '1.5rem', display:'flex' }}
            >
              <Col>
              <S.NavLink to="/">
                <S.LogoContainer>
                  <SvgIcon
                    src="lock-logo.png"
                    aria-label="homepage"
                    width="56px"
                    height="64px"
                  />
                </S.LogoContainer>
              </S.NavLink>
              </Col>
              <Col>
              <S.FooterContainer>
                <SocialFlagsLink
                  href="https://t.me/mgstaking"
                  src="telegram.svg"
                  flag="romania.svg"
                />
                <SocialLink
                  href="https://twitter.com/mgstaking"
                  src="twitter.svg"
                />
                <SocialLink
                  href="https://www.linkedin.com/company/mgstaking/"
                  src="linkedin.svg"
                />
                <SocialFlagsLink
                  href="https://t.me/mgstakingInt"
                  src="telegram.svg"
                  flag="english.svg"
                />
                <SocialLink
                  href="https://www.facebook.com/mgstaking"
                  src="facebook.svg"
                />
                <SocialLink
                  href="https://www.youtube.com/channel/UCMsPQUxksrQK5izXYOaHfQA"
                  src="youtube.svg"
                />
              </S.FooterContainer>
              </Col>
            </Row>
          </Container>
        </S.Extra>
    </Fragment>
  );
};

export default Footer;
