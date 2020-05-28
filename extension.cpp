
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
     *  Enable radio
     */
    //% blockId=radio24_enable block="Activate radio with band=$band, power=$power"
    //% weight=10
    //% band.min=0 band.max=100 power.min=0 power.max=7
    void enable(uint8_t band=7, uint8_t power=0) {
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
     * Set radio group
     */
    //% blockId=radio24_set_group block="Set group to $group"
    //% group.min=0 group.max=255
    void setGroup(uint8_t group) {
        uBit.radio.setGroup(group);
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
     * Send raw packet
     * 
     * @param buf Buffer to send
     */
    //%
    void sendRawPacket(Buffer msg) {
        char ch = "0123456789ABCDEF"[msg->length];
        uBit.serial.putc(ch);
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
     * Ping test
     */
    //% blockId=radio24_ping block="Run extension test"
    void ping() {
        uBit.display.scrollAsync("AB");
    }
}
