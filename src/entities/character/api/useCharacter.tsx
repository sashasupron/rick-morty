import { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../model/types';


const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const useCharacter = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(true);
    const [loading, setLoading] = useState(false);


    const fetchCharacters = async () => {
        if (loading || !nextPage) return;

        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}?page=${page}`);
            setCharacters(prev => [...prev, ...response.data.results]);
            setPage(prev => prev + 1);
            setNextPage(!!response.data.info.next);
        } catch (error) {
            console.error('Error loading characters:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    });

    return {
        characters,
        fetchCharacters,
        loading,
        nextPage,
    };
};
