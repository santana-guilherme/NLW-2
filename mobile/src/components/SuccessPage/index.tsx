import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backgroundImg from '../../assets/images/success-page-background.png';
import successIcon from '../../assets/images/icons/success-check-icon.png';

import styles from './styles'

interface SuccessPageProps {
  title: string,
  btnLabel: string,
  btnLink: string
}

const SuccessPage: React.FC<SuccessPageProps> = ({ title, btnLabel, btnLink, children }) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain"
        style={styles.mainContent}
        source={backgroundImg}
      >
        <Image
          style={styles.successIcon}
          source={successIcon}
        />
        <Text style={styles.title}>{title}</Text>
        {children}
      </ImageBackground>
      <RectButton
        style={styles.button}
        onPress={() => navigate(btnLink)}
      >
        <Text
          style={styles.buttonText}
        >{btnLabel}</Text>
      </RectButton>
    </View>
  );
}

export default SuccessPage;