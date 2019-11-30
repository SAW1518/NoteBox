//@flow
import Config from 'react-native-config';
import {AsyncStorage, NetInfo} from 'react-native';
const HORARIO = 'HORARIO';
const USER_PROFILE = 'USER_PROFILE';
const LISTDATE = 'LISTDATE';

type CacheType = {
  getApiUrl: () => string,
  setHorario: any => void,
  getHORARIO: () => Promise<string>,
  setUserProfile: any => void,
  getUserProfile: () => Promise<string>,
  delUser: () => void,
  removeAll: any => void,
  setList: any => void,
  getList: () => Promise<string>,
};

const CacheUtil: CacheType = {
  getApiUrl: (): string => Config.API_URL,

  setList: (NewItemList: string) => {
    //console.log('SetList', NewItemList);
    return AsyncStorage.setItem(LISTDATE, NewItemList.toString());
  },

  getList: async (): Promise<string> => {
    return await AsyncStorage.getItem(LISTDATE);
  },

  setHorario: (H: string) => {
    console.log('Horario Seted', H);
    return AsyncStorage.setItem(HORARIO, H.toString());
  },

  getHORARIO: async (): Promise<string> => {
    return await AsyncStorage.getItem(HORARIO);
  },

  setUserProfile: (userProfile: string) => {
    return AsyncStorage.setItem(USER_PROFILE, userProfile.toString());
  },

  getUserProfile: async (): Promise<string> => {
    return await AsyncStorage.getItem(USER_PROFILE);
  },

  removeAll: callback => {
    return AsyncStorage.clear(callback);
  },
};

export default CacheUtil;
