
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
     * Enable the radio
     */
    //% blockId=radio24_enable block="Activate radio with band=$band, power=$power"
    //% band.min=0 band.max=99 power.min=0 power.max=7
    void enable(int band=7, int power=0) {
        uBit.radio.enable();
        uBit.radio.setTransmitPower(power);
        uBit.radio.setFrequencyBand(band);

        // Make it compatible with nRF24
        NRF_RADIO->PCNF0 = 0x00000006; // on-air LENGTH field length of 6bit
        NRF_RADIO->PCNF1 = 0x01040000 | 32; // no whitening, big endian, 32B payload
    	NRF_RADIO->DATAWHITEIV = 0x00;
        NRF_RADIO->MODE = Mode_1Mbps;
    }

    /**
     * Set group
     */
    //% blockId=radio24_set_group block="Set group to $group"
    //% group.min=0 group.max=255
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
    //% deprecated=true blockHidden=true
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
