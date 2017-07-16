import React, { Component, PropTypes } from 'react';

export default class ForwardBackwardButton extends Component {
  render() {
    return (
      <span className="forwardBackwardButton" >
        <button type="button" onClick={e => {
          e.preventDefault();
          this.props.forwardBackwardAction(this.props.magnitude);
        }}>
        { this.determineButtonText() }
        </button>
     </span>
    );
  }

  determineButtonText() {
    var result;
    if (this.props.magnitude < 0) {
      result = "<";
      if (this.props.magnitude < -1) {
        result += "<";
      }
    } else {
      result = ">";
      if (this.props.magnitude > 1) {
        result += ">";
      }
    }

    return result;
  }
}

ForwardBackwardButton.propTypes = {
  magnitude: PropTypes.number.isRequired,
  forwardBackwardAction: PropTypes.func.isRequired
};
