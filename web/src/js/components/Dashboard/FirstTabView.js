import React from 'react'
import {
  dashboardURL,
  replaceUrl
} from 'js/navigation/navigation'
import {
  setBrowserExtensionInstallId,
  setBrowserExtensionInstallTime
} from 'js/utils/local-user-data-mgr'

// The view the extensions open immediately after they're
// added to the browser.
class FirstTabView extends React.Component {
  componentDidMount () {
    // Here, we can do anything we need to do before
    // going to the main dashboard.

    // Set a unique install ID in local storage.
    setBrowserExtensionInstallId()

    // Set this as the user's installed time, which helps us
    // distinguish truly new users from returning users who
    // had cleared their local data.
    setBrowserExtensionInstallTime()

    replaceUrl(dashboardURL)
  }

  render () {
    return <span />
  }
}

export default FirstTabView
