import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import api from '../../services/api';

// import { Container } from './styles';

export default function User({ match }) {
  const [user, setUser] = useState({});
  // const [login] = useState(match.params.login);
  async function load() {
    const login = match.params.login;
    const response = await api.get(`/users/${login}`);
    const data = {
      name: response.data.name,
    };
    setUser(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
}
