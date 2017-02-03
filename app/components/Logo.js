import React, { Component } from 'react';
import { Image } from 'react-native';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    if (props.uri) {
      this.state = {
        uri: props.uri
      }
    } else {
      this.state = {
        uri: 'http://www.secnet.me/images/secnet/social-icons/support.png'
      }
    }
  }

  render() {
    return (
        <Image source={this.state} style={{width: 200, height: 200}}/>
    );
  }
}

