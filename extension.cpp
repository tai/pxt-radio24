
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
    //%
    void enable(uint8_t group, uint8_t band) {
        uBit.radio.enable();
        uBit.radio.setGroup(group);
        uBit.radio.setFrequencyBand(band);
        uBit.radio.setTransmitPower(0);

        // Make it compatible with nRF24
        NRF_RADIO->PCNF0 = 0x00000006; // on-air LENGTH field length of 6bit
        NRF_RADIO->PCNF1 = 0x01040000 | 32; // no whitening, big endian, 32B payload
    	NRF_RADIO->DATAWHITEIV = 0x00;
        NRF_RADIO->MODE = Mode_1Mbps;
    }

    //%
    void setMode(Mode mode) {
        NRF_RADIO->MODE = mode;
    }

    //%
    void setGroup(uint8_t group) {
        uBit.radio.setGroup(group);
    }

    //%
    void setPower(uint8_t power) {
        uBit.radio.setTransmitPower(power);
    }

    //%
    Buffer readBuffer() {
        auto p = uBit.radio.datagram.recv();

        if (p == PacketBuffer::EmptyPacket)
            return NULL;
        return mkBuffer(p.getBytes(), p.length());
    }

    //%
    void sendBuffer(Buffer msg) {
        uBit.radio.datagram.send(msg->data, msg->length);
    }

    //%
    void test() {
        uBit.display.scrollAsync("DEV");
    }
}
