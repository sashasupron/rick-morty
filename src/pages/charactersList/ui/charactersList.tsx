import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextStyle, 
  StyleProp
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useCharacter } from '../../../entities/character/api/useCharacter';
import { Character, RootStackParamList } from '../../../entities/character/model/types';
import { CharacterFilters } from '../../../features/characterFilters/ui/characterFilters';
import { CustomLoader } from '../../../shared/widgets/loader';
import { styles } from './index.styles';
import { withBackground } from '../../../shared/hoc/withBackground';

function CharacterList() {
    const { characters, fetchCharacters, loading, setFilters, initialLoading } = useCharacter();

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, 'CharactersList'>>();

    const theme = useSelector((state: RootState) => state.theme.theme);
    const textColor = { color: theme === 'dark' ? '#fff' : '#000' };

    type SectionProps = {
        label?: string;
        value: string;
        style?: StyleProp<TextStyle>;
        numberOfLines?: number;
        ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    };
      
    const Section = ({ label, value, style, numberOfLines, ellipsizeMode }: SectionProps) => (
        <Text
            style={[style, textColor]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
        >
            {label ? `${label}: ` : ''}
            {value}
        </Text>
      );

    const renderItem = (
        { item }: { item: Character }, // character card
    ) => (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: theme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)' },
            ]}
            onPress={() => navigation.navigate('CharacterDetails', { character: item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Section value={item.name} style={styles.name} numberOfLines={1} ellipsizeMode="tail" />
                <Section value={item.status} style={styles.text} />
                <Section value={item.species} style={styles.text} />
            </View>
        </TouchableOpacity>
    );

    const renderFilters = useMemo(
        () => (
        // useMemo to avoid over-rendering
            <View style={{ padding: 10 }}>
                <CharacterFilters onSearch={setFilters} />
            </View>
        ),
        [setFilters],
    );

    if (initialLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader />
            </View>
        );
    }


    return (
        <FlatList
            data={characters}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => fetchCharacters(false)}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={renderFilters} // filters
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="tomato" /> : null}
        />
    );
}

export default withBackground(CharacterList);
