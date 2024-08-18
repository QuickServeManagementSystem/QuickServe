import {useAppDispatch} from '@app-core/state';
import {userLoginAction} from '@app-core/state/auth/reducer';
// import {userLoginAction} from '@app-core/state/auth/reducer';
import {en} from '@assets/text_constant';
import {FormTextInput} from '@components/Form/Input';
import {FormItemProps} from '@components/Form/Item';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import EventInstance from '@utils/eventInstance/eventInstance';
import {EventType} from '@utils/eventInstance/type';
// import EventInstance from '@utils/eventInstance/eventInstance';
// import {EventType} from '@utils/eventInstance/type';
import {AppButton} from '@views/AppButton';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

export type FormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {handleSubmit, control} = useForm<FormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [hiddentText, setHiddenText] = useState(true);
  const appTheme = useTheme();
  const [error, setError] = useState('');

  useEffect(() => {
    const event = EventInstance.addEventListener(
      EventType.LOGIN_FAIL,
      ({_error}) => {
        setError(_error);
      },
    );
    const eventLoading = EventInstance.addEventListener(
      EventType.LOADING,
      ({_loading}) => {
        setLoading(_loading);
      },
    );
    return () => {
      event.remove();
      eventLoading.remove();
    };
  }, [loading]);

  const handleLogin = (data: FormInput) => {
    setLoading(true);
    dispatch(userLoginAction(data));
  };

  const containerStyle: FormItemProps['containerStyle'] = {};

  const formInputStyle: FormItemProps['containerStyle'] = {
    borderWidth: 1,
    padding: 10,
    backgroundColor: appTheme.colors.white,
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={true}
        enableAutomaticScroll={true}
        enableOnAndroid
        extraScrollHeight={appTheme.gap_24}>
        <Content>
          <WrapHeader>
            <AppIcon
              name="ic_quickserve"
              width={215}
              height={42}
              fill={appTheme.colors.primary}
            />
          </WrapHeader>
          <FormContent>
            {error && (
              <ContainerError>
                <AppTextSupportColor
                  color={appTheme.colors.error}
                  variant="regular_14">
                  {error}
                </AppTextSupportColor>
                <AppIcon
                  name="ic_error_circle"
                  fill_color={appTheme.colors.error}
                  width={appTheme.gap_24}
                  height={appTheme.gap_24}
                />
              </ContainerError>
            )}
            <FormInput>
              <FormTextInput
                label={en.login.email}
                fullWidth
                placeholder={en.login.email}
                placeholderTextColor={appTheme.colors.text_input_primary}
                itemContainerStyle={containerStyle}
                containerStyle={formInputStyle}
                control={control}
                name="email"
                autoCorrect={false}
                textContentType="none"
                autoComplete="off"
                onExtraChange={() => {
                  setError('');
                }}
                isRequired
                rules={{required: en.error.requireEmail}}
              />
              <FormTextInput
                label={en.login.password}
                fullWidth
                secureTextEntry={hiddentText}
                placeholder={en.login.password}
                placeholderTextColor={appTheme.colors.text_input_primary}
                itemContainerStyle={containerStyle}
                containerStyle={formInputStyle}
                iconRight={hiddentText ? 'ic_eye_close' : 'ic_eye_open'}
                iconRightProps={{
                  fill_color: appTheme.colors.background,
                  onPress: () => {
                    setHiddenText(!hiddentText);
                  },
                }}
                onExtraChange={() => {
                  setError('');
                }}
                control={control}
                name="password"
                isRequired
                rules={{required: en.error.requirePassword}}
              />
            </FormInput>
            <ButtonSubmit
              loading={loading}
              disabled={loading}
              borderRadius={appTheme.border_radius_4}
              onPress={handleSubmit(handleLogin)}
              backgroundColor={appTheme.colors.primary}
              title="Login"
              variant="semibold_14"
            />
            <Space vertical={scale(appTheme.gap_5)} />
            <AppTouchable>
              <TextBackStyled
                onPress={() => Navigation.goBack()}
                variant="regular_14">
                {en.login.backIndex}
              </TextBackStyled>
            </AppTouchable>
          </FormContent>
        </Content>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const TextBackStyled = styled(AppText)`
  text-decoration: underline;
`;
const ContainerError = styled.View`
  background-color: ${props => props.theme.colors.error}${props => props.theme.alpha_025};
  margin-top: ${props => props.theme.gap_26}px;
  padding: ${props => props.theme.gap_12}px ${props => props.theme.gap_16}px;
  border-radius: ${props => props.theme.gap_4}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props =>
    props.theme.colors.primary + props.theme.alpha_008};
  padding-top: ${props => props.theme.gap_130}px;
`;

const FormContent = styled.View`
  margin: ${props => props.theme.gap_0}px ${props => props.theme.gap_17}px;
`;

const FormInput = styled.View`
  margin-top: ${props => props.theme.gap_25}px;
`;

const Content = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const ButtonSubmit = styled(AppButton)`
  margin-top: ${props => props.theme.gap_12}px;
  padding: ${props => props.theme.gap_0}px ${props => props.theme.gap_16}px;
`;

const WrapHeader = styled.View`
  align-self: center;
`;
export default SignIn;
