import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import AppHeader from '@views/AppHeader';
import React from 'react';
import {ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const OrderPolicy = () => {
  const appTheme = useTheme();
  return (
    <Container>
      <Space vertical={scale(appTheme.gap_5)} />
      <AppHeader
        title="Chính sách đặt hàng"
        onPressIconLeft={() => {
          Navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{padding: 16}}>
        <Title>Chính Sách Đặt Hàng và Hoàn Tiền - QuickServe</Title>

        <SectionTitle>1. Chính Sách Hủy Đơn Hàng</SectionTitle>
        <SubSectionTitle>1.1. Đối với khách hàng đặt tại quầy:</SubSectionTitle>
        <TextItem>
          • Trước khi đơn hàng được chuẩn bị: Nếu đơn hàng của bạn đang ở trạng
          thái "Chờ thanh toán" hoặc "Đã thanh toán thành công" nhưng chưa bắt
          đầu vào quá trình "Đang chuẩn bị", bạn có thể yêu cầu hủy đơn hàng và
          sẽ được hoàn lại toàn bộ số tiền đã thanh toán.
        </TextItem>
        <TextItem>
          • Sau khi đơn hàng đã vào quá trình chuẩn bị hoặc đã hoàn thành: Đối
          với những đơn hàng đã chuyển sang trạng thái "Đang chuẩn bị" hoặc "Đã
          hoàn thành", chúng tôi rất tiếc rằng không thể hủy đơn hàng và không
          thể hoàn lại tiền do quá trình chuẩn bị món đã được thực hiện.
        </TextItem>

        <SubSectionTitle>
          1.2. Đối với khách hàng đặt trước (qua ứng dụng điện thoại):
        </SubSectionTitle>
        <TextItem>
          • Trước khi đơn hàng được chuẩn bị: Nếu đơn hàng của bạn đã thanh toán
          thành công nhưng chưa vào quá trình "Đang chuẩn bị", bạn hoàn toàn có
          thể hủy đơn hàng và sẽ được hoàn lại toàn bộ số tiền đã thanh toán.
        </TextItem>
        <TextItem>
          • Sau khi đơn hàng đã vào quá trình chuẩn bị hoặc đã hoàn thành: Một
          khi đơn hàng đã vào trạng thái "Đang chuẩn bị" hoặc "Đã hoàn thành",
          rất tiếc chúng tôi không thể hủy đơn hàng và không thể hoàn tiền.
        </TextItem>

        <SectionTitle>2. Chính Sách Hoàn Tiền</SectionTitle>
        <SubSectionTitle>2.1. Đối với khách hàng đặt tại quầy:</SubSectionTitle>
        <TextItem>
          • Khách hàng có thể trực tiếp đến cửa hàng nơi đã mua hàng, gặp nhân
          viên phục vụ và cung cấp hóa đơn mua hàng để yêu cầu hoàn tiền. Chúng
          tôi sẽ hỗ trợ nhanh chóng để đảm bảo bạn nhận lại số tiền đã thanh
          toán một cách thuận tiện.
        </TextItem>

        <SubSectionTitle>
          2.2. Đối với khách hàng đặt trước (qua ứng dụng điện thoại):
        </SubSectionTitle>
        <TextItem>
          • Hiện tại, hệ thống thanh toán online chưa hỗ trợ hoàn tiền trực
          tuyến. Để đảm bảo quyền lợi của bạn, vui lòng đến trực tiếp cửa hàng
          nơi đã đặt món, mang theo hóa đơn mua hàng và nhân viên của chúng tôi
          sẽ nhanh chóng hỗ trợ bạn hoàn tiền.
        </TextItem>

        <SectionTitle>Lời Cảm Ơn</SectionTitle>
        <TextItem>
          Chúng tôi hiểu rằng đôi khi việc thay đổi hoặc hủy đơn hàng là điều
          cần thiết. Tại QuickServe, chúng tôi luôn nỗ lực mang đến cho bạn sự
          linh hoạt và hỗ trợ tối đa trong mọi trường hợp. Dù bạn chọn đặt hàng
          tại quầy hay qua ứng dụng, đội ngũ nhân viên của chúng tôi luôn sẵn
          sàng lắng nghe và giúp đỡ bạn với tất cả sự chu đáo và tận tâm.
        </TextItem>
        <TextItem>
          Rất cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của QuickServe. Chúng
          tôi mong muốn tiếp tục mang đến những bữa ăn ngon và trải nghiệm tuyệt
          vời cho bạn trong tương lai!
        </TextItem>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const SubSectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const TextItem = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 21px;
`;

export default OrderPolicy;
