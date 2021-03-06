'use strict';

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import createdDate from '../../helpers/createdDate';

export default class PhotoDate extends Component {
  static propTypes = {
    createdTime: PropTypes.string.isRequired,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    dateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a'
  }

  render () {
    const date = createdDate(this.props.createdTime);
    return (
      <span>{moment(date).format(this.props.dateFormat)}</span>
    );
  }
}
