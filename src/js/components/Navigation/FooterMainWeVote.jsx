import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OpenExternalWebSite from '../../common/components/Widgets/OpenExternalWebSite';
import { isWebApp } from '../../common/utils/isCordovaOrWebApp';
import AppObservableStore from '../../stores/AppObservableStore';
import VoterStore from '../../stores/VoterStore';

const BallotElectionListWithFilters = React.lazy(() => import(/* webpackChunkName: 'BallotElectionListWithFilters' */ '../Ballot/BallotElectionListWithFilters'));
const DeleteAllContactsButton = React.lazy(() => import(/* webpackChunkName: 'DeleteAllContactsButton' */ '../SetUpAccount/DeleteAllContactsButton'));

class FooterMainWeVote extends Component {
  constructor (props) {
    super(props);
    this.state = {
      voterContactEmailListCount: 0,
    };
  }

  componentDidMount () {
    this.onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.voterStoreListener.remove();
  }

  onVoterStoreChange () {
    const voterContactEmailListCount = VoterStore.getVoterContactEmailListCount();
    this.setState({
      voterContactEmailListCount,
    });
  }

  openHowItWorksModal = () => {
    // console.log('Opening modal');
    AppObservableStore.setShowHowItWorksModal(true);
  }

  render () {
    const { classes } = this.props;
    const { voterContactEmailListCount } = this.state;
    return (
      <Wrapper>
        {isWebApp() && (
          <SearchEngineOptimizationSection>
            <SearchEngineOptimizationRow>
              <SearchEngineOptimizationColumn>
                <Suspense fallback={<></>}>
                  <BallotElectionListWithFilters
                    ballotBaseUrl="/ballot"
                    hideUpcomingElectionTitle
                    showSimpleDisplay
                    showSimpleModeTitle
                    stateToShow="all"
                  />
                </Suspense>
              </SearchEngineOptimizationColumn>
              <SearchEngineOptimizationColumn className="u-show-desktop-tablet">
                <Suspense fallback={<></>}>
                  <BallotElectionListWithFilters
                    ballotBaseUrl="/ballot"
                    candidatesMode
                    hideUpcomingElectionTitle
                    showSimpleDisplay
                    showSimpleModeTitle
                    stateToShow="all"
                  />
                </Suspense>
              </SearchEngineOptimizationColumn>
              <SearchEngineOptimizationColumn className="u-show-desktop-tablet">
                <Suspense fallback={<></>}>
                  <BallotElectionListWithFilters
                    ballotBaseUrl="/ballot"
                    hideUpcomingElectionTitle
                    showSimpleDisplay
                    showSimpleModeTitle
                    stateToShow="all"
                    voterGuidesMode
                  />
                </Suspense>
              </SearchEngineOptimizationColumn>
            </SearchEngineOptimizationRow>
          </SearchEngineOptimizationSection>
        )}
        <TopSectionOuterWrapper>
          <TopSectionInnerWrapper>
            <OneRow>
              <div id="footerLinkHowItWorks" className={classes.onClickDiv} onClick={this.openHowItWorksModal}>How It Works</div>
              <RowSpacer />
              <OpenExternalWebSite
                linkIdAttribute="footerLinkWeVoteHelp"
                url="https://help.wevote.us/hc/en-us"
                target="_blank"
                body={(
                  <span>Help</span>
                )}
                className={classes.link}
              />
              <RowSpacer />
              <Link id="footerLinkPrivacy" className={classes.link} to="/more/privacy">Privacy</Link>
              <RowSpacer />
              <Link id="footerLinkTermsOfUse" className={classes.link} to="/more/terms">Terms</Link>
            </OneRow>
            <OneRow>
              {isWebApp() ? (
                <>
                  <OpenExternalWebSite
                    linkIdAttribute="footerLinkAbout"
                    url="https://wevote.us/more/about"
                    target="_blank"
                    body={(
                      <span>About</span>
                    )}
                    className={classes.link}
                  />
                  <RowSpacer />
                  <OpenExternalWebSite
                    linkIdAttribute="footerLinkTeam"
                    url="https://wevote.us/more/about"
                    target="_blank"
                    body={(
                      <span>Team</span>
                    )}
                    className={classes.link}
                  />
                  <RowSpacer />
                  <OpenExternalWebSite
                    linkIdAttribute="footerLinkCredits"
                    url="https://wevote.us/more/credits"
                    target="_blank"
                    body={(
                      <span>Credits &amp; Thanks</span>
                    )}
                    className={classes.link}
                  />
                </>
              ) : (
                <>
                  <Link to="/more/faq" className={classes.link}>Frequently Asked Questions</Link>
                </>
              )}
            </OneRow>
          </TopSectionInnerWrapper>
        </TopSectionOuterWrapper>
        <BottomSection>
          <Text>
            <WeVoteName>
              We Vote
            </WeVoteName>
            {' '}
            is a nonpartisan nonprofit.
            <br />
            We do not support or oppose any political party or candidate.
          </Text>
          <>
            {(voterContactEmailListCount > 0) && (
              <DeleteAllContactsWrapper>
                <Suspense fallback={<></>}>
                  <DeleteAllContactsButton textSizeSmall />
                </Suspense>
              </DeleteAllContactsWrapper>
            )}
          </>
        </BottomSection>
      </Wrapper>
    );
  }
}
FooterMainWeVote.propTypes = {
  classes: PropTypes.object,
};

const styles = () => ({
  link: {
    color: '#808080',
    '&:hover': {
      color: '#4371cc',
    },
    textDecoration: 'none',
  },
  bottomLink: {
    color: '#333',
    textDecoration: 'none',
    '&:hover': {
      color: '#4371cc',
    },
  },
  onClickDiv: {
    color: '#808080',
    cursor: 'pointer',
    '&:hover': {
      color: '#4371cc',
      textDecoration: 'underline',
    },
  },
});

const BottomSection = styled('div')`
  display: flex;
  flex-flow: column;
  padding-top: 15px;
  align-items: center;
`;

const DeleteAllContactsWrapper = styled('div')`
  margin-top: 0;
`;

const OneRow = styled('div')`
  color: #808080;
  display: flex;
  // font-size: 13px;
  justify-content: center;
  margin-bottom: 15px;
`;

const RowSpacer = styled('div')`
  margin-right: 15px;
`;

const SearchEngineOptimizationColumn = styled('div')`
  margin-right: 12px;
`;

const SearchEngineOptimizationRow = styled('div')`
  display: flex;
  justify-content: space-evenly;
`;

const SearchEngineOptimizationSection = styled('div')`
  display: flex;
  flex-flow: column;
  margin-bottom: 84px;
  align-items: center;
`;

const Text = styled('p')(({ theme }) => (`
  color: #808080;
  font-size: 14px;
  margin-right: 0.5em;
  text-align: center;
  ${theme.breakpoints.down('md')} {
    font-size: 14px;
  }
`));

const TopSectionInnerWrapper = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const TopSectionOuterWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const WeVoteName = styled('span')`
  font-weight: 600;
`;

const Wrapper = styled('div')`
`;

export default withStyles(styles)(FooterMainWeVote);
