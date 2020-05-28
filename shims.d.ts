// Auto-generated. Do not edit.



    //% color="#AA278D" icon="\uf0a4"
declare namespace radio24 {

    /**
     * Enable the radio
     */
    //% band.defl=7 power.defl=0 shim=radio24::enable
    function enable(band?: int32, power?: int32): void;

    /**
     * Set group
     */
    //% shim=radio24::setGroup
    function setGroup(group: uint8): void;

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
    //% deprecated=true blockHidden=true shim=radio24::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Run ping test
     */
    //% blockId=radio24_ping block="Run extension test" shim=radio24::ping
    function ping(): void;
}

// Auto-generated. Do not edit. Really.
