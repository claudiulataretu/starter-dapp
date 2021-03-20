import { lazy, Suspense } from 'react';
import 'antd/dist/antd.css';

import GlobalStyles from '../../globalStyles';

import IntroContent from '../../content/IntroContent.json';
import MiddleBlockContent from '../../content/MiddleBlockContent.json';
import DashboardContent from '../../content/DashboardContent.json';
import InfrastructureContent from '../../content/InfrastructureContent.json';
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
      <RightContentBlock
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="startup.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.sections}
        id="about"
      />
      <LeftContentBlock
        title={DashboardContent.title}
        content={DashboardContent.sections}
        section={DashboardContent.bullets}
        button={DashboardContent.button}
        icon="preview.png"
        id="dashboard"
      />
      <RightContentBlock
        title={InfrastructureContent.title}
        content={InfrastructureContent.text}
        icon="web-hosting.svg"
        id="infrastructure"
      />
      <ApyCalculator />
    </Container>
    <Footer />
    </Suspense>
  );
};

export default LandingPage;
