
#include "pxt.h"
#include <cstdint>
#include "mbed.h"

using namespace pxt;

enum Mode {
    //% block="1Mbps"
    Mode_1Mbps = 0,
    //% block="2Mbps"
    Mode_2Mbps,
    //% block="250Kbps"
    Mode_250Kbps
};

//% color="#AA278D" icon="\uf0a4"
namespace radio24 {
    /**
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecated=true blockHidden=true
    void onDataReceived(Action body) {
        registerWithDal(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, body);
        uBit.radio.datagram.recv();
    }

    //%
    void enable(uint8_t band, uint8_t power) {
        uBit.radio.enable();
        uBit.radio.setTransmitPower(power);
        uBit.radio.setFrequencyBand(band);

        // Make it compatible with nRF24
        NRF_RADIO->PCNF0 = 0x00000006; // on-air LENGTH field length of 6bit
        NRF_RADIO->PCNF1 = 0x01040000 | 32; // no whitening, big endian, 32B payload
    	NRF_RADIO->DATAWHITEIV = 0x00;
        NRF_RADIO->MODE = Mode_1Mbps;
    }

    //%
    void setGroup(uint8_t group) {
        uBit.radio.setGroup(group);
    }

    /**
     * Read buffer data
     * 
     * @param buf Buffer to send
     */
    //%
    Buffer readBuffer() {
        auto p = uBit.radio.datagram.recv();

        if (p == PacketBuffer::EmptyPacket)
            return NULL;
        return mkBuffer(p.getBytes(), p.length());
    }

    //%
    void sendBuffer(Buffer msg) {
        char ch = "0123456789ABCDEF"[msg->length];
        uBit.serial.putc(ch);
        uBit.radio.datagram.send(msg->data, msg->length);
    }

    //%
    void ping() {
        uBit.display.scrollAsync("DEV");
    }
}
