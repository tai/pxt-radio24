
/**
 * Communicate with nRF24 devices
 */
namespace radio24 {
    let onReceivedBufferHandler: (receivedBuffer: Buffer) => void;

    let initialized = false;
    function init() {
        if (! initialized) {
            initialized = true;
            onDataReceived(handleDataReceived);
        }
    }

    function handleDataReceived() {
        let buffer: Buffer = readRawPacket();

        while (buffer) {
            if (onReceivedBufferHandler) {
                onReceivedBufferHandler(buffer);
            }
            buffer = readRawPacket();
        }
    }

    /**
     * Register receive handler
     */
    //% blockId=radio24_on_receive block="on radio received"
    //% useLog="radio24.onDataBufferReceived" draggableParameters=reporter
    export function onReceivedBuffer(cb: (receivedBuffer: Buffer) => void) {
        init();
        onReceivedBufferHandler = cb;
    }

    /**
     * Send data
     * 
     * @param msg Buffer to send
     */
    //% advanced=true
    export function sendBuffer(msg: Buffer) {
        sendRawPacket(msg);
    }

    /**
     * Send string
     */
    //% blockId=radio24_send_string block="Send $str"
    export function sendString(str: string) {
        let buf = control.createBufferFromUTF8(str);
        sendRawPacket(buf);
    }

    /**
     * Send raw packet
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::sendRawPacket
    export function sendRawPacket(buf: Buffer) : void {
        console.log("Sending buffer");
        return;
    }

    /**
     *  Enable radio
     */
    //% blockId=radio24_enable block="Activate radio with band=$band, power=$power"
    //% weight=10
    //% band.min=0 band.max=100 power.min=0 power.max=7
    //% shim=radio24::enable
    export function enable(band?: uint8, power?: uint8): void {
        console.log("Radio enabled");
        return;
    }

    /**
     * Set radio group
     */
    //% blockId=radio24_set_group block="Set group to $group"
    //% group.min=0 group.max=255
    //% shim=radio24::setGroup
    export function setGroup(group: uint8): void {
        console.log("Setting radio group");
        return;
    }

    /**
     * Ping test
     */
    //% blockId=radio24_ping block="Run extension test"
    //% shim=radio24::ping
    export function ping(): void {
        basic.showString("SIM");
        return;
    }
}
