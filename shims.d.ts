// Auto-generated. Do not edit.
declare namespace radio24 {

    /**
     * Add 10 to given value
     */
    //% blockId=radio24_add10 block="add 10" shim=radio24::add10
    function add10(val: uint16): uint16;

    /**
     * Enable the radio
     */
    //% blockId=radio24_enable block="Enable radio24 module" band.defl=7 power.defl=0 shim=radio24::enable
    function enable(band?: int32, power?: int32): void;

    /**
     * Receive data
     */
    //% shim=radio24::readRawPacket
    function readRawPacket(): Buffer;

    /**
     * Internal use only. Sends a raw packet.
     */
    //% async shim=radio24::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

    /**
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecated=true blockHidden=1 shim=radio24::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Run ping test
     */
    //% blockId=radio24_ping block="Run extension test" shim=radio24::ping
    function ping(): void;
}

// Auto-generated. Do not edit. Really.
