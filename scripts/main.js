class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }



    render() {
        

        // Can prob use a template to make the "break-container" and "session-container" using: {`${type}-label`} etc for the ids

        return (
            <div id="project-container">
                <div id="break-container">
                    <p id="break-label">Break Length</p>
                    <button id="break-decrement">
                        <i className="fas fa-arrow-down"></i>
                    </button>
                    <p id="break-length">5</p>
                    <button id="break-increment">
                        <i className="fas fa-arrow-up"></i>
                    </button>
                </div>
                <div id="session-container">
                    <p id="session-label">Session Length</p>
                    <button id="session-decrement">
                        <i className="fas fa-arrow-down"></i>
                    </button>
                    <p id="session-length">25</p>
                    <button id="session-increment">
                        <i className="fas fa-arrow-up"></i>
                    </button>
                </div>
                <div id="timer-container">
                    <p id="timer-label">Session</p>
                    <p id="time-left">25:00</p>
                    <button id="start_stop">
                        <i className="fas fa-play"></i>
                        <i className="fas fa-pause"></i>
                    </button>
                    <button id="reset">
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));