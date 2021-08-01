const instruments = {
    "dp-Q": {
        display: "Heater 1",
        key: 'Q',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    },
    "dp-W": {
        display: "Heater 2",
        key: 'W',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    },
    "dp-E": {
        display: "Heater 3",
        key: 'E',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },
    "dp-A": {
        display: "Heater 4",
        key: 'A',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    },
    "dp-S": {
        display: "Clap",
        key: 'S',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    },
    "dp-D": {
        display: "Open HH",
        key: 'D',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    },
    "dp-Z": {
        display: "Kick n' Hat",
        key: 'Z',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },
    "dp-X": {
        display: "Kick",
        key: 'X',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },
    "dp-C": {
        display: "Closed HH",
        key: 'C',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
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
        document.getElementById(target.key).currentTime = 0;
        document.getElementById(target.key).play();
        document.getElementById(target.key).volume = this.state.vol / 100;
        $(`#${event.target.id}`).css({
            backgroundColor: "rgb(147, 161, 175)",
            fontWeight: "bold",
        });
        setTimeout(() => {
            $(`#${event.target.id}`).css({
                backgroundColor: "rgb(205, 209, 214)",
                fontWeight: "normal",
            })
        }, 200);
    }

    render() {
        let btns = [];
        for (let i = 0; i < Object.keys(instruments).length; i += 3) {
            const keys = Object.keys(instruments);
            const vals = Object.values(instruments);
            btns.push(
                <div key={`group-${i / 3 + 1}`}>
                    <button id={keys[i]} className="drum-pad" onClick={this.playAudio}>
                        {vals[i].key}
                        <audio id={vals[i].key} className="clip" src={vals[i].src} />
                    </button>
                    <button id={keys[i+1]} className="drum-pad" onClick={this.playAudio}>
                        {vals[i+1].key}
                        <audio id={vals[i+1].key} className="clip" src={vals[i+1].src} />
                    </button>
                    <button id={keys[i+2]} className="drum-pad" onClick={this.playAudio}>
                        {vals[i+2].key}
                        <audio id={vals[i+2].key} className="clip" src={vals[i+2].src} />
                    </button>
                </div>
            );
        };

        return (
            <div id="body-container">
                <div id="drum-machine">
                    <div id="button-display">
                        <p id="display" />
                        {btns}
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
