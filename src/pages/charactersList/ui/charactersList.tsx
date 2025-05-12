import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './index.styles';
import { useCharacter } from '../../../entities/character/api/useCharacter';
import { Character, RootStackParamList } from '../../../entities/character/model/types';
import { CharacterFilters } from '../../../features/characterFilters/ui/characterFilters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



export default function CharacterList () {
    const { characters, fetchCharacters, loading, setFilters } = useCharacter ();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CharactersList'>>();

    const renderItem = ({ item }: { item: Character }) => (
        <TouchableOpacity 
            style = {styles.card}
            onPress = {() => navigation.navigate('CharacterDetails', { character: item })}
        >
            <Image source = {{ uri: item.image }} style = {styles.image} />
            <View>
                <Text style = {styles.name}>{item.name} </Text>
                <Text style = {styles.text}>{item.status} </Text>
                <Text style = {styles.text}>{item.species} </Text>
            </View>
        </TouchableOpacity>
    );

    const renderFilters = useMemo(() => (
        <View style = {{ padding: 10 }}>
            <CharacterFilters onSearch = {setFilters} />
        </View>
    ), [setFilters]);

    return (
        <ImageBackground
            source = {require('../../../shared/assets/images/image.jpg')} 
            resizeMode = "cover" 
        >
            <FlatList
                data = {characters}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id.toString()}
                onEndReached = {() => fetchCharacters(false)}
                onEndReachedThreshold = {0.5}
                ListHeaderComponent = {renderFilters} // filters
                ListFooterComponent = {loading ? <ActivityIndicator size = "large" /> : null}
            />
        </ImageBackground>
    );
};


