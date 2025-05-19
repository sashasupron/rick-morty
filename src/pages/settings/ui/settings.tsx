import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { setTheme, ThemeMode } from '../../../shared/model/theme/themeSlice';
import { styles } from './index.styles';
import { withBackground } from '../../../shared/hoc/withBackground';

function Settings () {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.theme.theme);
    const isDark = currentTheme === 'dark';

    const toggleTheme = () => {
        // defining of current theme
        const newTheme: ThemeMode = isDark ? 'light' : 'dark';
        dispatch(setTheme(newTheme));
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                    currentTheme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)',
                },
            ]}
        >
            <Text style={[styles.label, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>
                Dark mode
            </Text>

            <Switch
                value={isDark}
                onValueChange={toggleTheme}
                thumbColor={isDark ? '#3e473f' : '#d7e0d9'}
                trackColor={{ false: '#717872', true: '#d7e0d9' }}
            />
        </View>
    );
};

export default withBackground(Settings);
