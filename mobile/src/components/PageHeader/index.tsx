import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import { useNavigation, useLinkProps } from '@react-navigation/native';

interface PageHeaderProps {
  title?: string;
  headerRight?: ReactNode,
  topTitle: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, topTitle, children }) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Text style={styles.topTitle}>{topTitle}</Text>
        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={{marginBottom:40}}>
      <View style={styles.header}>
        {title && <Text style={styles.title}>{title}</Text>}
        {headerRight}
      </View>
      <View style={styles.children}>
        {children}
      </View>
      </View>
    </View>
  );
}

export default PageHeader;