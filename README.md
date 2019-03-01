# canapi

## Installation

1. Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools). Open your terminal as an Administrator and type following `npm install -g windows-build-tools@4.0.0`.

2. Install [Kvaser Drivers for Windows](https://www.kvaser.com/download/).

3. Open new terminal

4. Go to the root of the **canapi** directory and run `yarn install` for installing the dependencies.

## Test bench

### Configure environnement variables

Check `.env` file and update configuration.

|Name|Default|Description|
|----|-------|-----------|
|LED_CHANNEL|`0`|The number of the channel.|
|LED_ACTION_DELAY|`3000`|Delay between actions.|
|LED_SEAT_IDENTIFIER|`731`|CAN identifier of the seat.|
|LED_WALL_IDENTIFIER|`734`|CAN identifier of the wall.|

### Run

Run `node bench.js`.

Expected output:

```bash
## OPEN CHANNEL 0 ##

## START SIMULATION ##

## SEAT BLINKING / FADING RED ##

## SEAT BLINKING / FADING PURPLE ##

## WALL PERMANET COLOR ##

## WALL BLINKING / FADING ##

## WALL WAVE 1 ##

## WALL WAVE 2 ##

## WALL PARAMETRIC ANIMATION 1 ##

## WALL PARAMETRIC ANIMATION 2 ##

## WALL PARAMETRIC ANIMATION 3 ##

## STOP SIMULATION ##
```
