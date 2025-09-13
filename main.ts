//////////////////////
//##################//
//##              ##//
//##  general.ts  ##//
//##              ##//
//##################//
//////////////////////

let GROUP = 1

type handler = () => void

let displayHandler: handler
function onDisplay(code: () => void) {
    displayHandler = code;
}

function display() {
    basic.showNumber(GROUP)
    basic.pause(500)
    if (displayHandler) displayHandler()
    else basic.showIcon(IconNames.Yes)
}

display()

const EVENTID = 200 + Math.randomRange(0, 100); // semi-unique
let EVENTCNT = 0

control.onEvent(EVENTID, 0, function () {
    control.inBackground(() => {
        EVENTCNT++
        basic.showNumber(GROUP)
        let tm = control.millis() + 1000
        while (tm > control.millis()) basic.pause(1)
        EVENTCNT--
        if (!EVENTCNT) display()
    })
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    GROUP++
    if (GROUP > 9) GROUP = 1
    radio.setGroup(GROUP)
    control.raiseEvent(EVENTID, 0)
})

enum Digital {
    //% block="low"
    //% block.loc.nl="laag"
    Low,
    //% block="high"
    //% block.loc.nl="hoog"
    High,
}

enum Move {
    //% block="forward"
    //% block.loc.nl="vooruit"
    Forward,
    //% block="backward"
    //% block.loc.nl="achteruit"
    Backward,
}

enum Rotate {
    //% block="clockwise"
    //% block.loc.nl="rechtsom"
    Clockwise,
    //% block="anticlockwise"
    //% block.loc.nl="linksom"
    AntiClockwise,
}

enum Pace {
    //% block="fast"
    //% block.loc.nl="snelle"
    Fast,
    //% block="normal"
    //% block.loc.nl="normale"
    Normal,
    //% block="slow"
    //% block.loc.nl="langzame"
    Slow,
}

enum State {
    //% block="off"
    //% block.loc.nl="uit"
    Off,
    //% block="on"
    //% block.loc.nl="aan"
    On,
}

//% color="#61CBF4" icon="\uf075"
//% block="General"
//% block.loc.nl="Algemeen"
namespace General {

    //% color="#008800"
    //% block="comment: %dummy"
    //% block.loc.nl="uitleg: %dummy"
    //% dummy.defl="schrijf hier je uitleg"
    export function comment(dummy: string) {
    }

    //% block="a number from %min upto %max"
    //% block.loc.nl="een getal van %min t/m %max"
    //% min.defl=0 max.defl=10
    export function randomInt(min: number, max: number): number {
        let i = 0
        if (min > max) {
            i = min
            min = max
            max = i
        }
        i = max - min + 1
        i = min + Math.floor(Math.random() * i)
        return i
    }

    //% block="wait %sec seconds"
    //% block.loc.nl="wacht %sec seconden"
    export function wait(sec: number) {
        basic.pause(sec * 1000)
    }
}

////////////////////
//################//
//##            ##//
//##  color.ts  ##//
//##            ##//
//################//
////////////////////

enum Color {
    //% block="none"
    //% block.loc.nl="geen"
    None,
    //% block="red"
    //% block.loc.nl="rood"
    Red,
    //% block="green"
    //% block.loc.nl="groen"
    Green,
    //% block="blue"
    //% block.loc.nl="blauw"
    Blue,
    //% block="yellow"
    //% block.loc.nl="geel"
    Yellow,
    //% block="cyan"
    //% block.loc.nl="cyaan"
    Cyan,
    //% block="magenta"
    //% block.loc.nl="magenta"
    Magenta,
    //% block="black"
    //% block.loc.nl="zwart"
    Black,
    //% block="dark grey"
    //% block.loc.nl="donkergrijs"
    DarkGrey,
    //% block="grey"
    //% block.loc.nl="grijs"
    Grey,
    //% block="light grey"
    //% block.loc.nl="lichtgrijs"
    LightGrey,
    //% block="white"
    //% block.loc.nl="wit"
    White,
    //% block="orange"
    //% block.loc.nl="oranje"
    Orange,
    //% block="brown"
    //% block.loc.nl="bruin"
    Brown,
    //% block="pink"
    //% block.loc.nl="roze"
    Pink,
    //% block="indigo"
    //% block.loc.nl="indigo"
    Indigo,
    //% block="violet"
    //% block.loc.nl="violet"
    Violet,
    //% block="purple"
    //% block.loc.nl="paars"
    Purple
}

