import React from 'react';
import {ReactDOM} from 'react-dom';

import classNames from 'classNames';

class MatrixItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render () {
    const {key, value, x, y} = this.props;
    const blockClass = classNames("app-2048__blockitem", {
      empty: !value,
    })
    return (
      <li
        className={blockClass}
        key={key}
        data-block-value={value}
        style={{
          left: `${x*25}%`,
          top: `${y*25}%`
        }}>
        <div>
        </div>
      </li>
    )
  }
}

export default MatrixItem;
