import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getProfileAction,
  selectedProfileStore,
} from '@app-core/state/profile/reducer';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {AppButton} from '@views/AppButton';
import AppHeader from '@views/AppHeader';
import {AppText} from '@views/AppText';
import React, {useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';

const Profile = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectedProfileStore);

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const getFallbackValue = (value: string | undefined) =>
    value || 'Chưa cập nhật';

  const getRolesLabel = (roles: any) => {
    switch (roles) {
      case 'Customer':
        return 'Khách hàng';
      default:
        return 'Chưa cập nhập';
    }
  };
  return (
    <Container>
      <AppHeader
        title="Thông tin cá nhân"
        onPressIconLeft={() => {
          Navigation.goBack();
        }}
      />
      <Header>
        <ProfileImage source={{uri: profileData?.avatar}} />
        <UserInfo>
          <AppText variant="bold_24">
            {getFallbackValue(profileData?.name)}
          </AppText>
          <AppText variant="regular_16">
            {getFallbackValue(profileData?.email)}
          </AppText>
        </UserInfo>
      </Header>
      <Section>
        <AppText variant="bold_20">Thông tin thêm</AppText>
        <InfoItem>
          <Label variant="regular_16">Số điện thoại:</Label>
          <Value variant="regular_16">
            {getFallbackValue(profileData?.phone)}
          </Value>
        </InfoItem>
        <InfoItem>
          <Label variant="regular_16">Địa chỉ:</Label>
          <Value variant="regular_16">
            {getFallbackValue(profileData?.address)}
          </Value>
        </InfoItem>
        <InfoItem>
          <Label variant="regular_16">Vai trò:</Label>
          <Value variant="regular_16">
            {getFallbackValue(getRolesLabel(profileData?.roles))}
          </Value>
        </InfoItem>
      </Section>
      {/* <ButtonContainer>
        <AppButton
          title="Chỉnh sửa profile"
          backgroundColor={appTheme.colors.button_background_secondary}
          textColor={appTheme.colors.white}
          variant="regular_16"
        />
        <AppButton
          title="Change Password"
          backgroundColor={appTheme.colors.button_background_secondary}
          textColor={appTheme.colors.white}
          variant="regular_16"
        />
      </ButtonContainer> */}
    </Container>
  );
};
const Container = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.gap_24}px;
  margin-left: ${props => props.theme.gap_24}px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.colors.background_overlay};
`;

const UserInfo = styled.View`
  margin-left: ${props => props.theme.gap_16}px;
`;

const Section = styled.View`
  margin-bottom: ${props => props.theme.gap_24}px;
  margin-left: ${props => props.theme.gap_24}px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.gap_8}px;
`;

const Label = styled(AppText)`
  flex: 1;
  color: ${({theme}) => theme.colors.text_secondary};
`;

const Value = styled(AppText)`
  flex: 2;
  color: ${({theme}) => theme.colors.text_primary};
`;

const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.gap_32}px;
  display: flex;
  justify-content: space-between;
`;

export default Profile;