function fromColor(color: Color): number {
    let val = 0
    switch (color) {
        case Color.Red: val = 0xFF0000; break;
        case Color.Green: val = 0x00FF00; break;
        case Color.Blue: val = 0x0000FF; break;
        case Color.Yellow: val = 0xFFFF00; break;
        case Color.Cyan: val = 0x00FFFF; break;
        case Color.Magenta: val = 0xFF00FF; break;
        case Color.Black: val = 0x000000; break;
        case Color.DarkGrey: val = 0xA9A9A9; break;
        case Color.Grey: val = 0x808080; break;
        case Color.LightGrey: val = 0xD3D3D3; break;
        case Color.White: val = 0xFFFFFF; break;
        case Color.Orange: val = 0xFFA500; break;
        case Color.Brown: val = 0xA52A2A; break;
        case Color.Pink: val = 0xFFC0CB; break;
        case Color.Indigo: val = 0x4b0082; break;
        case Color.Violet: val = 0x8a2be2; break;
        case Color.Purple: val = 0x800080; break;
    }
    return val
}

function fromRgb(red: number, green: number, blue: number): number {
    let rgb = ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF)
    return rgb;
}

function redValue(rgb: number): number {
    let r = (rgb >> 16) & 0xFF;
    return r;
}

function greenValue(rgb: number): number {
    let g = (rgb >> 8) & 0xFF;
    return g;
}

function blueValue(rgb: number): number {
    let b = (rgb) & 0xFF;
    return b;
}

///////////////////
//###############//
//##           ##//
//##  wave.ts  ##//
//##           ##//
//###############//
///////////////////

enum Position {
    //% block="leader"
    //% block.loc.nl="leider"
    Leader,
    //% block="position 1"
    //% block.loc.nl="positie 1"
    Position1,
    //% block="position 2"
    //% block.loc.nl="positie 2"
    Position2,
    //% block="position 3"
    //% block.loc.nl="positie 3"
    Position3,
    //% block="position 4"
    //% block.loc.nl="positie 4"
    Position4,
    //% block="position 5"
    //% block.loc.nl="positie 5"
    Position5,
    //% block="position 6"
    //% block.loc.nl="positie 6"
    Position6,
    //% block="position 7"
    //% block.loc.nl="positie 7"
    Position7,
    //% block="position 8"
    //% block.loc.nl="positie 8"
    Position8,
    //% block="position 9"
    //% block.loc.nl="positie 9"
    Position9
}

//% color="#AEAEAE" icon="\uf140"
//% block="Wave"
//% block.loc.nl="Wave"
namespace Wave {

    let POSITION = Position.Leader
    let PACE = 0

    export function readWait(): number {
        return POSITION * PACE
    }

    //% block="%pace pace"
    //% block.loc.nl="%pace tempo"
    export function defPace(pace: Pace): number {
        return (pace + 1) * 500
    }

    //% block="position"
    //% block.loc.nl="positie"
    export function defPosition(): Position {
        return POSITION
    }

    //% block="it is the leader"
    //% block.loc.nl="het de leider is"
    export function isLeader(): boolean {
        return (POSITION == Position.Leader)
    }

    //% block="turn %state the wave"
    //% block.loc.nl="zet de wave %state"
    export function setOff() {
        PACE = 0
    }

    //% block="follow after %sec seconds"
    //% block.loc.nl="volg na %sec seconden"
    export function setOn(sec: number) {
        PACE = sec * 1000
    }

    //% block="follow at %pos"
    //% block.loc.nl="volg op %pos"
    export function setPosition(position: Position) {
        POSITION = position
    }
}

//////////////////////
//##################//
//##              ##//
//##  gamepad.ts  ##//
//##              ##//
//##################//
//////////////////////

