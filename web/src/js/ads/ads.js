import adsEnabled from './adsEnabledStatus'
import prebid from './prebid/prebidModule'
import prebidConfig from './prebid/prebidConfig'
import amazonBidder from './amazon/amazonBidder'
import handleAdsLoaded from './handleAdsLoaded'
import { isInEuropeanUnion } from 'utils/client-location'

const loadAdCode = (isInEU) => {
  // console.log(`Loading ads. "In European Union" is ${isInEU}.`)
  if (adsEnabled()) {
    handleAdsLoaded()
    amazonBidder(isInEU)
    prebid()
    prebidConfig(isInEU)
  } else {
  // console.log('Ads are disabled. Not setting up DFP or Prebid.')
  }
}

// Determine if the user is in the EU, which may affect the
// ads we show.
isInEuropeanUnion()
  .then((isInEU) => {
    loadAdCode(isInEU)
  })
  // eslint-disable-next-line handle-callback-err
  .catch((err) => {
    // Assume not in EU.
    loadAdCode(false)
  })
