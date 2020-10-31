import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoriteTeachers = JSON.parse(response);
        const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => teacher.id);
        setFavorites(favoriteTeachersIds);
      }
    });
  }

  function handleToogleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleSeachTeacher() {
    loadFavorites();
    const response = await api.get('/classes', {
      params: {
        subject, week_day, time
      }
    });
    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToogleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        { isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={setWeekday}
                />  
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />  
              </View>  
            </View>

            <RectButton 
              style={styles.submitButton}
              onPress={handleSeachTeacher}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
        ) }
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        { teachers.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher} 
            favorited={favorites.includes(teacher.id)}
          />
        )) }
      </ScrollView>
    </View>
  )
}

export default TeacherList;