//% color="#C4C80E" icon="\uf11b"
//% block="Gamepad"
//% block.loc.nl="Gamepad"
namespace Gamepad {

    export enum Joystick {
        //% block="none"
        //% block.loc.nl="geen"
        None,
        //% block="up"
        //% block.loc.nl="omhoog"
        Up,
        //% block="right up"
        //% block.loc.nl="rechts omhoog"
        UpRight,
        //% block="right"
        //% block.loc.nl="rechts"
        Right,
        //% block="right down"
        //% block.loc.nl="rechts omlaag"
        DownRight,
        //% block="down"
        //% block.loc.nl="omlaag"
        Down,
        //% block="left down"
        //% block.loc.nl="links omlaag"
        DownLeft,
        //% block="left"
        //% block.loc.nl="links"
        Left,
        //% block="left up"
        //% block.loc.nl="links omhoog"
        UpLeft
    }

    let JSANGLE = 0
    let JSPOWER = 0
    let JSDIR = Joystick.None

    export enum Power {
        //% block="Full power"
        //% block.loc.nl="volle kracht"
        Full,
        //% block="Half full power"
        //% block.loc.nl="halfvolle kracht"
        HalfFull,
        //% block="Half power"
        //% block.loc.nl="halve kracht"
        Half,
        //% block="Low power"
        //% block.loc.nl="weinig kracht"
        HalfLow,
        //% block="without power"
        //% block.loc.nl="zonder kracht"
        Low
    }
    export enum Button {
        //% block="up"
        //% block.loc.nl="omhoog"
        Up, //P12
        //% block="down"
        //% block.loc.nl="omlaag"
        Down, //P15 
        //% block="left"
        //% block.loc.nl="links"
        Left, //P13
        //% block="right"
        //% block.loc.nl="rechts"
        Right //P14
    }

    let BUTTONMAX = 4

    let PRESSED1 = false
    let PRESSED2 = false
    let PRESSED3 = false
    let PRESSED4 = false

    let joystickXHandler: handler
    let joystickNHandler: handler
    let joystickNEHandler: handler
    let joystickEHandler: handler
    let joystickSEHandler: handler
    let joystickSHandler: handler
    let joystickSWHandler: handler
    let joystickWHandler: handler
    let joystickNWHandler: handler

    let pressed1Handler: handler
    let pressed2Handler: handler
    let pressed3Handler: handler
    let pressed4Handler: handler

    let released1Handler: handler
    let released2Handler: handler
    let released3Handler: handler
    let released4Handler: handler

    function handleJoystick(value: number) {
        JSPOWER = Math.floor(value / 1000)
        JSANGLE = value - JSPOWER * 1000
        let dir: Joystick

        if (JSPOWER) {
            if (JSANGLE > 338 || JSANGLE < 23) dir = Joystick.Up
            if (JSANGLE > 23 && JSANGLE < 68) dir = Joystick.UpRight
            if (JSANGLE > 68 && JSANGLE < 113) dir = Joystick.Right
            if (JSANGLE > 113 && JSANGLE < 158) dir = Joystick.DownRight
            if (JSANGLE > 158 && JSANGLE < 203) dir = Joystick.Down
            if (JSANGLE > 203 && JSANGLE < 248) dir = Joystick.DownLeft
            if (JSANGLE > 248 && JSANGLE < 293) dir = Joystick.Left
            if (JSANGLE > 293 && JSANGLE < 338) dir = Joystick.UpLeft
        }
        else
            dir = Joystick.None

        if (dir == JSDIR) return;
        JSDIR = dir

        if ((JSDIR == Joystick.None) && joystickXHandler)
            joystickXHandler()
        if ((JSDIR == Joystick.Up) && joystickNHandler)
            joystickNHandler()
        if ((JSDIR == Joystick.UpRight) && joystickNEHandler)
            joystickNEHandler()
        if ((JSDIR == Joystick.Right) && joystickEHandler)
            joystickEHandler()
        if ((JSDIR == Joystick.DownRight) && joystickSEHandler)
            joystickSEHandler()
        if ((JSDIR == Joystick.Down) && joystickSHandler)
            joystickSHandler()
        if ((JSDIR == Joystick.DownLeft) && joystickSWHandler)
            joystickSWHandler()
        if ((JSDIR == Joystick.Left) && joystickWHandler)
            joystickWHandler()
        if ((JSDIR == Joystick.UpLeft) && joystickNWHandler)
            joystickNWHandler()
    }

