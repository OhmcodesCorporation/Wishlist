const HOST = 'http://127.0.0.1:8000/api';

const API_URLS = {
  authentication_url : HOST + '/token/auth/',
  verify_token_url : HOST + '/token/verify/',
  refresh_token_url : HOST + '/token/refresh/',
  post_new_event_url : HOST + '/events/',
  get_all_events_url : HOST + '/events/',
  delete_event_url: HOST + '/events/',
  register_user_url: HOST + '/register/',
}
export default API_URLS;
