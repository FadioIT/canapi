const isSupportedPlatform = process.platform !== 'darwin';

let CanApi = function() {};

if (isSupportedPlatform) {
  CanApi = require('./build/Release/can_api.node').CanApi;
}

const createBuffer = require('./helpers/create_buffer');
const bitRates = require('./helpers/bit_rates');

const CanApiWrapper = function(channel, bitRate = bitRates.canBITRATE_500K) {
  const CanApiInstance = new CanApi(channel, bitRate);

  const ifSupportedPlatformExecute = (propertyName, defaultValue, ...args) => {
    if (isSupportedPlatform) {
      return CanApiInstance[propertyName](...args);
    }

    return defaultValue;
  };

  return {
    readMessage: (options = {}) => {
      const defaultOptions = {
        timeout: 0,
      };

      return ifSupportedPlatformExecute(
        'readMessage',
        false,
        Object.assign({}, defaultOptions, options),
      );
    },
    sendMessage: (...args) => {
      return ifSupportedPlatformExecute('sendMessage', true, ...args);
    },
    open: (...args) => {
      return ifSupportedPlatformExecute('open', true, ...args);
    },
    close: (...args) => {
      return ifSupportedPlatformExecute('close', false, ...args);
    },
  };
};

CanApiWrapper.createBuffer = createBuffer;
CanApiWrapper.bitRates = bitRates;

module.exports = CanApiWrapper;
