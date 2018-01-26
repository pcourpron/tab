const SEND_DATA_TIMEOUT = 3000
const performanceData = {}

const postMessage = (type, data) => {
 // Important: messages sent are NOT private. If we want
 // private messages, we need to postMessage specifically
 // to each of our extensions' domains.
  window.top.postMessage({ type: type, data: data }, '*')
}

const postPerformanceData = () => {
  postMessage('performance-data', performanceData)
}

export const logPerformanceMilestone = (milestoneName) => {
  performanceData[milestoneName] = window.performance.now()
}

setTimeout(() => {
  postPerformanceData()
}, SEND_DATA_TIMEOUT)
