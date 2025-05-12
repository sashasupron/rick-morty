export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
}

export type RootStackParamList = {
    CharactersList: undefined;
    CharacterDetails: { character: Character };
};