export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    episode: string[];
    url: string;
    created: string;
}

export type RootStackParamList = {
    CharactersList: undefined;
    CharacterDetails: { character: Character };
};