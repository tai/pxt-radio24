
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
    //% blockId=radio24_on_receive block="radio24: On receive of"
    //% useLoc="radio24.onDataReceived" draggableParameters=reporter
    export function onReceivedBuffer(cb: (receivedBuffer: Buffer) => void) {
        init();
        onReceivedBufferHandler = cb;
    }

    /**
     * Register receive handler
     */
    //% blockId=radio24_on_receive_string block="radio24: On receive of"
    //% useLoc="radio24.onDataReceived" draggableParameters=reporter
    export function onReceivedString(cb: (receivedString: string) => void) {
        init();
        onReceivedStringHandler = cb;
    }

    /**
     *  Enable nRF24 compatible radio
     * 
     * @param group [0-255] Defaults to 0. Set group ID to communicate.
     * @param band [0-100] Defaults to 7. Set frequency (2400+band[MHz]) to be used.
     */
    //% blockId=radio24_enable block="radio24: Join group=$group at band=$band"
    //% weight=90
    //% shim=radio24::enable
    export function enable(group: number, band: number): void {
        console.log("Radio enabled");
    }

    /**
     * Set radio speed mode
     * 
     * @param mode Choose from Mode_1Mbps, Mode_2Mbps, and Mode_250Kbps.
     */
    //% blockId=radio24_set_power block="radio24: Set mode to $mode"
    //% shim=radio24::setMode
    export function setMode(mode: Mode): void {
        console.log("Setting radio speed mode");
    }

    /**
     * Set radio transmit power
     * 
     * @param power [0-7] Defaults to 0. Set transmit power level.
     */
    //% blockId=radio24_set_power block="radio24: Set transmit power to $power"
    //% shim=radio24::setPower
    export function setPower(power: number): void {
        console.log("Setting radio power");
    }

    /**
     * Set radio group
     * 
     * @param group [0-255] Defaults to 0. Set group ID to communicate.
     */
    //% blockId=radio24_set_group block="radio24: Join group=$group"
    //% shim=radio24::setGroup
    export function setGroup(group: number): void {
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
     * 
     * @param str String to send
     */
    //% blockId=radio24_send_string block="radio24: Send $str"
    export function sendString(str: string) {
        let buf = control.createBufferFromUTF8(str);
        sendBuffer(buf);
    }

    /**
     * Run test
     */
    //% blockId=radio24_test block="radio24: Run test"
    //% shim=radio24::test
    export function test(): void {
        basic.showString("SIM");
    }
}
