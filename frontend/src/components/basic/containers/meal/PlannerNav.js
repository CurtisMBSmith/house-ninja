import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ForwardBackwardButton from './../../widgets/ForwardBackwardButton';

export default class PlannerNav extends Component {
  render() {
    return (
      <div id="plannerDayNav" >
        <ForwardBackwardButton magnitude={-7} forwardBackwardAction={this.props.forwardBackwardAction} />
        <ForwardBackwardButton magnitude={-1} forwardBackwardAction={this.props.forwardBackwardAction} />
        <ForwardBackwardButton magnitude={1} forwardBackwardAction={this.props.forwardBackwardAction} />
        <ForwardBackwardButton magnitude={7} forwardBackwardAction={this.props.forwardBackwardAction} />
      </div>
    );
  }
}

PlannerNav.propTypes = {
  forwardBackwardAction: PropTypes.func.isRequired
};
