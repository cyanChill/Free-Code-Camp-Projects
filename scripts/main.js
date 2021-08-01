const instruments = {
    "dp-Q": {
        display: "Heater 1",
        key: 'Q'
    },
    "dp-W": {
        display: "Heater 2",
        key: 'W'
    },
    "dp-E": {
        display: "Heater 3",
        key: 'E'
    },
    "dp-A": {
        display: "Heater 4",
        key: 'A'
    },
    "dp-S": {
        display: "Clap",
        key: 'S'
    },
    "dp-D": {
        display: "Open HH",
        key: 'D'
    },
    "dp-Z": {
        display: "Kick n' Hat",
        key: 'Z'
    },
    "dp-X": {
        display: "Kick",
        key: 'X'
    },
    "dp-C": {
        display: "Closed HH",
        key: 'C'
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vol: 25,
        };
        this.updateVolume = this.updateVolume.bind(this);
        this.playAudio = this.playAudio.bind(this);
    }

    updateVolume(event) {
        this.setState({ vol: event.target.value });
        $('#display').text('');
    }

    playAudio(event) {
        const target = instruments[event.target.id];
        $('#display').text(target.display);
        //$('#heater-1').css("background-color", "rgb(147, 161, 175)");
        document.getElementById(target.key).play();
        document.getElementById(target.key).volume = this.state.vol / 100;
    }

    render() {
        return (
            <div id="body-container">
                <div id="drum-machine">
                    <div id="button-display">
                        <p id="display" />
                        <div>
                            <button id="dp-Q" className="drum-pad" onClick={this.playAudio}>
                                Q
                                <audio id="Q" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
                            </button>
                            <button id="dp-W" className="drum-pad" onClick={this.playAudio}>
                                W
                                <audio id="W" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
                            </button>
                            <button id="dp-E" className="drum-pad" onClick={this.playAudio}>
                                E
                                <audio id="E" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
                            </button>
                        </div>
                        <div>
                            <button id="dp-A" className="drum-pad" onClick={this.playAudio}>
                                A
                                <audio id="A" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
                            </button>
                            <button id="dp-S" className="drum-pad" onClick={this.playAudio}>
                                S
                                <audio id="S" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
                            </button>
                            <button id="dp-D" className="drum-pad" onClick={this.playAudio}>
                                D
                                <audio id="D" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
                            </button>
                        </div>
                        <div>
                            <button id="dp-Z" className="drum-pad" onClick={this.playAudio}>
                                Z
                                <audio id="Z" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
                            </button>
                            <button id="dp-X" className="drum-pad" onClick={this.playAudio}>
                                X
                                <audio id="X" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
                            </button>
                            <button id="dp-C" className="drum-pad" onClick={this.playAudio}>
                                C
                                <audio id="C" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
                            </button>
                        </div>
                    </div>
                    <div id="volume-bar" className="slider-wrapper">
                        <input id="volume" name="volume" type="range" min="0" max="100" value={this.state.vol} onChange={this.updateVolume} />
                        <span id="volume-bar-label">Volume: {this.state.vol} </span>
                    </div>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));

// Trigger Click Event With KeyPress
$(document).keydown((event) => {
    if (event.which == 81) $('#dp-Q').click();
    if (event.which == 87) $('#dp-W').click();
    if (event.which == 69) $('#dp-E').click();
    if (event.which == 65) $('#dp-A').click();
    if (event.which == 83) $('#dp-S').click();
    if (event.which == 68) $('#dp-D').click();
    if (event.which == 90) $('#dp-Z').click();
    if (event.which == 88) $('#dp-X').click();
    if (event.which == 67) $('#dp-C').click();
});

/*
$('#heater-1').click(() => {
    $('#display').text('Heater 1');
    $('#heater-1').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('Q').play();
    document.getElementById('Q').volume = this.state.vol / 100;
    console.log(document.getElementById('Q').volume)
    //$('#heater-1').css("background-color", "rgb(205, 209, 214)");

});
$('#heater-2').click(() => {
    $('#display').text('Heater 2');
    $('#heater-2').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('W').play();
});
$('#heater-3').click(() => {
    $('#display').text('Heater 3');
    $('#heater-3').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('E').play();
});
$('#heater-4').click(() => {
    $('#display').text('Heater 4');
    $('#heater-4').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('A').play();
});
$('#clap').click(() => {
    $('#display').text('Clap');
    $('#clap').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('S').play();
});
$('#open-hh').click(() => {
    $('#display').text('Open HH');
    $('#open-hh').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('D').play();
});
$('#kick-n-hat').click(() => {
    $('#display').text('Kick n\' Hat');
    $('#kick-n-hat').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('Z').play();
});
$('#kick').click(() => {
    $('#display').text('Kick');
    $('#kick').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('X').play();
});
$('#closed-hh').click(() => {
    $('#display').text('Closed HH');
    $('#closed-hh').css("background-color", "rgb(147, 161, 175)");
    document.getElementById('C').play();
});
*/