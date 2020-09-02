import React from 'react';
import { View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import backIcon from '../../assets/images/icons/back-arrow-gray.png';
import styles from './styles';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

const RegistrationHeader: React.FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={styles.container}>
      <RectButton
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={backIcon}
        />
      </RectButton>

      <View style={styles.dotContainer}>
        {
          state.routeNames.map((obj, index) => {
            return (
              <View
                key={index}
                style={
                  state.index === index ? styles.filledDot : styles.dot
                }/>
            )
          })
        }
      </View>
    </View>
  );
}

export default RegistrationHeader;