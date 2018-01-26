
import adsEnabled from './adsEnabledStatus'
import prebid from './prebid/prebidModule'
import prebidConfig from './prebid/prebidConfig'
import amazonBidder from './amazon/amazonBidder'
import {logPerformanceMilestone} from '../dev/performance'

if (adsEnabled) {
  amazonBidder()
  prebid()
  prebidConfig()
} else {
  // console.log('Ads are disabled. Not setting up DFP or Prebid.')
  logPerformanceMilestone('ads_code_loaded')
}
