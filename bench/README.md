## bench

### Configure environnement variables

Check `.env` file and update configuration.

|Name|Default|Description|
|----|-------|-----------|
|LED_CHANNEL|`0`|The number of the channel.|
|LED_ACTION_DELAY|`3000`|Delay between actions.|
|LED_SEAT_IDENTIFIER|`731`|CAN identifier of the seat.|
|LED_WALL_IDENTIFIER|`734`|CAN identifier of the wall.|

### Run

Run `node run.js`.

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
