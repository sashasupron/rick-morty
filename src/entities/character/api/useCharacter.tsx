// characters from API Rick and Morty
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Character } from '../model/types';

const URL = 'https://rickandmortyapi.com/api/character';

export const useCharacter = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1); // current page
    const [nextPage, setNextPage] = useState(true); // is next page exists
    const [initialLoading, setInitialLoading] = useState(true); // only initial loading
    const [loading, setLoading] = useState(false); // for pagination and filters
    const [filters, setFilters] = useState<{ status?: string; species?: string }>({});
    const [isOffline, setIsOffline] = useState(false);

    const fetchCharacters = useCallback(
        async (reset = false) => {
        // fetching characters from API
            if (loading || (!nextPage && !reset)) return; // If it's already loading or there is no next page and it's not a reset - exit

            if (!reset) setLoading(true);

            setLoading(true);
            const pageToLoad = reset ? 1 : page; // if reset = true, first page, else current page

            try {
                const response = await axios.get(URL, {
                params: {
                    page: pageToLoad,
                    ...filters,
            },
            });

            const newCharacters = response.data.results;
            const updated = reset ? newCharacters : [...characters, ...newCharacters]; // if reset, replacing current list, else adding new characters to existed
            setCharacters(updated);
            setPage((prev) => (reset ? 2 : prev + 1));
            setNextPage(!!response.data.info.next);

            if (reset) {
                await AsyncStorage.setItem(
                    'offlineCharacters',
                    JSON.stringify(newCharacters.slice(0, 20)),
                ); // if reset = true, saves 20 loaded characters to local storage
            }
    
            setIsOffline(false);
            } catch (error) {
                console.error('Please check your internet connection and try again', error);

                if (reset) {
                    const offlineData = await AsyncStorage.getItem('offlineCharacters'); // trying to fetch offline data
                    if (offlineData) {
                        const parsed = JSON.parse(offlineData); // converts a string from storage back to array of characters
                        setCharacters(parsed);
                        setNextPage(false);
                        setIsOffline(true);
                    }
                }
            } finally {
                setLoading(false);
            }
    },[filters, loading, nextPage, page, characters]);

    useEffect(() => {
        const loadInitialData = async () => {
            setInitialLoading(true);
            try {
                await axios.get('https://rickandmortyapi.com/api'); // test request
                fetchCharacters(true); // online
                setInitialLoading(false);
            } catch {
                const offlineData = await AsyncStorage.getItem('offlineCharacters');

                if (offlineData) {
                    const parsed = JSON.parse(offlineData) as Character[];
                    setCharacters(parsed);
                    setNextPage(false);
                    setIsOffline(true);
                }
                
                setInitialLoading(false);
            } finally {
                setInitialLoading(false);
            }};
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
        initialLoading
    };
};
