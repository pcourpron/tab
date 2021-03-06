import React from 'react'
import PropTypes from 'prop-types'
import { commaFormatted, currencyFormatted } from 'js/utils/utils'
import DashboardPopover from 'js/components/Dashboard/DashboardPopover'
import RaisedButton from 'material-ui/RaisedButton'
import {
  goToInviteFriends
} from 'js/navigation/navigation'
import Sparkle from 'react-sparkle'

import appTheme, {
  dashboardIconActiveColor,
  dashboardIconInactiveColor
} from 'js/theme/default'

class MoneyRaised extends React.Component {
  constructor (props) {
    super(props)
    this.timer = 0
    this.state = {
      amountDonated: 0,
      hovering: false,
      open: false
    }
  }

  incrementAmount () {
    var latestAmountRaised = this.state.amountDonated
    var newAmountRaisedRounded = +(latestAmountRaised + 0.01).toFixed(2)
    this.setState({
      amountDonated: newAmountRaisedRounded
    })
  }

  componentDidMount () {
    this.setCounter(this.props.app)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.app && nextProps.app) {
      this.setCounter(nextProps.app)
    }
  }

  setCounter (app) {
    if (!app) { return }

    const secondsInDay = 864
    // Recalculate based on time that elapsed since the base amount.
    const moneyRaised = app.moneyRaised
    const dollarsPerDayRate = app.dollarsPerDayRate
    const secondsPerPenny = secondsInDay / (dollarsPerDayRate)

    this.setState({
      amountDonated: moneyRaised
    })

    if (!(secondsPerPenny <= 0)) {
      var millisecondsPerPenny = Math.round(Math.abs(secondsPerPenny) * 1000)
      this.timer = setInterval(this.incrementAmount.bind(this), millisecondsPerPenny)
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  onHover (hovering) {
    this.setState({
      hover: hovering
    })
  }

  onClick (event) {
    if (this.celebratingMilestone()) {
      this.props.launchFireworks(true)
    } else {
      this.setState({
        open: !this.state.open,
        anchorEl: event.currentTarget
      })
    }
  }

  handlePopoverRequestClose () {
    this.setState({
      open: false
    })
  }

  // Returns boolean, whether we're drawing attention to the current
  // amount raised
  celebratingMilestone () {
    const milestoneStart = 5e5
    const milestoneEnd = 5.03e5
    return (
      this.state.amountDonated >= milestoneStart &&
      this.state.amountDonated < milestoneEnd
    )
  }

  render () {
    if (!this.props.app) { return null }

    const celebrateMilestone = this.celebratingMilestone()
    const milestoneMoneyRaisedColor = '#FFEBA2'

    const containerStyle = {
      position: 'relative',
      userSelect: 'none',
      cursor: 'default'
    }
    const popoverStyle = {
      width: 180
    }
    const buttonContainerStyle = {
      textAlign: 'center'
    }
    const textStyle = Object.assign({}, {
      color: (
        celebrateMilestone
          ? milestoneMoneyRaisedColor
          : (
            this.state.hover
              ? dashboardIconActiveColor
              : dashboardIconInactiveColor
          )
      ),
      transition: 'color 300ms ease-in',
      cursor: 'pointer',
      fontSize: 18,
      fontFamily: appTheme.fontFamily,
      fontWeight: 'normal'
    }, this.props.style)

    const moneyRaised = this.state.amountDonated
    var amountDonated = '$' + commaFormatted(currencyFormatted(moneyRaised))

    return (
      <div
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onHover.bind(this, true)}
        onMouseLeave={this.onHover.bind(this, false)}
        style={containerStyle}>
        <span
          style={textStyle}>{amountDonated}</span>
        { celebrateMilestone ? (
          <Sparkle
            color={milestoneMoneyRaisedColor}
            count={18}
            fadeOutSpeed={40}
            overflowPx={14}
            flicker={false}
          />
        )
          : null
        }
        <DashboardPopover
          style={popoverStyle}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handlePopoverRequestClose.bind(this)}>
          <div style={{ padding: 10, paddingTop: 0 }}>
            <p>This is how much money Tabbers have raised for charity.</p>
            <p>Recruit your friends to raise more!</p>
            <div style={buttonContainerStyle}>
              <RaisedButton
                label='Invite Friends'
                primary
                onClick={goToInviteFriends}
                labelStyle={{
                  fontSize: 13
                }}
              />
            </div>
          </div>
        </DashboardPopover>
      </div>
    )
  }
}

MoneyRaised.propTypes = {
  app: PropTypes.shape({
    moneyRaised: PropTypes.number.isRequired,
    dollarsPerDayRate: PropTypes.number.isRequired
  }),
  style: PropTypes.object,
  launchFireworks: PropTypes.func
}

MoneyRaised.defaultProps = {
  style: {},
  launchFireworks: () => {}
}

export default MoneyRaised
