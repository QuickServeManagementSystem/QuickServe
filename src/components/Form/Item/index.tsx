import {isNull} from '@utils/common';
import {AppText} from '@views/AppText';
import React from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

export interface FormItemProps {
  containerStyle?: ViewProps['style'];
  itemProps?: any;
  isRequired?: boolean;
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const Container = styled.View`
  margin-bottom: 0px;
`;

const StyledErrorText = styled(AppText)`
  color: ${props => props.theme.colors.error};
`;

const StyledLabelContainer = styled.View``;

const StyledLabel = styled(AppText)<{isError?: boolean}>`
  color: ${props =>
    props.isError ? props.theme.colors.error : props.theme.colors.text_primary};
`;

const StyledRequiredText = styled(AppText)`
  color: ${props => props.theme.colors.error};
`;

export const FormItem: React.FC<FormItemProps> = ({
  containerStyle,
  label,
  error,
  isRequired,
  ...rest
}) => {
  // Use the HOC to wrap your FormItem component
  const newChildren = React.Children.map(rest.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, rest.itemProps);
    }
    return child;
  });

  return (
    <Container style={containerStyle}>
      <StyledLabelContainer>
        {label && (
          <StyledLabel variant="regular_14" isError={!isNull(error)}>
            {label}
            {isRequired && (
              <StyledRequiredText variant="bold_14">*</StyledRequiredText>
            )}
          </StyledLabel>
        )}
      </StyledLabelContainer>
      {newChildren}
      {error && <StyledErrorText variant="regular_14">{error}</StyledErrorText>}
    </Container>
  );
};
