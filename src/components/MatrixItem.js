import React from 'react';
import {ReactDOM} from 'react-dom';
import classNames from 'classNames';


class MatrixItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render () {
    const {value, x, y, keyProp} = this.props;
    const blockClass = classNames("app-2048__blockitem", {
      empty: !value,
    })
    return (
      <li
        className={`${blockClass} x${x} y${y}`}
        data-block-value={value}>
        <div>
        </div>
      </li>
    )
  }
}

export default MatrixItem;
