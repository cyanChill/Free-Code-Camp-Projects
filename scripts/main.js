class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLen: 5,
            sessionLen: 25,
        };
        this.playAlarm = this.playAlarm.bind(this);
        this.updateLen = this.updateLen.bind(this);
    }

    playAlarm() {

    }

    updateLen(event) {
        const type = event.target.id.split('-');
        const {breakLen, sessionLen} = this.state;
        if (type[0] === 'break') {
            if (type[1] === 'increment' && breakLen !== 60) {
                this.setState({ breakLen: breakLen + 1 });
            } else if (type[1] === 'decrement' && breakLen !== 1){
                this.setState({ breakLen: breakLen - 1 });
            }
        } else if (type[0] === 'session') {
            if (type[1] === 'increment' && sessionLen !== 60) {
                this.setState({ sessionLen: sessionLen + 1 });
            } else if (type[1] === 'decrement' && sessionLen !== 1){
                this.setState({ sessionLen: sessionLen - 1 });
            }
        }
    }


    // Try to use multiple components


    render() {
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
                    <p id="timer-label">Session</p>
                    <p id="time-left">25:00</p>
                    <div id="media-controls">
                        <button id="start_stop">
                            <i className="fas fa-play"></i>
                            <i className="fas fa-pause"></i>
                        </button>
                        <button id="reset">
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));