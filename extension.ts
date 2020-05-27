
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

    export function sendBuffer(msg: Buffer) {
        sendRawPacket(msg);
    }

    /**
     * Toggle output
     * @param pin pin to toggle output
     */
    //% weight=30 blockId="hello_toggle" block="Toggle output"
    export function toggle(pin: DigitalPin): void {
        pin = pin ^ 1;
    }

    /**
     * Function for simulator. Actual implementation is in cpp.
     * @param val base number
     */
    //% radio24=hello::add10
    function add10(val: number) {
        return val + 100;
    }
}
