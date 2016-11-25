import React from 'react';
import {ReactDOM} from 'react-dom';
import classNames from 'classNames';


class MatrixItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.timeoutDuration = 500;
    this.state = {
      value: 0,
      x: 0,
      y: 0
    }
  }
  updateValueState(value) {
    if (value === undefined) {
      value = this.props.value;
    }
    this.setState({value:value})
  }
  updateCoordState(x, y) {
    if (x === undefined || y === undefined) {
      let {x, y} = this.props;
      this.setState({x, y})
      return;
    }
    this.setState({x, y})
  }
  execFuncWithTimeOut(func, timeout) {
    if (timeout === undefined) {
      timeout = this.timeoutDuration;
    }
    return window.setTimeout(func, timeout);
  }
  componentDidMount() {
    const {value, x, y} = this.props;
    this.updateValueState();
    this.updateCoordState();
    // window.setTimeout(this.updateValueState.bind(this), 1000)
  }
  componentWillReceiveProps(nextProps) {

    const {value, x, y} = nextProps;
    const {value:preVal, x:preX, y:preY} = this.props;
    if (value) {
      if (value === preVal || preVal && value === 0) {
        this.updateValueState.bind(this);
      } else {
        this.execFuncWithTimeOut(this.updateValueState.bind(this));
      }
      this.updateCoordState(x, y);
    } else {
      this.execFuncWithTimeOut(this.updateCoordState.bind(this));

      if (preVal) {
        this.execFuncWithTimeOut(this.updateValueState.bind(this));
      } else {
        this.updateValueState();
      }
    }
  }
  render () {

    const {value, x, y} = this.state;
    const blockClass = classNames("app-2048__blockitem", {
      empty: !value,
    })
    return (
      <li
        className={`${blockClass} x${x} y${y} size-${value}`}
        data-block-value={value}>
        <div>
        </div>
      </li>
    )
  }
}

export default MatrixItem;
