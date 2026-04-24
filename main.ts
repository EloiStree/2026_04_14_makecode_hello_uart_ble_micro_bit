bluetooth.onBluetoothConnected(function () {
    is_connected = 1
    basic.showLeds(`
        # # . # #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
bluetooth.onBluetoothDisconnected(function () {
    is_connected = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # . # #
        `)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Space), function () {
    count_ble += 1
    basic.showString("" + (count_ble))
})
let read_Ble = ""
let count_ble = 0
let is_connected = 0
bluetooth.startUartService()
basic.forever(function () {
    if (is_connected) {
        read_Ble = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Space))
        basic.showString(read_Ble)
    } else {
        basic.pause(1000)
    }
})