    function handlePressed(button: Button) {
        switch (button) {
            case Button.Up: PRESSED1 = true; if (pressed1Handler) pressed1Handler(); break;
            case Button.Down: PRESSED2 = true; if (pressed2Handler) pressed2Handler(); break;
            case Button.Left: PRESSED3 = true; if (pressed3Handler) pressed3Handler(); break;
            case Button.Right: PRESSED4 = true; if (pressed4Handler) pressed4Handler(); break;
        }
    }

    function handleReleased(button: Button) {
        switch (button) {
            case Button.Up: PRESSED1 = false; if (released1Handler) released1Handler(); break;
            case Button.Down: PRESSED2 = false; if (released2Handler) released2Handler(); break;
            case Button.Left: PRESSED3 = false; if (released3Handler) released3Handler(); break;
            case Button.Right: PRESSED4 = false; if (released4Handler) released4Handler(); break;
        }
    }

    radio.onReceivedNumber(function (value: number) {
        if (value >= 1000)
            handleJoystick(value - 1000)
        else {
            if (value >= BUTTONMAX)
                handleReleased(value - BUTTONMAX)
            else
                handlePressed(value)
        }
    })

    //% block="%button is up"
    //% block.loc.nl="%button is losgelaten"
    export function isReleased(button: Button): boolean {
        switch (button) {
            case Button.Up: return !PRESSED1;
            case Button.Down: return !PRESSED2;
            case Button.Left: return !PRESSED3;
            case Button.Right: return !PRESSED4;
        }
        return false;
    }

    //% block="%button is down"
    //% block.loc.nl="%button is ingedrukt"
    export function isPressed(button: Button): boolean {
        switch (button) {
            case Button.Up: return PRESSED1;
            case Button.Down: return PRESSED2;
            case Button.Left: return PRESSED3;
            case Button.Right: return PRESSED4;
        }
        return false;
    }

    //% block="joystick-power"
    //% block.loc.nl="joystick-kracht"
    export function readPower(): Power {
        let pwr: Power
        if (JSPOWER > 80) pwr = Power.Full
        else
            if (JSPOWER > 60) pwr = Power.HalfFull
            else
                if (JSPOWER > 40) pwr = Power.Half
                else
                    if (JSPOWER > 20) pwr = Power.HalfLow
                    else
                        pwr = Power.Low
        return pwr
    }

    //% block="joystick Joystick"
    //% block.loc.nl="joystick-richting"
    export function readJoystick(): Joystick {
        return JSDIR
    }

    //% color="#FFC000"
    //% block="when %button is released"
    //% block.loc.nl="wanneer %button wordt losgelaten"
    export function onReleased(button: Button, code: () => void): void {
        switch (button) {
            case Button.Up: released1Handler = code; break;
            case Button.Down: released2Handler = code; break;
            case Button.Left: released3Handler = code; break;
            case Button.Right: released4Handler = code; break;
        }
    }

    //% color="#FFC000"
    //% block="when %button is pressed"
    //% block.loc.nl="wanneer %button wordt ingedrukt"
    export function onPressed(button: Button, code: () => void): void {
        switch (button) {
            case Button.Up: pressed1Handler = code; break;
            case Button.Down: pressed2Handler = code; break;
            case Button.Left: pressed3Handler = code; break;
            case Button.Right: pressed4Handler = code; break;
        }
    }

