import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './index.styles';
import { useCharacter } from '../../../entities/character/api/useCharacter';
import { Character, RootStackParamList } from '../../../entities/character/model/types';
import { CharacterFilters } from '../../../features/characterFilters/ui/characterFilters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomLoader } from '../../../shared/widgets/loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export default function CharacterList () {
    const { characters, fetchCharacters, loading, setFilters } = useCharacter ();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CharactersList'>>();

    const theme = useSelector((state: RootState) => state.theme.theme);

    const renderItem = ({ item }: { item: Character }) => (
        <TouchableOpacity 
            style = {[
                styles.card,
                { backgroundColor: theme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)' } 
            ]}

            onPress = {() => navigation.navigate('CharacterDetails', { character: item })}
        >
            <Image source = {{ uri: item.image }} style = {styles.image} />
            <View>
                <Text style = {[styles.name, { color: theme === 'dark' ? '#fff' : '#000' }]}>{item.name}</Text>
                <Text style = {[styles.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>{item.status}</Text>
                <Text style = {[styles.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>{item.species}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderFilters = useMemo(() => (
        <View style = {{ padding: 10 }}>
            <CharacterFilters onSearch = {setFilters} />
        </View>
    ), [setFilters]);


    if (loading) {
        return <CustomLoader />;
    }

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
                ListFooterComponent = {loading ? <ActivityIndicator size = "large" color = "tomato"/> : null}
            />
        </ImageBackground>
    );
};


