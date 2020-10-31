import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import study from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

function Landing() {
  const navigation = useNavigation();
  const [connections, setConnections] = useState(0);
  useEffect(() => {
    async function loadConnections() {
      const response = await api.get('/connections');
      setConnections(response.data.total);
    }
    loadConnections();
  }, [connections]);

  function handleNavigationToGiveClassesPage() {
    navigation.navigate('GiveClasses');
  }

  function handleNavigationToStudyPages() {
    navigation.navigate('Study')
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button, styles.buttonPrimary]} 
          onPress={handleNavigationToStudyPages}>
          <Image source={study} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        
        <RectButton 
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigationToGiveClassesPage}>
          <Image source={giveClasses} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {connections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing;