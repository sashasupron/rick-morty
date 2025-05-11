import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './index.styles';
import { useCharacter } from '../../../entities/character/api/useCharacter';
import { Character } from '../../../entities/character/model/types';

export default function CharacterList () {
    const { characters, fetchCharacters, loading } = useCharacter ();

    const renderItem = ({ item }: { item: Character }) => (
        <TouchableOpacity style = {styles.card}>
            <Image source = {{ uri: item.image }} style = {styles.image} />
            <View>
                <Text style = {styles.name}>{item.name} </Text>
                <Text style = {styles.text}>{item.status} </Text>
                <Text style = {styles.text}>{item.species} </Text>
            </View>
        </TouchableOpacity>
      );

    return (
        <ImageBackground
            source = {require('../../../shared/assets/images/image.jpg')} 
            resizeMode = "cover" 
        >
            <FlatList
                data = {characters}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id.toString()}
                onEndReached = {fetchCharacters}
                onEndReachedThreshold = {0.5}
                ListFooterComponent = {loading ? <ActivityIndicator size="large" /> : null}
            />
        </ImageBackground>
    );
};


