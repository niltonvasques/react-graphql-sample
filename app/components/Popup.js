import { Platform, Alert } from 'react-native';

export const Popup = {
  show(text) {
    if (Platform.OS == 'android') {
      Alert.alert(text);
    } else if (Platform.OS == 'web') {
      alert(text);
    }
  }
}
