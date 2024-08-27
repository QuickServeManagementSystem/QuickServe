import {HubConnectionBuilder} from '@microsoft/signalr';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Tạo kết nối SignalR
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://quickserve-api.azurewebsites.net/hub')
      .build();

    setConnection(newConnection);

    // Bắt đầu kết nối
    newConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('SignalR Connection Error: ', err));

    // Đăng ký sự kiện nhận thông báo
    newConnection.on('ReceiveNotification', receivedMessage => {
      setMessage(receivedMessage);
      Alert.alert('Notification', receivedMessage);
    });

    // Dọn dẹp kết nối khi component bị hủy
    return () => {
      newConnection.stop().then(() => console.log('SignalR Disconnected'));
    };
  }, []);

  return (
    <View>
      <Text>Latest Message: {message}</Text>
    </View>
  );
};

export default SignalRComponent;
