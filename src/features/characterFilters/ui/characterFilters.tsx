import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { styles } from './index.styles';

type Props = {
  onSearch: (filters: { status: string; species: string }) => void;
};

export const CharacterFilters = ({ onSearch }: Props) => {
    const [statusOpen, setStatusOpen] = useState(false); // is dropdown open
    const [speciesOpen, setSpeciesOpen] = useState(false);

    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');

    const [statusItems, setStatusItems] = useState([
        { label: 'All', value: '' },
        { label: 'Alive', value: 'alive' },
        { label: 'Dead', value: 'dead' },
        { label: 'Unknown', value: 'unknown' },
    ]);

    const [speciesItems, setSpeciesItems] = useState([
        { label: 'All', value: '' },
        { label: 'Human', value: 'human' },
        { label: 'Alien', value: 'alien' },
    ]);

    const handleSearch = () => {
        onSearch({ status, species });
    };

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <View
            style={[
                styles.filters,
                { backgroundColor: theme === 'dark' ? 'rgba(45, 7, 52, 0.8)' : 'rgba(170, 8, 199, 0.8)' },
            ]}
        >
        <Text style={styles.description}>Status:</Text>
        <DropDownPicker
            open={statusOpen}
            value={status}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={setStatus}
            setItems={setStatusItems}
            placeholder="Select status"
            containerStyle={{ marginBottom: statusOpen ? 180 : 5 }}
            onOpen={() => setSpeciesOpen(false)}
        />

        <Text style={styles.description}>Species:</Text>
        <DropDownPicker
            open={speciesOpen}
            value={species}
            items={speciesItems}
            setOpen={setSpeciesOpen}
            setValue={setSpecies}
            setItems={setSpeciesItems}
            placeholder="Select species"
            containerStyle={{ marginBottom: speciesOpen ? 130 : 5 }}
            onOpen={() => setStatusOpen(false)}
        />

        <View style={styles.button}>
            <TouchableOpacity>
                <Button title="Search" color="black" onPress={handleSearch} />
            </TouchableOpacity>
        </View>
    </View>
  );
};
