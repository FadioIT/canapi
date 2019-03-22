const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

CanApi = require("../index");
delay = require("./delay");
log = require("./log");

const bitRates = CanApi.bitRates;

(async () => {
  log("## OPEN CHANNEL " + parseInt(process.env.LED_CHANNEL, 10) + " ##");
  const seatChannel = new CanApi(parseInt(process.env.LED_CHANNEL, 10), bitRates.canBITRATE_500K);

  log("## START SIMULATION ##");
  seatChannel.open();

  log("## SEAT BLINKING / FADING RED ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_SEAT_IDENTIFIER, 10),
    CanApi.createBuffer([
      255, // byte 1 - amount of red color
      0, // byte 2 - amount of green color
      0, // byte 3 - amount of blue color
      1 // byte 4 - blinkspeed
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## SEAT BLINKING / FADING PURPLE ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_SEAT_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      2 // byte 4 - blinkspeed
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL PERMANET COLOR ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      0, // byte 4 - blinkspeed
      0, // byte 5 - control the wall when blinkspeed is equal to 255
      0, // byte 6 - control the wall when blinkspeed is equal to 255
      0, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL BLINKING / FADING ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      2, // byte 4 - blinkspeed
      0, // byte 5 - control the wall when blinkspeed is equal to 255
      0, // byte 6 - control the wall when blinkspeed is equal to 255
      0, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL WAVE 1 ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      15, // byte 4 - blinkspeed
      0, // byte 5 - control the wall when blinkspeed is equal to 255
      0, // byte 6 - control the wall when blinkspeed is equal to 255
      20, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL WAVE 2 ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      22, // byte 4 - blinkspeed
      0, // byte 5 - control the wall when blinkspeed is equal to 255
      0, // byte 6 - control the wall when blinkspeed is equal to 255
      10, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL PARAMETRIC ANIMATION 1 ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      255, // byte 4 - blinkspeed
      0, // byte 5 - control the wall when blinkspeed is equal to 255
      1, // byte 6 - control the wall when blinkspeed is equal to 255
      20, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL PARAMETRIC ANIMATION 2 ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      255, // byte 1 - amount of red color
      0, // byte 2 - amount of green color
      0, // byte 3 - amount of blue color
      255, // byte 4 - blinkspeed
      240, // byte 5 - control the wall when blinkspeed is equal to 255
      0, // byte 6 - control the wall when blinkspeed is equal to 255
      30, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## WALL PARAMETRIC ANIMATION 3 ##");
  seatChannel.sendMessage(
    parseInt(process.env.LED_WALL_IDENTIFIER, 10),
    CanApi.createBuffer([
      180, // byte 1 - amount of red color
      20, // byte 2 - amount of green color
      180, // byte 3 - amount of blue color
      255, // byte 4 - blinkspeed
      30, // byte 5 - control the wall when blinkspeed is equal to 255
      1, // byte 6 - control the wall when blinkspeed is equal to 255
      10, // byte 7 - control the wall when blinkspeed is equal to 255
      0 // byte 8 - control the wall when blinkspeed is equal to 255
    ])
  );

  await delay(parseInt(process.env.LED_ACTION_DELAY, 10));

  log("## STOP SIMULATION ##");
  seatChannel.close();
})();
