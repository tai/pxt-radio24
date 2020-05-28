
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
}

namespace pxsim.radio24 {
    export function sendRawPacket(buf: Buffer) : void {
        console.log("Sending buffer");
        return;
    }

    export function enable(band?: uint8, power?: uint8): void {
        console.log("Radio enabled");
        return;
    }

    export function setGroup(group: uint8): void {
        console.log("Setting radio group");
        return;
    }

    export function ping(): void {
        basic.showString("SIM");
        return;
    }
}
