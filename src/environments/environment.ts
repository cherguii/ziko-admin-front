import { settings } from './settings';
import npm from '../../package.json';

export const environment = {
  production: false,
  appSettings: settings,
  googleMapApiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE',
  frontBaseUrl: 'https://ziko-front.web.app',
  frontDetailPageUrl: 'https://ziko-front.web.app/article/detail',
  firebase: {
    apiKey: "AIzaSyBXBROwyD9_MCNYJ92wIcvN5NlALxwecXk",
    authDomain: "ziko-database-5a4c3.firebaseapp.com",
    projectId: "ziko-database-5a4c3",
    storageBucket: "ziko-database-5a4c3.appspot.com",
    messagingSenderId: "694028295708",
    appId: "1:694028295708:web:3b56fa9f0fb2769a7689d9"
  },
  version: npm.version
};
