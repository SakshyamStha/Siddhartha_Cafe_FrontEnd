import { environment } from '../../environments/environment.prod';

export const API_ENDPOINTS = {
  LOGIN: `${environment.apiUrl}v1/user/login`,

  //   reservation

  RESERVATION_ADD: `${environment.apiUrl}reservations/`,
};
