import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './index.styles';

const CustomLoader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ff6347" />
            <Text style={styles.loaderText}>Rick is looking for Morty in multiuniverse...</Text>
        </View>
    );
};

export default CustomLoader;
