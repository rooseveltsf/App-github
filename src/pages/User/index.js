import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(navigation.getParam('user'));

  useEffect(() => {
    async function load() {
      const response = await api.get(`/users/${user.login}/starred`);

      setStars(response.data);
      setLoading(false);
    }

    load();
  }, [user]);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <Loading size="large" color={'#0468bf'} />
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = props => ({
  title: props.navigation.getParam('user').name,
});
