import React from 'react';
import { withPrefix } from 'gatsby-link';
import PropTypes from 'prop-types';

export default class Avatar extends React.Component {
  render() {
    const { avatar, name, className } = this.props;
    const avatarUrl = avatar && avatar.indexOf('http') > -1 ? avatar : withPrefix(avatar);
    return (
      <figure className={className} title={name}>
        {avatar && (
          <img
            src={avatarUrl}
            alt={name}
          />
        )}
      </figure>
    );
  }
}

Avatar.propTypes = {
  avatar: PropTypes.string,
};
