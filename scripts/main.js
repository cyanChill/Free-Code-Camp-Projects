class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vol: 50,
        };
        this.updateVolume = this.updateVolume.bind(this);
    }
    updateVolume(event) {
        this.setState({ vol: event.target.value });
    }

    render() {
        return (
            <div id="body-container">
                <div id="control-box">
                    <div id="button-display">
                        <p id="action-display">Display Current Action</p>
                        <div>
                            <button className="action-button">Q</button>
                            <button className="action-button">W</button>
                            <button className="action-button">E</button>
                        </div>
                        <div>
                            <button className="action-button">A</button>
                            <button className="action-button">S</button>
                            <button className="action-button">D</button>
                        </div>
                        <div>
                            <button className="action-button">Z</button>
                            <button className="action-button">X</button>
                            <button className="action-button">C</button>
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

$(document).keydown((event) => {
    // The "which" property retrieves the character code of the key pressed
    // Does track long press

    if (event.which == 81) $('#action-display').html('Q key');
    if (event.which == 87) $('#action-display').html('W key');
    if (event.which == 69) $('#action-display').html('E key');
    if (event.which == 65) $('#action-display').html('A key');
    if (event.which == 83) $('#action-display').html('S key');
    if (event.which == 68) $('#action-display').html('D key');
    if (event.which == 90) $('#action-display').html('Z key');
    if (event.which == 88) $('#action-display').html('X key');
    if (event.which == 67) $('#action-display').html('C key');
    //console.log(event.which)
});