
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

    /** For simulator. */
    //% blockId=radio24_enable block="Activate radio with band=$band, power=$power"
    //% weight=10
    //% band.min=0 band.max=100 power.min=0 power.max=7
    //% shim=radio24::enable
    function enable(band?: int32, power?: int32): void {
        return;
    }

    /** For simulator */
    //% shim=radio24::setGroup
    export function shim_setGroup(group: uint8): void {
        return;
    }
}
