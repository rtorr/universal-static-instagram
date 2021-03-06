'use strict';

import React, {Component, PropTypes} from 'react';
import compact from 'lodash/array/compact';
import moment from 'moment';
import PhotosList from './PhotosList';
import TagLink from '../tag/TagLink';
import PageLink from '../page/PageLink';
import PhotoLink from '../photo/PhotoLink';
import PhotoLinkYear from '../photo/PhotoLinkYear';
import PhotoLinkMonth from '../photo/PhotoLinkMonth';
import {propsToDate} from '../../helpers/date';
import SectionHeader from 'rebass/dist/SectionHeader';

const formatPath = (path, format) => moment(propsToDate({path})).format(format);

export default class PhotosBy extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['page', 'tag', 'year', 'month', 'day']),
    name: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string
  }

  getTitle () {
    const {type, name} = this.props;
    switch (type) {
    case 'page':
      return `Page ${name}`;
    case 'tag':
      return `Tag ${name}`;
    case 'year':
      return formatPath(name, 'YYYY');
    case 'month':
      return formatPath(name, 'MMMM YYYY');
    case 'day':
      return formatPath(name, 'MMMM D, YYYY');
    }
  }

  getLinks () {
    const {type, previous, next, name} = this.props;

    switch (type) {
    case 'page':
      return [
        <PageLink page={previous} disabled={!previous}>Prev</PageLink>,
        <PageLink page={next} disabled={!next}>Next</PageLink>,
        <PageLink className='btn btn-outline'>All pages</PageLink>
      ];
    case 'tag':
      return [
        <TagLink tag={previous} disabled={!previous}>Prev</TagLink>,
        <TagLink tag={next} disabled={!next}>Next</TagLink>,
        <TagLink>Other tags</TagLink>
      ];
    case 'year':
    case 'month':
    case 'day':
      return [
        <PhotoLink path={previous} disabled={!previous}>Previous</PhotoLink>,
        <PhotoLink path={next} disabled={!next}>Next</PhotoLink>,
        (type === 'month' || type === 'day') && <PhotoLinkYear path={name} />,
        (type === 'day') && <PhotoLinkMonth path={name} />
      ];
    }
  }

  render () {
    const {photos} = this.props;
    const title = this.getTitle();
    const links = compact(this.getLinks());

    return (
      <div>
        <SectionHeader title={title} />
        <PhotosList photos={photos} type='thumbnail' />
        <div className='flex flex-wrap'>
          {links.map((link, index) =>
            <div key={index} className='mb2 px1'>
              {React.cloneElement(link, {className: 'btn btn-outline'})}
            </div>
          )}
        </div>
      </div>
    );
  }
}
