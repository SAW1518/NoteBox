import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
export const validateEmail = (email): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateFormatPassword = (str): boolean => {
  if (hasLowerCase(str)) {
    if (hasUpperCase(str)) {
      if (hasNumber(str)) {
        if (containCharacter(str)) {
          return lengthCharacters(str);
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const hasLowerCase = (str): boolean => {
  return str.toUpperCase() !== str;
};
const hasUpperCase = (str): boolean => {
  return str.toLowerCase() !== str;
};
const hasNumber = (str): boolean => {
  return /\d/.test(str);
};

const containCharacter = (str): boolean => {
  let character = /[ -.!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return character.test(str);
};
const lengthCharacters = (str): boolean => {
  return str.length > 7;
};
const getMonth = Data => {
  let month = Data.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
};

export const SharePdf64 = (Pdf64, type) => {
  const shareOptions = {
    title: 'Share file',
    url: 'data:' + type + ';base64,' + Pdf64,
  };
  Share.open(shareOptions).then(r => console.log('responnse', r));
};
export const monthMonthDate = date => {
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCU',
    'NOV',
    'DIC',
  ];
  const newFormattedDate = months[date.getMonth()];
  return newFormattedDate;
};
export const monthDayYearDate = date => {
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCU',
    'NOV',
    'DIC',
  ];
  const newFormattedDate =
    date.getUTCDate() +
    '/' +
    months[date.getMonth()] +
    '/' +
    date.getFullYear();
  return newFormattedDate;
};

export const monthDayYearHoraDateSlideFormat = date => {
  let dateH = date.getHours();
  let dateM = date.getMinutes();
  let dateS = date.getSeconds();
  let month = date.getMonth();
  let day = date.getUTCDate();
  if (String(month).length == 1) {
    month = '0' + month;
  }
  if (String(day).length != 1) {
  } else {
    day = '0' + day;
  }
  const newFormattedDate =
    +day + '/' + month + '/' + date.getFullYear() + ' ' + dateH + ':' + dateM;
  return newFormattedDate.toString();
};

export const change24Hours = times => {
  console.log(times);
  /* let timeString = time;
   let H = +timeString.substr(0, 2);
   let h = H % 12 || 12;
   let ampm = (H < 12 || H === 24) ? " AM" : " PM";
   return timeString = h + timeString.substr(2, 3)+ ampm;*/
  let ts = times;
  const H = +ts.substr(0, 2);
  let h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  const ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
};
