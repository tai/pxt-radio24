
/**
 * Communicate with nRF24 devices
 */
namespace radio24 {
    let onReceivedBufferHandler: (receivedBuffer: Buffer) => void;
    let onReceivedStringHandler: (receivedString: string) => void;

    function handleDataReceived() {
        let buffer: Buffer = readBuffer();

        while (buffer) {
            if (onReceivedStringHandler) {
                onReceivedStringHandler(buffer.toString());
            }
            else if (onReceivedBufferHandler) {
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
     * Register receive handler
     */
    //% blockId=radio24_on_receive block="On receive of a buffer"
    //% useLoc="radio24.onDataReceived" draggableParameters=reporter
    export function onReceivedBuffer(cb: (receivedBuffer: Buffer) => void) {
        init();
        onReceivedBufferHandler = cb;
    }

    /**
     * Register receive handler
     */
    //% blockId=radio24_on_receive_string block="On receive of a string"
    //% useLoc="radio24.onDataReceived" draggableParameters=reporter
    export function onReceivedString(cb: (receivedString: string) => void) {
        init();
        onReceivedStringHandler = cb;
    }

    /**
     *  Enable nRF24 compatible radio
     */
    //% blockId=radio24_enable block="Activate radio24 with band=$band, power=$power"
    //% weight=90
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
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="Call on data received"
    //% blockHidden=true
    export function onDataReceived(body: () => void): void {
        control.onEvent(
            EventBusSource.MICROBIT_ID_RADIO,
            EventBusValue.MICROBIT_RADIO_EVT_DATAGRAM, body
        );
        readBuffer();
    }

    let simQueue : Buffer[] = [];

    /**
     * Read buffer data
     */
    //% shim=radio24::readBuffer
    export function readBuffer(): Buffer {
        if (simQueue.length > 0) {
            return simQueue.shift();
        }
        return null;
    }

    /**
     * Send buffer data
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::sendBuffer
    export function sendBuffer(buf: Buffer) : void {
        simQueue.push(buf);
        control.raiseEvent(
            EventBusSource.MICROBIT_ID_RADIO,
            EventBusValue.MICROBIT_RADIO_EVT_DATAGRAM,
            EventCreationMode.CreateAndFire
        );
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
    //% blockId=radio24_ping block="Run test 002"
    //% shim=radio24::ping
    export function ping(): void {
        basic.showString("SIM");
    }
}
