import EventClass from './EventClass';

/**
 * This class adds an interval that will call the tick function every X milliseconds.
 */
class TickClass extends EventClass {

  constructor(config, ...params) {
    super(config, ...params);

    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);
    this.tick = this.tick.bind(this);

    this._config = {
      ...this._config,
      frequency: 1000,
      autoStartTicker: true,
      ...config,
    };
    this._intervalRef = null;

    if (this._config.autoStartTicker) this.startTicker();
  }

  /**
   * Creates the interval that will trigger the tick function each time it's executed
   */
  startTicker() {
    this._intervalRef = window.setInterval(this.tick, this._config.frequency || 1000);
  }

  /**
   * Clears the tick interval
   */
  stopTicker() {
    window.clearInterval(this._intervalRef);
    this._intervalRef = null;
  }

  /**
   * A function meant to be replaced by dependent class that will be triggered
   */
  tick() {
    /* eslint-disable no-console */
    console.warn('Tick method needs to be overridden in for this class to do anything.');
    /* eslint-enable no-console */
    this.stopTicker();
  }

  /**
   * Stops interval and unloads parent class
   * @param  {array} params - a list of parameters passed to this function
   */
  unload(...params) {
    this.stopTicker();
    super.unload(...params);
  }
}

export default TickClass;
