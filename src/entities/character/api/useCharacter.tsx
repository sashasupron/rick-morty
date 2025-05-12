import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Character } from '../model/types';


const URL = 'https://rickandmortyapi.com/api/character';

export const useCharacter = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{ status?: string; species?: string }>({});
    
    const fetchCharacters = useCallback(async (reset = false) => {
        if (loading || !nextPage && !reset) return;

        setLoading(true);
        const pageToLoad = reset ? 1 : page;

        try {
            const response = await axios.get(URL, {
                params: {
                  page: pageToLoad,
                  ...filters,
                },
            });

            const newCharacters = response.data.results;
            setCharacters(prev => reset ? newCharacters : [...prev, ...newCharacters]);
            setPage(prev => reset ? 2 : prev + 1);
            setNextPage(!!response.data.info.next);
        } catch (error) {
            console.error('Error loading characters:', error);
        } finally {
            setLoading(false);
        }
    }, [filters, loading, nextPage, page]);

    

    useEffect(() => {
        setPage(1);
        setNextPage(true);
    }, [filters]);
    
    useEffect(() => {
        fetchCharacters(page === 1); 
    }, [page, filters, fetchCharacters]);

    return {
        characters,
        fetchCharacters,
        loading,
        nextPage,
        setFilters,
        filters,
    };
};