    //% color="#FFC000"
    //% block="when the joystick Joystick is %dir"
    //% block.loc.nl="wanneer de joystick richting %dir is"
    export function onJoystick(dir: Joystick, code: () => void): void {
        switch (dir) {
            case Joystick.None: joystickXHandler = code; break;
            case Joystick.Up: joystickNHandler = code; break;
            case Joystick.UpRight: joystickNEHandler = code; break;
            case Joystick.Right: joystickEHandler = code; break;
            case Joystick.DownRight: joystickSEHandler = code; break;
            case Joystick.Down: joystickSHandler = code; break;
            case Joystick.DownLeft: joystickSWHandler = code; break;
            case Joystick.Left: joystickWHandler = code; break;
            case Joystick.UpLeft: joystickNWHandler = code; break;
        }
    }

}


////////////////////////
//####################//
//##                ##//
//##  xgo-rider.ts  ##//
//##                ##//
//####################//
////////////////////////

/*
The xgo namespace is a refactoring of the ElecFreaks 'pxt-rider' library:
https://github.com/elecfreaks/pxt-xgo-rider/blob/main/main.ts
(MIT-license)
*/

//##########  BEGIN XGO  ##########//

namespace xgo {
    let headData = 0x5500
    let tailData = 0x00AA
    let headDataH = (headData >> 8) & 0xff;
    let headDataL = (headData >> 0) & 0xff;
    let tailDataH = (tailData >> 8) & 0xff;
    let tailDataL = (tailData >> 0) & 0xff;

    function writeCommand(len: number, addr: number, data: number) {
        let commands_buffer = pins.createBuffer(len)
        commands_buffer[0] = headDataH
        commands_buffer[1] = headDataL
        commands_buffer[2] = len
        commands_buffer[3] = 0x00
        commands_buffer[4] = addr
        commands_buffer[5] = data
        commands_buffer[6] = ~(len + 0x00 + addr + data)
        commands_buffer[7] = tailDataH
        commands_buffer[8] = tailDataL
        serial.writeBuffer(commands_buffer)
        basic.pause(100)
    }

    function writeThreeCommand(len: number, addr: number, data0: number, data1: number, data2: number) {
        let commands_buffer = pins.createBuffer(len)
        commands_buffer[0] = headDataH
        commands_buffer[1] = headDataL
        commands_buffer[2] = len
        commands_buffer[3] = 0x00
        commands_buffer[4] = addr
        commands_buffer[5] = data0
        commands_buffer[6] = data1
        commands_buffer[7] = data2
        commands_buffer[8] = ~(len + 0x00 + addr + data0 + data1 + data2)
        commands_buffer[9] = tailDataH
        commands_buffer[10] = tailDataL
        serial.writeBuffer(commands_buffer)
        basic.pause(100)
    }

    function readCommand(len: number, addr: number, readlen: number) {
        let commands_buffer = pins.createBuffer(len)
        commands_buffer[0] = headDataH
        commands_buffer[1] = headDataL
        commands_buffer[2] = len
        commands_buffer[3] = 0x02
        commands_buffer[4] = addr
        commands_buffer[5] = readlen
        commands_buffer[6] = ~(len + 0x02 + addr + readlen)
        commands_buffer[7] = tailDataH
        commands_buffer[8] = tailDataL
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(9)
        read_data_buffer = serial.readBuffer(9)
        return read_data_buffer[5]
    }

    export function initXGOSerial(tx: SerialPin = SerialPin.P13, rx: SerialPin = SerialPin.P14) {

        serial.redirect(tx, rx, BaudRate.BaudRate115200)
        initActionMode()
    }

    export function initActionMode() {
        let status = readCommand(0x09, 0x02, 0x01)
        if (status == 0x00) return;
        writeCommand(0x09, 0x3E, 0xFF)
        basic.pause(1000)
    }

    export function batteryStatus(): number {
        return readCommand(0x09, 0x01, 0x01)
    }

    export function setHeight(height: number) {
        let data = Math.map(height, -20, 20, 0, 255)
        writeCommand(0x09, 0x35, data)
        basic.pause(100)
    }

    export function setAngle(angle: number) {
        let data = Math.map(angle, -100, 100, 0, 255)
        writeCommand(0x09, 0x36, data)
        basic.pause(100)
    }

    export function moveRider(move: Move, speed: number) {
        if (move == Move.Forward)
            speed = -speed
        let data = Math.map(speed, -100, 100, 0, 255)
        writeCommand(0x09, 0x30, data)
        basic.pause(100)
    }

