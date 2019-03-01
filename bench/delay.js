const delay = ms => {
    let timerRef;
    let rejectCallback;
  
    const promise = new Promise(function(resolve, reject) {
      timerRef = setTimeout(resolve, ms);
      rejectCallback = reject;
    });
  
    promise.cancel = () => {
      clearTimeout(timerRef);
      rejectCallback(Error("Cancelled"));
    };
  
    return promise;
  };
  
  module.exports = delay;
  