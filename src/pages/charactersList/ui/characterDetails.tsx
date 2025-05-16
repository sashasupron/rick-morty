import React from 'react';
import { View, Text, Image, ImageBackground, Linking, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../entities/character/model/types';
import { styles } from './index.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
  
type CharacterDetailsProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>; // component expects to get a character object from the route parameters

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) => {
  const { character } = route.params;

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
    <ImageBackground
        source = {require('../../../shared/assets/images/image.jpg')} 
        resizeMode = "cover" 
        style = {styles.imageBackground}
    >
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
            <View style={[
                styles.cardDetails,
                { backgroundColor: theme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)' } 
            ]}>
                <View style = {{ alignItems: 'center', marginVertical: 16 }}>
                    <Image source = {{ uri: character.image }} style = {styles.imageDetails} />
                </View>

                <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Status: {character.status}</Text>
                <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Species: {character.species}</Text>


                {character.type ? ( // if type exists
                    <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Type: {character.type}</Text>
                ) : null} 

                <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Status: {character.gender}</Text>
                

                {character.origin?.name && character.origin?.url ? ( // name is a button connected to url
                    <Pressable onPress = {() => Linking.openURL(character.origin.url)}> 
                        {({ pressed }) => (
                        <Text
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' },
                            { color: theme === 'dark' ? '#fff' : '#000' }
                            ]}
                        >
                            Origin: {character.origin.name}
                        </Text>
                        )}
                    </Pressable>
                ) : character.origin?.name ? ( // if only name
                    <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Origin: {character.origin.name}</Text>
                ) : null}


                {character.location?.name && character.location?.url ? (
                    <Pressable onPress = {() => Linking.openURL(character.location.url)}>
                        {({ pressed }) => (
                        <Text
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' },
                            { color: theme === 'dark' ? '#fff' : '#000' }
                            ]}
                        >
                            Location: {character.location.name}
                        </Text>
                        )}
                    </Pressable>
                ) : character.location?.name ? (
                    <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Location: {character.location.name}</Text>
                ) : null}


                {character.episode?.length > 0 && (
                <Pressable onPress = {() => Linking.openURL(character.location.url)}>
                    {({ pressed }) => (
                    <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                        Episodes:{' '}
                        {character.episode.map((epUrl, index) => ( 
                        <Text
                            key = {index}
                            onPress = {() => Linking.openURL(epUrl)}
                            style = {[
                            styles.descDetails,
                            { color: pressed ? 'gray' : 'black' },
                            { color: theme === 'dark' ? '#fff' : '#000' }
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
                            { color: pressed ? 'gray' : 'black' },
                            { color: theme === 'dark' ? '#fff' : '#000' }
                            ]}
                        >
                            URL: {character.url}
                        </Text>
                        )}
                    </Pressable>
                ) : null }

                <Text style = {[styles.descDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Created: {character.created}</Text>
        
            </View>
        </ScrollView>
    </ImageBackground>
  );
};

export default CharacterDetails;
