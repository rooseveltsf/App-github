import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import {
  Container,
  Form,
  Input,
  Submit,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import api from '../../services/api';

export default function Main({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const Users = await AsyncStorage.getItem('users');

      if (Users) {
        setUsers(JSON.parse(Users));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetch() {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
    fetch();
  }, [users]);

  async function handleAddUser() {
    setLoading(true);
    const response = await api.get(`/users/${newUser}`);

    const data = {
      id: response.data.id,
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers([...users, data]);
    setNewUser('');

    Keyboard.dismiss();
    setLoading(false);
  }

  function handleNavigate(user) {
    navigation.navigate('User', { user });
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          onChangeText={setNewUser}
          value={newUser}
          autoCapitalize="none"
          placeholder="Adicionar Usuário"
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <Submit load={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator size={'small'} color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </Submit>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};
