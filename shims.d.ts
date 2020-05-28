// Auto-generated. Do not edit.



    //% color="#AA278D" icon="\uf0a4"
declare namespace radio24 {

    /**
     *  Enable radio
     */
    //% blockId=radio24_enable block="Activate radio with band=$band, power=$power"
    //% weight=10
    //% band.min=0 band.max=100 power.min=0 power.max=7 band.defl=7 power.defl=0 shim=radio24::enable
    function enable(band?: uint8, power?: uint8): void;

    /**
     * Set radio group
     */
    //% blockId=radio24_set_group block="Set group to $group"
    //% group.min=0 group.max=255 shim=radio24::setGroup
    function setGroup(group: uint8): void;

    /**
     * Receive data
     */
    //% shim=radio24::readRawPacket
    function readRawPacket(): Buffer;

    /**
     * Send raw packet
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

    /**
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecated=true blockHidden=true shim=radio24::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Ping test
     */
    //% blockId=radio24_ping block="Run extension test" shim=radio24::ping
    function ping(): void;
}

// Auto-generated. Do not edit. Really.
