import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { alternateAccentColor } from 'js/theme/default'

// Can replace this with a proper theme after fully migrating to
// material-ui 1.0.
// https://github.com/callemall/material-ui/blob/v1-beta/src/Input/Input.js#L78
const styles = theme => ({
  inputUnderline: {
    '&:after': {
      borderColor: alternateAccentColor
    }
  },
  formLabelRoot: {
    '&$formLabelFocused': {
      color: alternateAccentColor
    }
  },
  formLabelFocused: {}
})

class InviteFriend extends React.Component {
  getReferralUrl () {
    const baseURL = 'https://tab.gladly.io'
    const referralUrl = this.props.user.username
      ? `${baseURL}/?u=${this.props.user.username}`
      : baseURL
    return referralUrl
  }

  onTextFieldClicked () {
    this.input.select()
  }

  render () {
    const { classes } = this.props
    const referralUrl = this.getReferralUrl()

    return (
      <TextField
        id={'refer-friend-input'}
        inputRef={(input) => { this.input = input }}
        onClick={this.onTextFieldClicked.bind(this)}
        value={referralUrl}
        label={'Share this link'}
        helperText={this.props.user.username
          ? `and you'll get 350 Hearts for every person who joins!`
          : `and have a bigger positive impact!`
        }
        InputProps={{
          classes: {
            underline: classes.inputUnderline
          }
        }}
        /* eslint-disable-next-line react/jsx-no-duplicate-props */
        inputProps={{
          style: {
            textAlign: 'left'
          }
        }}
        InputLabelProps={{
          FormLabelClasses: {
            root: classes.formLabelRoot,
            focused: classes.formLabelFocused
          }
        }}
        style={this.props.style}
      />
    )
  }
}

InviteFriend.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  classes: PropTypes.object.isRequired,
  style: PropTypes.object
}

InviteFriend.defaultProps = {
  style: {}
}

export default withStyles(styles)(InviteFriend)