    export function rotateRider(rotation: Rotate, speed: number) {
        if (rotation == Rotate.Clockwise)
            speed = -speed
        let data = Math.map(speed, -100, 100, 0, 255)
        writeCommand(0x09, 0x32, data)
    }

    export function squattingFunc(time: number) {
        time = 4 - time
        let data = Math.map(time, 0, 2, 1, 255)
        writeCommand(0x09, 0x82, data)
    }

    export function shufflingFunc(time: number) {
        time = 4 - time
        let data = Math.map(time, 0, 2, 1, 255)
        writeCommand(0x09, 0x39, data)
    }

    export function ledColor(leds: Led, color: Color) {

        let len, addr, data, wait
        len = 0x0B

        data = fromColor(color)

        if (leds & Led.FrontLeft) {
            addr = 0x69
            writeThreeCommand(len, addr, ((data >> 16) & 0xff), ((data >> 8) & 0xff), ((data >> 0) & 0xff))
        }
        if (leds & Led.RearLeft) {
            addr = 0x6A
            writeThreeCommand(len, addr, ((data >> 16) & 0xff), ((data >> 8) & 0xff), ((data >> 0) & 0xff))
        }
        if (leds & Led.RearRight) {
            addr = 0x6B
            writeThreeCommand(len, addr, ((data >> 16) & 0xff), ((data >> 8) & 0xff), ((data >> 0) & 0xff))
        }
        if (leds & Led.FrontRight) {
            addr = 0x6C
            writeThreeCommand(len, addr, ((data >> 16) & 0xff), ((data >> 8) & 0xff), ((data >> 0) & 0xff))
        }
    }

    export function stopMoving() {
        let data = Math.map(0, -100, 100, 0, 255)
        writeCommand(0x09, 0x30, data)  // move forward/backward
        writeCommand(0x09, 0x32, data)  // turn left/right
    }
}

xgo.initXGOSerial(SerialPin.P14, SerialPin.P13)


//##########  END XGO  ##########//



onDisplay(() => {
    if (Wave.isLeader())
        basic.showString("L");
    else {
        basic.showString("W")
        basic.showNumber(Wave.defPosition())
    }
    basic.pause(500)
    basic.showIcon(IconNames.Yes)
})

enum Led {
    //% block="the front left led"
    //% block.loc.nl="de led links-voor"
    FrontLeft = 1,
    //% block="the rear left led"
    //% block.loc.nl="de led links-achter"
    RearLeft = 2,
    //% block="the front right led"
    //% block.loc.nl="de led rechts-voor"
    FrontRight = 4,
    //% block="the rear right led"
    //% block.loc.nl="de led rechts-achter"
    RearRight = 8,
    //% block="the left leds"
    //% block.loc.nl="de linker leds"
    Left = 3,
    //% block="the right leds"
    //% block.loc.nl="de rechter leds"
    Right = 12,
    //% block="all leds"
    //% block.loc.nl="alle leds"
    All = 15,
}

enum Performance {
    //% block="not yet applicable"
    //% block.loc.nl="nog niet aanwezig"
    NotImplemented
}

//% color="#82200C" icon="\uf1b9"
//% block="XGO Rider"
//% block.loc.nl="XGO Rider"
namespace XGoRider {

    //////////////
    // MESSAGES //
    //////////////

    // The XGo Rider is programmed by means of messages.
    // The available messages are enumerated in 'Message'
    // and are executed by the routine 'handleMessage'.

    enum Message {

        Stop,           // stops the walking
        Wait,           // suspend the program for the specified time
        Pause,          // pause the program until Message.Continue
        Continue,       // continue the program after Message.Pause

        Forward,        // move in the specified direction
        Backward,

        SetSpeed,       // set the speed between 0 and 100 %
        SpeedUp,        // speeding up by 10 %
        SlowDown,       // slowing down by 10 %

        TurnLeft,       // turn as a continuous rotation
        TurnRight,      // the rotation will be stopped by
        TurnOff,        // a movement message or the stop message

