import { useState, Fragment, lazy, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Slide, Fade } from 'react-awesome-reveal';

import { Form, InputNumber, Card, Slider } from 'antd';

import * as S from './styles';

const Button = lazy(() => import('../../../common/Button'));

const ApyCalculator = () => {
  const [netTotalStake, setNetTotalStake] = useState(8000000);
  const [userStake, setUserStake] = useState(1000);

  const [agencyBaseStake, setAgencyBaseStake] = useState(200000);
  const [agencyTopupStake, setAgencyTopupStake] = useState(0);
  const [agencyFee, setAgencyFee] = useState(15);

  const [spApy, setSpApy] = useState(0);
  const [delegatorApy, setDelegatorApy] = useState(0);
  const [delegatorYearly, setDelegatorYearly] = useState(0);
  const [delegatorMonthly, setDelegatorMonthly] = useState(0);
  const [delegatorWeekly, setDelegatorWeekly] = useState(0);
  const [delegatorDaily, setDelegatorDaily] = useState(0);

  const constants = {
    egldName: 'eGLD',
    stakePerNode: 2500,
    protocolSustainability: 0.1,
    numNodes: 3200,
    topUpFactor: 0.25,
    topUpGradient: 3000000,
    genesisTokenSupply: 20000000,
    inflation: [
      0.10845130,
      0.09703538,
      0.08561945,
      0.07420352,
      0.06278760,
      0.05137167,
      0.03995574,
      0.02853982,
      0.01712389,
      0.00570796
    ]
  };

  useEffect(() => {
    const rewardsPerEpoch = (constants.genesisTokenSupply * constants.inflation[0]) / 365;
    const rewardsPerEpochWithoutProtocolSustainability = (1 - constants.protocolSustainability) * rewardsPerEpoch;
    const topupRewardsLimit = constants.topUpFactor * rewardsPerEpochWithoutProtocolSustainability;
    const networkBaseStake = constants.numNodes * constants.stakePerNode;
    const networkTopupStake = netTotalStake - networkBaseStake;

    let networkTopupRewards = 0;
    if (networkTopupStake != 0) {
      networkTopupRewards = ((2 * topupRewardsLimit) / Math.PI) * Math.atan(networkTopupStake / constants.topUpGradient);
    }

    const networkBaseRewards = rewardsPerEpochWithoutProtocolSustainability - networkTopupRewards;
    const spTotalStake = agencyBaseStake + agencyTopupStake;
    const spBaseRewards = (agencyBaseStake / networkBaseStake) * networkBaseRewards;

    let spTopupRewards = 0;
    if (networkTopupRewards != 0) {
      spTopupRewards = (agencyTopupStake / networkTopupStake) * networkTopupRewards;
    }

    let spAPY = ((365 * (spBaseRewards + spTopupRewards)) / spTotalStake) || 0;
    let delegatorApy = spAPY - (agencyFee / 100 * spAPY);

    let delegatorYearly = delegatorApy * userStake;
    let delegatorDaily = delegatorYearly / 365;
    let delegatorWeekly = delegatorDaily * 7;
    let delegatorMonthly = delegatorDaily * 30;

    setSpApy(spAPY);
    setDelegatorApy(delegatorApy);
    setDelegatorYearly(delegatorYearly);
    setDelegatorDaily(delegatorDaily);
    setDelegatorWeekly(delegatorWeekly);
    setDelegatorMonthly(delegatorMonthly);
  }, [netTotalStake, userStake, agencyBaseStake, agencyTopupStake, agencyFee]);

  return (
    <S.Container>
      <Row gutter={[0, 20]} justify='center' align='middle' style={{ display: 'flex', width: '100%' }}>
        <Col lg={18} md={24} sm={24} xs={24}>
          
          <Fade direction='down'>
            <h6 style={{marginBottom: 32}}>{'APY Calculator'}</h6>
          </Fade>

          {/* Network Total Stake slider */}
          <Slide direction='down'>
            <Row justify='center' style={{ display: 'flex' }}>
              <Col lg={6} md={24} sm={24} xs={24}>
                <p>Network Total Stake</p>
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                <Slider
                  step={500000}
                  value={netTotalStake}
                  min={8000000}
                  max={13000000}
                  tipFormatter={(value?: number) => `${(value || 8000000).toLocaleString('en-US')}`}
                  onChange={(value: number) => setNetTotalStake(value)} />
              </Col>
              <Col lg={6} md={24} sm={24} xs={24}>
                <p>{`${netTotalStake.toLocaleString('en-US')} ${constants.egldName}`}</p>
              </Col>
            </Row>
          </Slide>

          {/* Your Delegation slider */}
          <Slide direction='down'>
            <Row justify='center' style={{ display: 'flex' }}>
              <Col lg={6} md={24} sm={24} xs={24}>
                <p>Your Delegation</p>
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                <Slider
                  min={1}
                  max={10000}
                  step={1}
                  value={userStake}
                  tipFormatter={(value?: number) => `${(value || 8000000).toLocaleString('en-US')}`}
                  onChange={(value: number) => setUserStake(value)} />
              </Col>
              <Col lg={6} md={24} sm={24} xs={24}>
                <InputNumber
                  value={userStake}
                  size='large'
                  style={{width: '60%', minWidth: '100px'}}
                  min={0}
                  formatter={value => `${(value || 1000).toLocaleString('en-US')} ${constants.egldName}`}
                  parser={value => parseInt((value || '0,0 eGLD').replace(',', '').replace(' eGLD', ''))}
                  onChange={(value: number) => setUserStake(value) } />
              </Col>
            </Row>
          </Slide>

          {/* Agency Variables */}
          <Slide direction='down'>
            <S.SubTitle>{'Agency Variables'}</S.SubTitle>
            <Row gutter={[0, 20]} justify='center' align='middle' style={{ display: 'flex', marginTop: '16px' }}>
              <Col lg={4} md={12} sm={12} xs={12}>
                <p style={{ margin: 0 }}>Base Stake (eGLD)</p>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
                <InputNumber
                  value={agencyBaseStake}
                  size='large'
                  min={0}
                  onChange={(value: number) => setAgencyBaseStake(value) } />
              </Col>

              <Col lg={4} md={12} sm={12} xs={12}>
                <p style={{ margin: 0 }}>TopUp (eGLD)</p>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
                <InputNumber
                  value={agencyTopupStake}
                  size='large'
                  min={0}
                  onChange={(value: number) => setAgencyTopupStake(value) } />
              </Col>

              <Col lg={4} md={12} sm={12} xs={12}>
                <p style={{ margin: 0 }}>Fee (%)</p>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
                <InputNumber
                  value={agencyFee}
                  size='large'
                  min={0}
                  step={0.1}
                  precision={2}
                  onChange={(value: number) => setAgencyFee(value) } />
              </Col>
            </Row>
          </Slide>

          <Slide direction='down'>
            <S.SubTitle>{'Results'}</S.SubTitle>
          </Slide>
          <Row gutter={[20, 20]} justify='center' align='middle' style={{ display: 'flex', marginBottom: 16 }}>
            <Col lg={6} md={24} sm={24} xs={18}>
              <Fade>
                <Card title='APY' headStyle={{ fontSize: '1.8rem', fontWeight: 400, padding: '0' }} bodyStyle={{ padding: '16px', height: 86, alignItems: 'center' }}>
                  <h6 style={{ fontSize: '2em', fontWeight: 500, margin: '0' }}>{(delegatorApy * 100).toFixed(2)}%</h6>
                </Card>
              </Fade>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Fade>
                <Card title='eGLD Rewards' headStyle={{ fontSize: '1.8rem', fontWeight: 400, padding: 0 }} bodyStyle={{ paddingRight: 0, paddingLeft: 0, paddingTop: 16, paddingBottom: 16, height: 86 }}>
                  <Row justify='space-around' align='middle' style={{ display: 'flex' }}>
                    <Col span={4}>
                      <Row justify='center'><S.ApyPeriodTitle>Year</S.ApyPeriodTitle></Row>
                      <Row justify='center'><S.NoMargin>{delegatorYearly.toFixed(2)}</S.NoMargin></Row>
                    </Col>
                    <Col span={4}>
                      <Row justify='center'><S.ApyPeriodTitle>Month</S.ApyPeriodTitle></Row>
                      <Row justify='center'><S.NoMargin>{delegatorMonthly.toFixed(3)}</S.NoMargin></Row>
                    </Col>
                    <Col span={4}>
                      <Row justify='center'><S.ApyPeriodTitle>Week</S.ApyPeriodTitle></Row>
                      <Row justify='center'><S.NoMargin>{delegatorWeekly.toFixed(4)}</S.NoMargin></Row>
                    </Col>
                    <Col span={4}>
                      <Row justify='center'><S.ApyPeriodTitle>Day</S.ApyPeriodTitle></Row>
                      <Row justify='center'><S.NoMargin>{delegatorDaily.toFixed(4)}</S.NoMargin></Row>
                    </Col>
                  </Row>
                </Card>
              </Fade>
            </Col>
          </Row>

          <Slide direction='down'>
            <Button
              width='true'
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/stake';
              }}
            >
              {'Stake Now'}
            </Button>
          </Slide>
        </Col>
      </Row>
    </S.Container>
  );
};

export default ApyCalculator;
