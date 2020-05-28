
/**
 * Communicate with nRF24 devices
 */
namespace radio24 {
    let onReceivedBufferHandler: (receivedBuffer: Buffer) => void;

    /**
     * Register receive handler
     */
    //% blockId=radio24_on_receive block="on radio received"
    //% useLoc="radio24.onDataReceived" draggableParameters=reporter
    export function onReceivedBuffer(cb: (receivedBuffer: Buffer) => void) {
        init();
        onReceivedBufferHandler = cb;
    }

    function handleDataReceived() {
        let buffer: Buffer = readBuffer();

        while (buffer) {
            if (onReceivedBufferHandler) {
                onReceivedBufferHandler(buffer);
            }
            buffer = readBuffer();
        }
    }

    let initialized = false;
    function init() {
        if (! initialized) {
            initialized = true;
            onDataReceived(handleDataReceived);
        }
    }

    /**
     *  Enable nRF24 compatible radio
     */
    //% blockId=radio24_enable block="Activate radio24 with band=$band, power=$power"
    //% weight=10
    //% band.min=0 band.max=100 power.min=0 power.max=7
    //% shim=radio24::enable
    export function enable(band: number, power: number): void {
        console.log("Radio enabled");
    }

    /**
     * Set radio group
     */
    //% blockId=radio24_set_group block="Set group to $group"
    //% group.min=0 group.max=255
    //% shim=radio24::setGroup
    export function setGroup(group: uint8): void {
        console.log("Setting radio group");
    }

    /**
     * Read buffer data
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::readBuffer
    export function readBuffer(): Buffer {
        return Buffer.fromUTF8("ABC");
    }

    /**
     * Send buffer data
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::sendBuffer
    export function sendBuffer(buf: Buffer) : void {
        console.log("Sending buffer");
    }

    /**
     * Send string
     */
    //% blockId=radio24_send_string block="Send $str"
    export function sendString(str: string) {
        let buf = control.createBufferFromUTF8(str);
        sendBuffer(buf);
    }

    /**
     * Ping test
     */
    //% blockId=radio24_ping block="Run extension test"
    //% shim=radio24::ping
    export function ping(): void {
        basic.showString("SIM");
    }
}
