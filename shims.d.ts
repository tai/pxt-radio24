// Auto-generated. Do not edit.
declare namespace radio24 {

    /**
     * Enable the radio
     */
    //% blockId=radio24_enable block="Enable radio24 module" band.defl=7 power.defl=0 shim=radio24::enable
    function enable(band?: int32, power?: int32): void;

    /**
     * Set group
     */
    //% blockId=radio24_set_group block="Set radio group ID" shim=radio24::setGroup
    function setGroup(group: uint8): int32;

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
