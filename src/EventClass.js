class EventClass {

  constructor() {
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.unload = this.unload.bind(this);

    this._eventCallbacks = {};
  }

  /**
   * Add an event callback similar to the way you'd do it for DOM elements
   * @param {string} eventType - the type of event to attach the callback to
   * @param {function} callbackRef - a callback function to call when this event is triggered
   */
  addEventListener(eventType, callbackRef) {
    // Make sure an event array exists before trying to add callback to it
    if ((typeof eventType !== 'string') && (typeof callbackRef !== 'function')) return false;

    if (!this._eventCallbacks[eventType] || !Array.isArray(this._eventCallbacks[eventType])) {
      this._eventCallbacks[eventType] = [];
    }

    this._eventCallbacks[eventType].push(callbackRef);
    return true;
  }

  /**
   * This function removes an attached callback function from the list of callbacks.
   * It removes the last in the in, if for some reason there is more than one reference
   * to the same function attached
   * @param  {string} eventType - type of event that the callback is attached to
   * @param  {function} callbackRef - the callback to be removed from the callback array
   * @return {[type]}
   */
  removeEventListener(eventType, callbackRef) {
    if (
      !this._eventCallbacks[eventType] ||
      !Array.isArray(this._eventCallbacks[eventType])
    ) return false;

    for (let i = this._eventCallbacks[eventType].length - 1; i >= 0; i -= 1) {
      if (this._eventCallbacks[eventType][i] === callbackRef) {
        // Create new array without the matching callback
        this._eventCallbacks[eventType] = [
          ...this._eventCallbacks[eventType].slice(0, i),
          ...this._eventCallbacks[eventType].slice(i + 1),
        ];
        return true;
      }
    }
    return false;
  }

  /**
   * Dispatches an event to registered callbacks
   * @param  {string} eventType - the type of event that's being triggered
   * @param  {object} event - some kind of payload for the action that is being triggered
   * @return {boolean} - returns whether this event triggered a callback
   */
  dispatchEvent(eventType, event) {
    if (
      !this._eventCallbacks[eventType] ||
      !Array.isArray(this._eventCallbacks[eventType])
    ) return false;
    this._eventCallbacks[eventType].map(callback => callback({ type: eventType, value: event }));
    return true;
  }

  // Releases any variable references so that it can be cleaned up gracefully when no longer needed
  unload() {
    this._eventCallbacks = {};
  }
}

export default EventClass;
