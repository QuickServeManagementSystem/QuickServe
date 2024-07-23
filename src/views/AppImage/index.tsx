import React, {memo} from 'react';
import {StyleSheet, Platform} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import styled from 'styled-components/native';

const ImageContainer = styled.View`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const PlaceHolderImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const options = {
  priority: FastImage.priority.high,
  cache:
    Platform.OS === 'ios'
      ? FastImage.cacheControl.immutable
      : FastImage.cacheControl.web,
};

const cacheOptions = {
  priority: FastImage.priority.high,
  cache: FastImage.cacheControl.immutable,
};

interface Props {
  source?: number | Source;
  style?: any;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  visible?: boolean;
  isCache?: boolean;
  placeholderImg?: any;
  enablePreview?: boolean;
  isPortrait?: boolean;
  children?: any;
}
const AppImage: React.FC<Props> = ({
  source,
  resizeMode = 'cover',
  isCache = false,
  placeholderImg,
  children,
  ...otherProps
}) => {
  return (
    <ImageContainer {...otherProps}>
      {source ? (
        source && (source as any).uri && (source as any).uri.includes('svg') ? (
          <SvgUri width="100%" height="100%" uri={(source as any).uri} />
        ) : (
          <FastImage
            source={
              isCache
                ? Object.assign({}, source, cacheOptions)
                : Object.assign({}, source, options)
            }
            style={[StyleSheet.absoluteFill]}
            resizeMode={resizeMode}
          />
        )
      ) : (
        <PlaceHolderImage
          resizeMode={resizeMode}
          source={placeholderImg}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </ImageContainer>
  );
};

export default memo(AppImage);
