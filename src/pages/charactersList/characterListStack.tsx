import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterList from './ui/charactersList';
import CharacterDetails from './ui/characterDetails';
import { Character } from '../../entities/character/model/types'; 

type RootStackParamList = {
    CharactersList: undefined;
    CharacterDetails: { character: Character };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const CharactersListStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name = "CharactersList" 
            component = {CharacterList} 
            options = {{ title: 'Characters' }} />
        <Stack.Screen
            name = "CharacterDetails"
            component = {CharacterDetails}
            options = {({ route }) => ({ title: route.params.character.name })}
        />
    </Stack.Navigator>
);


