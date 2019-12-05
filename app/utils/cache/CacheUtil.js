//@flow
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
const HORARIO = 'HORARIO';
const INITIAL = 'INITIAL';
const USER_PROFILE = 'USER_PROFILE';
const LISTDATE = 'LISTDATE';

type CacheType = {
  getApiUrl: () => string,
  setHorario: any => void,
  setInitial: any => void,
  delteListItem: any => void,
  getHORARIO: () => Promise<string>,
  getInitial: () => Promise<string>,
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
  setInitial: (I: string) => {
    console.log('Initial in', I);
    return AsyncStorage.setItem(INITIAL, I.toString());
  },

  delteListItem: (id: number) => {
    let newlist = [];
    CacheUtil.getList().then(List => {
      let list = JSON.parse(List);
      list.map(item => {
        if (item.id != id) {
          newlist.push(item);
          console.log('push', item);
        } else {
          console.log('eliminado', item);
        }
      });
    });
    console.log('newitem', newlist);
    CacheUtil.setList(JSON.stringify(newlist));
  },

  getHORARIO: async (): Promise<string> => {
    return await AsyncStorage.getItem(HORARIO);
  },
  getInitial: async (): Promise<string> => {
    return await AsyncStorage.getItem(INITIAL);
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
