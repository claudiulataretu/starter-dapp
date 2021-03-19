import { useState, Fragment, lazy, useEffect } from 'react';
import { Row, Col } from 'antd';

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

    let spAPY = (365 * (spBaseRewards + spTopupRewards)) / spTotalStake;
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
      <Row justify='center' align='middle' style={{ display: 'flex', width: '100%' }}>
        <Col lg={18} md={24} sm={24} xs={24}>
          <h6 style={{marginBottom: 32}}>{'APY Calculator'}</h6>

          {/* Network Total Stake slider */}
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

           {/* Your Delegation slider */}
           <Row justify='center' style={{ display: 'flex' }}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <p>Your Delegation</p>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Slider
                min={1}
                max={10000}
                step={10}
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

          <h6 style={{ marginTop: 32, marginBottom: 16, fontSize: '2rem' }}>{'Agency Variables'}</h6>

          {/* Agency Variables */}
          <Row justify='center' align='middle' style={{ display: 'flex', marginTop: '16px' }}>
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

          <h6 style={{ marginTop: 32, marginBottom: 16, fontSize: '2rem' }}>{'Results'}</h6>

          <Row gutter={20} justify='center' align='middle' style={{ display: 'flex', marginBottom: 16 }}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <Card title='APY' headStyle={{ fontSize: '1.8rem', fontWeight: 400, padding: '0' }} bodyStyle={{ padding: '16px', height: 86, alignItems: 'center' }}>
                <h6 style={{ fontSize: '2em', fontWeight: 500, margin: '0' }}>{(delegatorApy * 100).toFixed(2)}%</h6>
              </Card>
            </Col>
            <Col lg={12} md={24} sm={24}>
              <Card title='eGLD Rewards' headStyle={{ fontSize: '1.8rem', fontWeight: 400, padding: 0 }} bodyStyle={{ paddingRight: 0, paddingLeft: 0, paddingTop: 16, paddingBottom: 16, height: 86 }}>
                <Row justify='space-around' align='middle' style={{ display: 'flex' }}>
                  <Col span={4}>
                    <Row justify='center'><h6 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.6rem', margin: 0 }}>Year</h6></Row>
                    <Row justify='center'><p style={{ margin: 0 }}>{delegatorYearly.toFixed(2)}</p></Row>
                  </Col>
                  <Col span={4}>
                    <Row justify='center'><h6 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.6rem', margin: 0 }}>Month</h6></Row>
                    <Row justify='center'><p style={{ margin: 0 }}>{delegatorMonthly.toFixed(3)}</p></Row>
                  </Col>
                  <Col span={4}>
                    <Row justify='center'><h6 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.6rem', margin: 0 }}>Week</h6></Row>
                    <Row justify='center'><p style={{ margin: 0 }}>{delegatorWeekly.toFixed(4)}</p></Row>
                  </Col>
                  <Col span={4}>
                    <Row justify='center'><h6 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.6rem', margin: 0 }}>Day</h6></Row>
                    <Row justify='center'><p style={{ margin: 0 }}>{delegatorDaily.toFixed(4)}</p></Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Button>{'Stake Now!'}</Button>
        </Col>
      </Row>
    </S.Container>
  );
};

export default ApyCalculator;


{/*

<div class="form-group row text-center">
  <label for="netTotalStake" class="col-md-3 col-form-label var-label">Network Total Stake:</label>
  <div class="col-md-6">
    <input type="number" class="mt-2" id="netTotalStake">
  </div>
  <div class="col-md-3 var-value col-form-label text-left"><span id="netTotalStakeVal"></span></div>
</div>
<div class="form-group row text-center">
  <label for="userStake" class="col-md-3 col-form-label var-label">Your Delegation:</label>
  <div class="col-md-6">
    <input type="number" class="mt-2" id="userStake">
  </div>
  <div class="col-md-3 var-value col-form-label">
    <div class="form-group row">
      <div class="col-md-9">
        <input type="number" class="form-control" id="userStakeVal">
      </div>
      <label for="userStakeVal" class="col-md-3 col-form-label var-label">eGLD</label>
    </div>
  </div>
</div>
<div class="row">
  <div class="col">
    <h2 class="text-center mt-2 mb-4">Agency Variables</h2>
  </div>
</div>
<div class="form-group row text-center">
  <label for="agencyBaseStake" class="col-md-2 col-form-label var-label-md">Base Stake (eGLD):</label>
  <div class="col-md-2">
    <input type="number" class="form-control apy-variable" id="agencyBaseStake" value="200000">
  </div>
  <label for="agencyTopupStake" class="col-md-2 col-form-label var-label-md">TopUp (eGLD):</label>
  <div class="col-md-2">
    <input type="number" class="form-control apy-variable" id="agencyTopupStake" value="0">
  </div>
  <label for="agencyFee" class="col-md-2 col-form-label var-label-md">Fee (%):</label>
  <div class="col-md-2">
    <input type="number" class="form-control apy-variable" id="agencyFee" value="15.00">
  </div>
</div>
<div class="row">
  <div class="col">
    <h2 class="text-center mt-2 mb-4">Results</h2>
  </div>
</div>
<div class="row justify-content-center">
  <div class="col-auto text-center">
    <div class="card mb-3 arc">
      <div class="card-header">APY</div>
      <div class="card-body">
        <h2 class="card-title" id="delegator-apy"></h2>
      </div>
    </div>
  </div>
  <div class="col-auto text-center">
    <div class="card mb-3 arc wide">
      <div class="card-header">eGLD Rewards</div>
      <div class="card-body">
        <div class="row font-weight-bold">
          <div class="col-3">Year</div>
          <div class="col-3">Month</div>
          <div class="col-3">Week</div>
          <div class="col-3">Day</div>
        </div>
        <div class="row">
          <div class="col-3 p-0"><span id="yearly-rewards"></span></div>
          <div class="col-3 p-0"><span id="monthly-rewards"></span></div>
          <div class="col-3 p-0"><span id="weekly-rewards"></span></div>
          <div class="col-3 p-0"><span id="daily-rewards"></span></div>
        </div>
      </div>
    </div>
  </div>
</div>

*/}
