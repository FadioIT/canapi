const log = (...args) => {
    console.log(...args.map(v => v + "\n"));
  };
  
module.exports = log;
  