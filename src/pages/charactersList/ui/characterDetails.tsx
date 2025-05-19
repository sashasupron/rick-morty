import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { RootStackParamList } from '../../../entities/character/model/types';
import { styles } from './index.styles';
import { withBackground } from '../../../shared/hoc/withBackground';

type CharacterDetailsProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>; // component expects to get a character object from the route parameters

function CharacterDetails({ route }: CharacterDetailsProps) {
    const { character } = route.params;

    const theme = useSelector((state: RootState) => state.theme.theme);
    const textColor = { color: theme === 'dark' ? '#fff' : '#000' };
    const themeColor = { backgroundColor: theme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)' }

    const Section = ({
        label,
        value,
        url,
    }: {
        label: string;
        value: string;
        url?: string;
    }) =>
        url ? (
            <Pressable onPress={() => Linking.openURL(url)}>
                {({ pressed }) => (
                <Text
                    style={[
                        styles.descDetails,
                        textColor,
                        pressed && { color: 'gray' },
                    ]}
                >
                    {label}: {value}
                </Text>
                )}
            </Pressable>
        ) : (
            <Text style={[styles.descDetails, textColor]}>
                {label}: {value}
            </Text>
        );

    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
            <View style={[styles.cardDetails, themeColor]}>
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <Image source={{ uri: character.image }} style={styles.imageDetails} />
                </View>
                <Section label="Status" value={character.status} />
                <Section label="Species" value={character.species} />
                {character.type && <Section label="Type" value={character.type} />} 
                <Section label="Gender" value={character.gender} />
                {character.origin?.name && (
                    <Section label="Origin" value={character.origin.name} url={character.origin.url} />
                )}
                {character.location?.name && (
                    <Section label="Location" value={character.location.name} url={character.location.url} />
                )}
                {character.url && <Section label="URL" value={character.url} url={character.url} />}
                {character.episode?.length > 0 && ( /* Episodes Section */
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={[styles.descDetails, textColor]}>Episodes: </Text>
                        {character.episode.map((epUrl, index) => (
                        <Pressable key={epUrl} onPress={() => Linking.openURL(epUrl)}>
                            {({ pressed }) => (
                            <Text
                                style={[
                                styles.descDetails,
                                textColor,
                                { marginRight: 4 },
                                pressed && { color: 'gray' },
                                ]}
                            >
                                {index + 1}
                                {index !== character.episode.length - 1 ? ',' : ''}
                            </Text>
                            )}
                        </Pressable>
                        ))}
                    </View>
                )}

                <Section label="Created" value={character.created} />
            </View>
      </ScrollView>
    );
};

export default withBackground(CharacterDetails);
