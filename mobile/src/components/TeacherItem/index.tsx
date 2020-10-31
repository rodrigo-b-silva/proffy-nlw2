import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';
import styles from './styles';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  cost: number;
  whatsapp: string;
  bio: string;
}

interface TeacherProps {
  teacher: Teacher,
  favorited: boolean
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('/connections', {
      user_id: teacher.id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToogleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];
    if(favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if(isFavorited){
      //remove dos favoritos
      const favoriteIndex = favoritesArray.findIndex((teacherIndex: Teacher) => teacherIndex.id === teacher.id);
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      //adiciona nos favoritos
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.constainer}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar}} 
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preco/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToogleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
          >
            { isFavorited ? (
              <Image source={unfavoriteIcon} />
              ) : (
                <Image source={heartOutlineIcon} />
              ) }
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButtonButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem;