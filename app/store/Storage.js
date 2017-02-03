import { AsyncStorage, Platform } from 'react-native';

class Storage {
  getItem(item, callback) {
    if (Platform.OS == 'android') {
      AsyncStorage.getItem(item).then((value) => {
        callback(value);
      }).done();
    } else if (Platform.OS == 'web') {
      callback(localStorage.getItem(item));
    }
  }

  setItem(item, value) {
    if (Platform.OS == 'android') {
      AsyncStorage.setItem(item, value);
    } else if (Platform.OS == 'web') {
      localStorage.setItem(item, value);
    }
  }
}

export const storage = new Storage();
