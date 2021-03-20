import { lazy, Fragment } from 'react';
import { Row, Col } from 'antd';

import { Fade } from 'react-awesome-reveal';

import * as S from './styles';

const SvgIcon = lazy(() => import('../../../common/SvgIcon'));
const Container = lazy(() => import('../../../common/Container'));

interface SocialLinkType {
  href?: string;
  src?: string;
}

const Footer = () => {

  const SocialLink = ({ href, src }: SocialLinkType) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      <Fade direction='down'>
        <S.Extra>
          <Container>
            <Row
              justify="space-between"
              align="middle"
              style={{ paddingTop: '1.5rem', display:'flex' }}
            >
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
              <S.FooterContainer>
                <SocialLink
                  href="https://t.me/mgstaking"
                  src="telegram.svg"
                />
                <SocialLink
                  href="https://twitter.com/mgstaking"
                  src="twitter.svg"
                />
                <SocialLink
                  href="https://www.linkedin.com/company/mgstaking/"
                  src="linkedin.svg"
                />
                <SocialLink
                  href="https://t.me/mgstakingInt"
                  src="telegram.svg"
                />
                <SocialLink
                  href="https://www.facebook.com/mgstaking"
                  src="facebook.svg"
                />
              </S.FooterContainer>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default Footer;
