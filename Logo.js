import React, { Component } from 'react';
import { Image } from 'react-native';

export default class Logo extends Component {
  render() {
    let pic = {
      uri: 'http://www.secnet.me/images/secnet/social-icons/support.png'
    };
    return (
        <Image source={pic} style={{width: 200, height: 200}}/>
    );
  }
}

