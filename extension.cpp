
#include "pxt.h"
#include <cstdint>
#include "mbed.h"

using namespace pxt;

enum HelloNumber {
    //% block="foo"
    FOO = 1,
    //% block="bar"
    BAR = 2
};

namespace radio24 {
    /**
     * Enable the radio
     */
    //% blockId=radio24_enable block="Enable radio24 module"
    void enable(int band=7, int power=0) {
        uBit.radio.enable();
        uBit.radio.setTransmitPower(power);
        uBit.radio.setFrequencyBand(band);

        // Make it compatible with nRF24
        NRF_RADIO->PCNF0 = 0x00000006; // on-air LENGTH field length of 6bit
        NRF_RADIO->PCNF1 = 0x01040000 | 32; // no whitening, big endian, 32B payload
    	NRF_RADIO->DATAWHITEIV = 0x00;
        NRF_RADIO->MODE = 0; // 1Mbps
    }

    /**
     * Set group
     */
    //% blockId=radio24_set_group block="Set radio group ID"
    int setGroup(uint8_t group) {
        return uBit.radio.setGroup(group);
    }

    /**
     * Receive data
     */
    //%
    Buffer readRawPacket() {
        auto p = uBit.radio.datagram.recv();

        if (p == PacketBuffer::EmptyPacket)
            return NULL;
        return mkBuffer(p.getBytes(), p.length());
    }

    /**
     * Internal use only. Sends a raw packet.
     */
    //% async
    void sendRawPacket(Buffer msg) {
        uBit.radio.datagram.send(msg->data, msg->length);
    }

    /**
     * Internal use only. Receive handler.
     */
    //% blockId=radio24_data_received_event block="radio on data received"
    //% deprecated=true blockHidden=1
    void onDataReceived(Action body) {
        registerWithDal(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, body);
        uBit.radio.datagram.recv();
    }

    /**
     * Run ping test
     */
    //% blockId=radio24_ping block="Run extension test"
    void ping() {
        uBit.display.printChar('A');
        uBit.display.printChar('B');
    }
}
