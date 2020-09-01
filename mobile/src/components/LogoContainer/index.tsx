import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import logoImg from '../../assets/images/logo-large.png';
import backgroundImg from '../../assets/images/logo-background.png';

import styles from './styles';

function LogoContainer() {
  return (

    <View style={styles.logoContainer}>
      <ImageBackground
        resizeMode='contain'
        source={backgroundImg}
        style={styles.content}
      >
        <View style={styles.logoContent}>
          <Image style={styles.logo} source={logoImg}></Image>
          <Text style={styles.text}>Sua plataforma de{'\n'}estudos online.</Text>
        </View>
      </ImageBackground>
    </View>

  );
}

export default LogoContainer;