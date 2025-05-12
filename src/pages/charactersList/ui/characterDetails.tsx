import React from 'react';
import { View, Text, Image, ImageBackground, Linking, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../entities/character/model/types';
import { styles } from './index.styles';
  
type CharacterDetailsProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>;

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) => {
  const { character } = route.params;

  return (
    <ImageBackground
        source = {require('../../../shared/assets/images/image.jpg')} 
        resizeMode = "cover" 
        style = {styles.imageBackground}
    >
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
            <View style = {styles.cardDetails}>
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <Image source={{ uri: character.image }} style={styles.imageDetails} />
                </View>
                <Text style = {styles.descDetails}>Status: {character.status}</Text>
                <Text style = {styles.descDetails}>Species: {character.species}</Text>


                {character.type ? (
                    <Text style = {styles.descDetails}>Type: {character.type}</Text>
                ) : null}

                <Text style = {styles.descDetails}>Status: {character.gender}</Text>
                

                {character.origin?.name && character.origin?.url ? (
                    <Pressable onPress = {() => Linking.openURL(character.origin.url)}>
                        {({ pressed }) => (
                        <Text
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' }
                            ]}
                        >
                            Origin: {character.origin.name}
                        </Text>
                        )}
                    </Pressable>
                ) : character.origin?.name ? (
                    <Text style = {styles.descDetails}>Origin: {character.origin.name}</Text>
                ) : null}


                {character.location?.name && character.location?.url ? (
                    <Pressable onPress = {() => Linking.openURL(character.location.url)}>
                        {({ pressed }) => (
                        <Text
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' }
                            ]}
                        >
                            Location: {character.location.name}
                        </Text>
                        )}
                    </Pressable>
                ) : character.location?.name ? (
                    <Text style = {styles.descDetails}>Location: {character.location.name}</Text>
                ) : null}


                {character.episode?.length > 0 && (
                <Pressable onPress = {() => Linking.openURL(character.location.url)}>
                    {({ pressed }) => (
                    <Text style = {styles.descDetails}>
                        Episodes:{' '}
                        {character.episode.map((epUrl, index) => (
                        <Text
                            key = {index}
                            onPress = {() => Linking.openURL(epUrl)}
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' },
                            ]}
                        >
                            {index + 1}
                            {index !== character.episode.length - 1 ? ', ' : ''}
                        </Text>
                        ))}
                    </Text>
                    )}
                </Pressable>
                )}


                {character.url ? (
                    <Pressable onPress = {() => Linking.openURL(character.url)}>
                        {({ pressed }) => (
                        <Text
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' }
                            ]}
                        >
                            URL: {character.url}
                        </Text>
                        )}
                    </Pressable>
                ) : null }

                <Text style = {styles.descDetails}>Created: {character.created}</Text>
        
            </View>
        </ScrollView>
    </ImageBackground>
  );
};

export default CharacterDetails;
