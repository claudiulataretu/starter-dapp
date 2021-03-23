import { useState, Fragment, lazy } from 'react';
import { Row, Col, Drawer } from 'antd';
import { CSSTransition } from 'react-transition-group';

import * as S from './styles';

const SvgIcon = lazy(() => import('../../../common/SvgIcon'));
const Button = lazy(() => import('../../../common/Button'));

const Header = () => {
  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id);
      element?.scrollIntoView({
        behavior: 'smooth',
      });
      setVisibility(false);
    };
    return (
      <Fragment>
        <S.CustomNavLinkSmall onClick={() => scrollTo('about')}>
          <S.Span>{'About'}</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall onClick={() => scrollTo('mission')}>
          <S.Span>{'Mission'}</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall onClick={() => scrollTo('product')}>
          <S.Span>{'Product'}</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall
          style={{ width: '180px' }}
          onClick={() => scrollTo('contact')}
        >
        <S.Span>
          <Button>{'Contact'}</Button>
        </S.Span>
        </S.CustomNavLinkSmall>
      </Fragment>
    );
  };

  return (
    <S.Header>
      <S.Container>
        <Row align='middle' justify='start' gutter={20} style={{display:'flex'}}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="mgstaking v1.png" width='230px' height='103px'/>
          </S.LogoContainer>
          {/* <S.Large to="/">{'MGStaking'}</S.Large> */}
          {/* <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger> */}
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: '2.5rem' }}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  {/* <S.Outline padding="true" /> */}
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
    </S.Header>
  );
};

export default Header;
