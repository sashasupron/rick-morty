import {
    DarkTheme as NavigationDark,
    DefaultTheme as NavigationLight,
    Theme,
} from '@react-navigation/native';

export const CustomDarkTheme: Theme = {
    ...NavigationDark,
    colors: {
        ...NavigationDark.colors,
        card: '#0f120f',
        primary: '#6ee66e',
    },
};

export const CustomLightTheme: Theme = {
    ...NavigationLight,
    colors: {
        ...NavigationLight.colors,
        card: '#fff',
        primary: '#083b08',
    },
};