        Stretch,        // stretch or shrink the body
        Angle,          // angle of the wheels to the floor

        Leds,           // set the color of the leds

        NotImplemented  // standard actions
    }

    let MESSAGE: number = -1
    let PAUSE: boolean = false

    ///////////////////////////////
    // CONTROLLING THE XGO RIDER //
    ///////////////////////////////

    let MOVEMENT: number = Message.Stop // the latest movement message

    // Speed range:
    // ------------
    // Value: 0 to 100 (in %)
    // Message: 1000 to 1100
    let SPEED: number = 50

    // Stretch range:
    // --------------
    // Value: -20 to 20 (in mm)
    // Message: 500 to 540
    let STRETCH: number = 0

    // Angle range:
    // --------------
    // Value: -100 to 100 (in degr)
    // Message: 700 to 800
    let ANGLE: number = 0

    // Led colors:
    // -----------
    let LEDS: number = 0
    let COLOR: Color = Color.Black

    ///////////////////////////////
    // MESSAGE HANDLING ROUTINES //
    ///////////////////////////////

    function handleMessage() {

        // A leader sends its movements to the followers
        if (Wave.isLeader()) {
            let msec = Wave.readWait()
            if (MESSAGE != Message.Stop && msec > 0)
                radio.sendNumber(10000 + msec) // treat wave as Message.Wait
            radio.sendNumber(MESSAGE)
        }

        // Instead of 'Message.Wait', this message is submitted by
        // the calculated value of '10000 + wait time'.
        let wait = 0
        if (MESSAGE >= 10000) {
            wait = MESSAGE - 10000
            MESSAGE = Message.Wait
        }

        // Instead of 'Message.Led', this message is submitted by
        // the calculated value of '2000 + Led value * 20 + Color value'.
        if (MESSAGE >= 2000) {
            let val = MESSAGE - 2000
            LEDS = Math.floor(val / 30)
            COLOR = val - LEDS * 30
            MESSAGE = Message.Leds
        }

        // Instead of 'Message.Speed', this message is submitted by
        // the calculated value of '1000 + required speed'.
        if (MESSAGE >= 1000) {
            SPEED = MESSAGE - 1000
            // reactivate the latest movement message
            MESSAGE = MOVEMENT
        }

        // Instead of 'Message.Angle', this message is submitted by
        // the calculated value of '600 + required angle'.
        if (MESSAGE >= 600) {
            ANGLE = MESSAGE - 700
            // reactivate the latest movement message
            MESSAGE = Message.Angle
        }

        // Instead of 'Message.Stretch', this message is submitted by
        // the calculated value of '500 + required height'.
        if (MESSAGE >= 500) {
            STRETCH = MESSAGE - 520
            // reactivate the latest movement message
            MESSAGE = Message.Stretch
        }

        // If needed, pause a while to get a wave effect
        // Message.Stop is excluded from the wave behaviour.
        if (Wave.readWait() > 0 && MESSAGE != Message.Stop)
            basic.pause(Wave.readWait())

        // Handle the messages
        switch (MESSAGE) {
            case Message.Stop:
                xgo.stopMoving()
                break
            case Message.Wait:
                basic.pause(wait * 1000)
                break
            case Message.Pause:
                xgo.stopMoving()
                PAUSE = true
                break
            case Message.Continue:
                PAUSE = false
                break
            //
            // MOVEMENT CONTROL
            //
            case Message.Forward:
                MOVEMENT = Message.Forward
                xgo.rotateRider(Rotate.Clockwise, 0)
                xgo.moveRider(Move.Forward, SPEED)
                break
            case Message.Backward:
                MOVEMENT = Message.Backward
                xgo.rotateRider(Rotate.Clockwise, 0)
                xgo.moveRider(Move.Backward, SPEED)
                break
            case Message.TurnLeft:
                MOVEMENT = Message.TurnLeft
                xgo.moveRider(Move.Forward, 0)
                xgo.rotateRider(Rotate.AntiClockwise, SPEED)
                break
            case Message.TurnRight:
                MOVEMENT = Message.TurnRight
                xgo.moveRider(Move.Forward, 0)
                xgo.rotateRider(Rotate.Clockwise, SPEED)
                break
            case Message.TurnOff:
                MOVEMENT = Message.TurnOff
                xgo.rotateRider(Rotate.Clockwise, 0)
                break
            case Message.SpeedUp:
                SPEED += 10
                if (SPEED > 100) SPEED = 100
                // call handleMessage recursively to activate the speed
                MESSAGE = MOVEMENT
                handleMessage()
                break
            case Message.SlowDown:
                SPEED -= 10
                if (SPEED < 0) SPEED = 0
                // call handleMessage recursively to activate the speed
                MESSAGE = MOVEMENT
                handleMessage()
                break
            case Message.Stretch:
                xgo.setHeight(STRETCH)
                break
            case Message.Angle:
                xgo.setAngle(ANGLE)
                break
            //
            // LED CONTROL
            //
            case Message.Leds:
                xgo.ledColor(LEDS, COLOR)
                break;
            //
            // STANDARD ACTIONS
            //
            case Message.NotImplemented:
                break
        }
        MESSAGE = -1
    }

