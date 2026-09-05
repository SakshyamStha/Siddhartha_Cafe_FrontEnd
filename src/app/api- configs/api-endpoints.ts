// import { environment } from '../../environments/environment.prod';

// export const API_ENDPOINTS = {
//   LOGIN: `${environment.apiUrl}v1/user/login`,

//   //   reservation

//   RESERVATION_ADD: `${environment.apiUrl}reservations/`,
// };


import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
  LOGIN: `${environment.apiUrl}v1/user/login`,

  MENU_LIST: `${environment.apiUrl}menu`,
  GALLERY_LIST: `${environment.apiUrl}gallery`,
  RESERVATION_ADD: `${environment.apiUrl}reservations`,
  CONTACT_ADD: `${environment.apiUrl}contact`,
};