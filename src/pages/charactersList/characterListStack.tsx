// defines stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Character } from '../../entities/character/model/types';
import CharacterDetails from './ui/characterDetails';
import CharacterList from './ui/charactersList';

type RootStackParamList = {
    //typification of screen parameters passed through navigation.navigate(...)
    CharactersList: undefined; // requires no parameters
    CharacterDetails: { character: Character }; // requires a character object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const CharactersListStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="CharactersList"
            component={CharacterList}
            options={{ title: 'Characters' }}
        />
        <Stack.Screen
            name="CharacterDetails"
            component={CharacterDetails}
            options={({ route }) => ({ title: route.params.character.name })} //  characterDetails header is taken from the character's name
        />
    </Stack.Navigator>
);