    ////////////////////////
    // PROGRAMMING BLOCKS //
    ////////////////////////

    //% subcategory="Effecten" color="#82705C"
    //% block="turn %led to %color"
    //% block.loc.nl="maak %led %color"
    export function led(led: Led, color: Color) {
        MESSAGE = 2000 + led * 30 + color
        if (!PAUSE) handleMessage()
    }

    //% subcategory="Effecten" color="#82705C"
    //% block="stretch %height mm"
    //% block.loc.nl="strek %height mm"
    //% height.min=0 height.max=20 height.defl=0
    export function stretch(height: number) {
        MESSAGE = 520 + height
        if (!PAUSE) handleMessage()
    }

    //% subcategory="Effecten" color="#82705C"
    //% block="shrink %height mm"
    //% block.loc.nl="krimp %height mm"
    //% height.min=0 height.max=20 height.defl=0
    export function shrink(height: number) {
        MESSAGE = 520 - height
        if (!PAUSE) handleMessage()
    }

    //% subcategory="Effecten" color="#82705C"
    //% block="lean %angle ° to the left"
    //% block.loc.nl="hel %angle ° over naar links"
    //% angle.min=0 angle.max=45 angle.defl=0
    export function leanLeft(angle: number) {
        MESSAGE = 700 + 2 * angle
        if (!PAUSE) handleMessage()
    }

    //% subcategory="Effecten" color="#82705C"
    //% block="lean %angle ° to the right"
    //% block.loc.nl="hel %angle ° over naar rechts"
    //% angle.min=0 angle.max=45 angle.defl=0
    export function leanRight(angle: number) {
        MESSAGE = 700 - 2 * angle
        if (!PAUSE) handleMessage()
    }

    //% block="continue"
    //% block.loc.nl="einde pauze"
    export function pauseOff() {
        MESSAGE = Message.Continue
        handleMessage()
    }

    //% block="pause"
    //% block.loc.nl="begin pauze"
    export function pauseOn() {
        MESSAGE = Message.Pause
        handleMessage()
    }

    //% block="stop"
    //% block.loc.nl="stop"
    export function stop() {
        MESSAGE = Message.Stop
        if (!PAUSE) handleMessage()
    }

    //% block="turn %rotation"
    //% block.loc.nl="draai %rotation"
    export function turn(rotation: Rotate) {
        switch (rotation) {
            case Rotate.AntiClockwise: MESSAGE = Message.TurnLeft; break;
            case Rotate.Clockwise: MESSAGE = Message.TurnRight; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="ride %movement"
    //% block.loc.nl="rijd %movement"
    export function move(movement: Move) {
        switch (movement) {
            case Move.Forward: MESSAGE = Message.Forward; break;
            case Move.Backward: MESSAGE = Message.Backward; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="set speed to %speed \\%"
    //% block.loc.nl="stel de snelheid in op %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeed(speed: number) {
        MESSAGE = 1000 + speed;
        if (!PAUSE) handleMessage()
    }

}
