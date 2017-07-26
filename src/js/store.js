export default {
    state: {
      formControlElements: {
        searchActive: true,
        issuerDetailsActive: false,
        customizeActive: false,
        receiverDetailsActive: false,
        overviewActive: false,
        imageInputActive: true
      }
    },
    setMessageAction (newValue) {
        this.debug && console.log('setMessageAction triggered with', newValue)
        this.state.message = newValue
    },
    clearMessageAction () {
        this.debug && console.log('clearMessageAction triggered')
        this.state.message = 'action B triggered'
    }
}
