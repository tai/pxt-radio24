// Auto-generated. Do not edit.



    //% color="#AA278D" icon="\uf0a4"
declare namespace radio24 {

    /**
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecated=true blockHidden=true shim=radio24::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Read buffer data
     * 
     * @param buf Buffer to send
     */
    //% shim=radio24::readBuffer
    function readBuffer(): Buffer;
}

// Auto-generated. Do not edit. Really.
