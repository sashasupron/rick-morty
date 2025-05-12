import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Character } from '../model/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const URL = 'https://rickandmortyapi.com/api/character';

export const useCharacter = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{ status?: string; species?: string }>({});
    const [isOffline, setIsOffline] = useState(false);
    
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
            const updated = reset ? newCharacters : [...characters, ...newCharacters];
            setCharacters(updated);
            setPage(prev => reset ? 2 : prev + 1);
            setNextPage(!!response.data.info.next);

            if (reset) {
                await AsyncStorage.setItem('offlineCharacters', JSON.stringify(newCharacters.slice(0, 20)));
            }
            setIsOffline(false);

        } catch (error) {
            console.error('Please check your internet connection and try again', error);
            
            if (reset) {
                const offlineData = await AsyncStorage.getItem('offlineCharacters');
                if (offlineData) {
                    const parsed = JSON.parse(offlineData);
                    setCharacters(parsed);
                    setNextPage(false);
                    setIsOffline(true);
                }
            }
        } finally {
            setLoading(false);
        }
    }, [filters, loading, nextPage, page, characters]);



    useEffect(() => {
        const loadInitialData = async () => {
          try {
            await axios.get('https://rickandmortyapi.com/api'); // test request
            fetchCharacters(true); // online
        } catch {
            const offlineData = await AsyncStorage.getItem('offlineCharacters');
            if (offlineData) {
              const parsed = JSON.parse(offlineData) as Character[];
              setCharacters(parsed);
              setNextPage(false);
              setIsOffline(true);
            }
          }
        };
    
        loadInitialData();
    }, []);
    


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
        isOffline,
    };
};
