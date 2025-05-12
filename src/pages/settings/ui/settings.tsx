import React from 'react';
import { View, Text, Switch, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, ThemeMode } from '../../../shared/model/theme/themeSlice';
import { RootState } from '../../../app/store';
import { styles } from './index.styles';


export const Settings = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.theme.theme);
    const isDark = currentTheme === 'dark';
  
    const toggleTheme = () => {
      const newTheme: ThemeMode = isDark ? 'light' : 'dark';
      dispatch(setTheme(newTheme));
    };

    return (
        <ImageBackground
            source = {require('../../../shared/assets/images/image.jpg')} 
            resizeMode = "cover" 
            style = {styles.imageBackground}
        >
            <View 
                style = {[
                    styles.container,
                    { backgroundColor: currentTheme === 'dark' ? 'rgba(3, 51, 9, 0.8)' : 'rgba(99, 255, 71, 0.8)'}
                ]}>
                <Text 
                    style = {[styles.label, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>Dark mode</Text>
                <Switch
                    value = {isDark}
                    onValueChange = {toggleTheme}
                    thumbColor = {isDark ? '#3e473f' : '#d7e0d9'}
                    trackColor = {{ false: '#717872', true: '#d7e0d9' }}
                />
            </View>
        </ImageBackground>
    );
};
