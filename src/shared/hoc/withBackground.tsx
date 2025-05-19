import React from 'react';
import { ImageBackground, ImageBackgroundProps } from 'react-native';

const backgroundSource = require('../assets/images/image.jpg');

export const withBackground =
  (
    WrappedComponent: React.ComponentType<any>,
    imageProps?: Partial<ImageBackgroundProps>
  ) => {
    const WithBackground = (props: any) => (
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={{ flex: 1 }}
        {...imageProps}
      > 
        <WrappedComponent {...props} />
      </ImageBackground>
    );

    WithBackground.displayName = `WithBackground(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    return WithBackground;
  };
