function useGeolocation (successCallback) {
  if ('navigator' in window && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback)
  } else {
    console.log('Unable to determine location')
  }
}

export { useGeolocation }
