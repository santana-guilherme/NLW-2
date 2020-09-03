import React, { useState, useEffect, useReducer } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import logOutIcon from '../../assets/images/icons/logout.png'

import tempUserAvatar from '../../assets/images/defaultAvatar.png'

import api from '../../services/api';

import styles from './styles';
import { useAuth } from '../../contexts/auth';

function Landing() {
  const { navigate } = useNavigation();
  const {user, logOut} = useAuth()

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPage() {
    navigate('Study')
  }

  const [totalConnections, setTotalConnections] = useState(0)

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data
      setTotalConnections(total)
    })
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Image 
            source={user?.avatar ? {uri: user.avatar} :tempUserAvatar}
            style={styles.userAvatar}
            />
            <Text style={styles.userName}>{user?.name} {user?.last_name}</Text>
          </View>
          <RectButton style={styles.logoutButton} onPress={logOut}>
            <Image
              style={logOutIcon}
              resizeMode="contain"
              source={logOutIcon}
            />
          </RectButton>
        </View>
        <Image source={landingImg} style={styles.banner} />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleNavigateToStudyPage}
          >
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>

          <RectButton
            onPress={handleNavigateToGiveClassesPage}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Lecionar</Text>
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Todal de {totalConnections} conexões já realizadas {' '}
          <Image source={heartIcon} />
        </Text>
      </View>

    </View>
  );
}

export default Landing;