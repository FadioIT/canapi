const isWinPlatfrom = process.platform === "win32";

let CanApi = function () { };

if (isWinPlatfrom) {
  CanApi = require("./build/Release/can_api.node").CanApi;
}

const createBuffer = require("./helpers/create_buffer");
const bitRates = require("./helpers/bit_rates");

const CanApiWrapper = function (channel, bitRate = bitRates.canBITRATE_500K) {
  const CanApiInstance = new CanApi(channel, bitRate);

  const ifWinPlatformExecute = (propertyName, defaultValue, ...args) => {
    if (isWinPlatfrom) {
      return CanApiInstance[propertyName](...args);
    }

    return defaultValue;
  };

  return {
    readMessage: (options = {}) => {
      const defaultOptions = {
        timeout: 0,
      };

      return ifWinPlatformExecute(
        "readMessage",
        false,
        Object.assign({}, defaultOptions, options),
      );
    },
    sendMessage: (...args) => {
      return ifWinPlatformExecute("sendMessage", true, ...args);
    },
    open: (...args) => {
      return ifWinPlatformExecute("open", true, ...args);
    },
    close: (...args) => {
      return ifWinPlatformExecute("close", false, ...args);
    }
  };
};

CanApiWrapper.createBuffer = createBuffer;
CanApiWrapper.bitRates = bitRates;

module.exports = CanApiWrapper;
