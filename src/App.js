import React from 'react';
import {ReactDOM} from 'react-dom';
import blockData from './constants/block.js';
import {TwoZeroFourEightMap} from './utils/TwoZeroFourEightMap.js'


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.tzfeMap = new TwoZeroFourEightMap();
    this.state = { mapState: this.tzfeMap.getCatch() }
  }
  componentDidMount() {
    this.addKeyEvent();
  }
  addKeyEvent() {
    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
          case 37:
          case 38:
          case 39:
          case 40:
            break;
          default:
            return;
        }
        console.log(event.keyCode)
    }, false);
  }
  render() {
    const {mapState} = this.state;
    return (
      <div className="app">
        <section className="app-header">
          <button>开始游戏</button>
        </section>
        <section className="app-2048">
          <ul className="app-2048__blocklist">
            {mapState.map((block) => (
              <li
                className="app-2048__blockitem"
                key={block.key}
                data-block-value={block.value}
                style={{
                  left: `${block.x*25}%`,
                  top: `${block.y*25}%`
                }}>
                <div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
}

export default App;
