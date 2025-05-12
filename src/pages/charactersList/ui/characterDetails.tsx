import React from 'react';
import { View, Text, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../entities/character/model/types';
  
type CharacterDetailsProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>;

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) => {
  const { character } = route.params;

  return (
    <View>
      <Text>{character.name}</Text>
      <Image source={{ uri: character.image }} style={{ width: 200, height: 200 }} />
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
    </View>
  );
};

export default CharacterDetails;
