const createBuffer = bytesArray => {
  const buffer = new Uint8Array(bytesArray.length);

  bytesArray.forEach((_, index) => {
    buffer[index] = bytesArray[index];
  });

  return buffer;
};

module.exports = createBuffer;
