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
     * Send data
     */
    //% shim=radio24::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

    /**
     * Internal data receive handler
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecard=true blockHidden=1 shim=radio24::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Run test
     */
    //% blockId=radio24_test block="Run test" shim=radio24::test
    function test(): void;
}

// Auto-generated. Do not edit. Really.
