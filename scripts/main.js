const defaultSettings = {
    breakLen: 5,
    sessionLen: 25,
    timing: {
        status: 'paused',
        min: 25,
        sec: 0,
        timeVar: '',
        type: 'Session',
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultSettings;
        this.updateLen = this.updateLen.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }


    // Returns interval function for countdown
    countDown() {
        return setInterval(() => {
            let {timing} = this.state;
            if (timing.sec > 0) {
                this.setState({
                    timing: {
                        ...this.state.timing,
                        sec: timing.sec - 1,
                    },
                });
            } else if (timing.min > 0) {
                this.setState({
                    timing: {
                        ...this.state.timing,
                        min: timing.min - 1,
                        sec: 59,
                    },
                });
            } else {
                document.getElementById('beep').play();
                clearInterval(this.state.timing.timeVar);
                this.setState({
                    timing: {
                        ...this.state.timing,
                        min: timing.type === 'Session' ? this.state.breakLen : this.state.sessionLen,
                        timeVar: this.countDown(),
                        type: timing.type === 'Session' ? 'Break' : 'Session',
                    },
                });
            }
        }, 1000);
    }

    // Play/Pause the displayed timer
    runTimer() {
        let {timing} = this.state;

        if (timing.status === 'play') {
            clearInterval(timing.timeVar);
        }

        // Stop alarm sound if it's running
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;

        this.setState({
            timing: {
                ...this.state.timing,
                status: timing.status === 'paused' ? 'play' : 'paused',
                timeVar: timing.status === 'paused' ? this.countDown() : '',
            },
        });

    }

    // Reset the timer values to it's default values
    resetTimer() {
        clearInterval(this.state.timing.timeVar);
        this.setState(defaultSettings);
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
    }

    // Updating the length of the break and session
    updateLen(event) {
        const type = event.target.id.split('-');
        const {breakLen, sessionLen, timing} = this.state;
        if (timing.status === 'paused') {
            this.setState({
                timing: {
                    ...this.state.timing,
                    sec: 0,
                    type: 'Session',
                },
            });

            if (type[0] === 'break') {
                if (type[1] === 'increment' && breakLen !== 60) {
                    this.setState((state) => { return { breakLen: state.breakLen + 1 }});
                } else if (type[1] === 'decrement' && breakLen !== 1){
                    this.setState((state) => { return { breakLen: state.breakLen - 1 }});
                }
            } else if (type[0] === 'session') {
                if (type[1] === 'increment' && sessionLen !== 60) {
                    this.setState((state) => {
                        return { 
                            sessionLen: state.sessionLen + 1,
                            timing: {
                                ...state.timing,
                                min: state.sessionLen + 1,
                        }
                    }});
                } else if (type[1] === 'decrement' && sessionLen !== 1){
                    this.setState((state) => {
                        return { 
                            sessionLen: state.sessionLen - 1,
                            timing: {
                                ...state.timing,
                                min: state.sessionLen - 1,
                        }
                    }});
                }
            }
        }
    }


    render() {
        const {timing} = this.state;
        const lengthControl = ['break','session'].map((entry) => {
            return (
                <div id={`${entry}-container`} key={`${entry}-key`}>
                    <p id={`${entry}-label`}>{`${entry} Length`}</p>
                    <button id={`${entry}-decrement`} onClick={this.updateLen}>
                        <i id={`${entry}-decrement-icon`} className="fas fa-arrow-down"></i>
                    </button>
                    <span id={`${entry}-length`}>{this.state[`${entry}Len`]}</span>
                    <button id={`${entry}-increment`} onClick={this.updateLen}>
                        <i id={`${entry}-increment-icon`} className="fas fa-arrow-up"></i>
                    </button>
                </div>
            );
        });


        return (
            <div id="project-container">
                {lengthControl}
                <div id="timer-container">
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
                    <p id="timer-label">{timing.type}</p>
                    <p id="time-left">{`${(timing.min).toString().padStart(2, '0')}:${(timing.sec).toString().padStart(2, '0')}`}</p>
                    <div id="media-controls">
                        <button id="start_stop" onClick={this.runTimer}>
                            <i className="fas fa-play"></i>
                            <i className="fas fa-pause"></i>
                        </button>
                        <button id="reset" onClick={this.resetTimer}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));