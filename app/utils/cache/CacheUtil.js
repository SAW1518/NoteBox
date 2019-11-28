//@flow
import Config from 'react-native-config';

import AsyncStorage from '@react-native-community/async-storage';
const HORARIO = 'HORARIO';
const USER_PROFILE = 'USER_PROFILE';
const REFRESHTOKEN = 'REFRESHTOKEN';

type CacheType = {
  getApiUrl: () => string,
  setHorario: any => void,
  getHORARIO: () => Promise<string>,
  setUserProfile: any => void,
  getUserProfile: () => Promise<string>,
  delUser: () => void,
  removeAll: any => void,
  setRToken: any => void,
  getRToken: () => Promise<string>,
};

const CacheUtil: CacheType = {
  getApiUrl: (): string => Config.API_URL,

  setRToken: (RToken: string) => {
    console.log('REFRESHTOKEN CACHE SETED', RToken);
    return AsyncStorage.setItem(REFRESHTOKEN, RToken);
  },
  setHorario: (H: string) => {
    console.log('Horario Seted', H);
    return AsyncStorage.setItem(HORARIO, H.toString());
  },

  getHORARIO: async (): Promise<string> => {
    return await AsyncStorage.getItem(HORARIO);
  },

  getRToken: async (): Promise<string> => {
    return await AsyncStorage.getItem(REFRESHTOKEN);
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
