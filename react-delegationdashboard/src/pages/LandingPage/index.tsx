import { lazy, Suspense } from 'react';
import 'antd/dist/antd.css';

import GlobalStyles from '../../globalStyles';

import IntroContent from '../../content/IntroContent.json';
import MiddleBlockContent from '../../content/MiddleBlockContent.json';
import AboutContent from '../../content/AboutContent.json';
import MissionContent from '../../content/MissionContent.json';
import ProductContent from '../../content/ProductContent.json';
import ContactContent from '../../content/ContactContent.json';
import Header from 'components/LandingPage/Header';
import Footer from 'components/LandingPage/Footer';
import ApyCalculator from 'components/LandingPage/ApyCalculator';

const LeftContentBlock = lazy(() => import('../../components/LandingPage/ContentBlock/LeftContentBlock'));
const RightContentBlock = lazy(() => import('../../components/LandingPage/ContentBlock/RightContentBlock'));
const MiddleBlock = lazy(() => import('../../components/LandingPage/MiddleBlock'));
const Container = lazy(() => import('../../common/Container'));
const ScrollToTop = lazy(() => import('../../common/ScrollToTop'));


const LandingPage = () => {
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header />
      <Container>
      <ScrollToTop />
      <ApyCalculator />
      <RightContentBlock
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
      />
      <LeftContentBlock
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />
      <RightContentBlock
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />

      <LeftContentBlock
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
    </Container>
    <Footer />
    </Suspense>
  );
};

export default LandingPage;
