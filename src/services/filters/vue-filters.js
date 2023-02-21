import Vue from 'Vue';
import { lstring } from './lstring';

Vue.filter('capitalize'         , val=>val.toUpperCase());
Vue.filter('encodeURIComponent' , encodeURIComponent);
Vue.filter('encodeURI'          , encodeURI);
Vue.filter('lstring'            , lstring)