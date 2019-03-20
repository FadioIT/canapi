<p align="center">
    <img height="141" width="300" src="https://github.com/FadioIT/canapi/blob/master/logo.png?raw=true" />
    <br/>
    <br/>
    <br/>
</p>

Kvaser CanLib implementation for Node.js.
**Works on Windows only** (mocked for MacOS and Linux).

## Requirements

1. Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools). Open your terminal as an Administrator and type following `npm install -g windows-build-tools@4.0.0`.

2. Install [Kvaser Drivers for Windows](https://www.kvaser.com/download/).

## Usage

First at all you need to create a `CanApi` instance with the number of the channel, and the bitrate of can message. 

bitrate default : "canBITRATE_500k".

```js
const bitRates = require("../helpers/bit_rates");
/*
const bitRates = {
    canBITRATE_1M   : "canBITRATE_1M",
    canBITRATE_500K : "canBITRATE_500K",
    canBITRATE_250K : "canBITRATE_250K",
    canBITRATE_125K : "canBITRATE_125K",
    canBITRATE_100K : "canBITRATE_100K",
    canBITRATE_62K  : "canBITRATE_62K",
    canBITRATE_50K  : "canBITRATE_50K",
    canBITRATE_83K  : "canBITRATE_83K",
    canBITRATE_10K  : "canBITRATE_10K"
}
*/

const myChannel = new CanApi(0, bitRates.canBITRATE_500K);
```

### .open()

Open the CAN channel.

**Returns**: `bool`

### .close()

Closes the CAN channel.

**Returns**: `bool`

### .sendMessage(identifier, data)

Send message to the CAN channel.

|Input param|Type|Description|
|---|---|---|
|`identifier`|`number`|the identifier of the CAN message to send|
|`data`|`array`|the data buffer|

**Returns**: `bool`

**Example**:

```js
myChannel.sendMessage(731, CanApi.createBuffer([
  180, 20, 180, 2
]));
```

### .readMessage()

Read message from the CAN channel.

**Returns**: `Object`

|Output param|Type|Description|
|---|---|---|
|`Object.identifier`|`number`|the identifier of the CAN message to read|
|`Object.data`|`buffer`|the data buffer|
|`Object.dlc`|`number`|the length of the message in bytes|

**Example**:

```js
const message = myChannel.readMessage();

console.log({
  identifier: message.identifier,
  data: Array.from(message.data),
  dlc: message.dlc
});
```
