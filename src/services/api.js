import apiConfig from './config';
import { retrieveTokens, storeTokens, clearCredentials } from './storage';

let counter = 0;

const getHeaders = () => new Promise((resolve, reject) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  retrieveTokens().then((tokens) => {
    if (tokens && tokens.access_token) {
      resolve(Object.assign(defaultHeaders, {
        Authorization: `Bearer ${tokens.access_token}`,
      }));
    } else {
      resolve(defaultHeaders);
    }
  }).catch(reject);
});

const getObjectToUrlParams = obj => Object.keys(obj)
  .filter(key => obj[key] !== null)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  .join('&');

const refreshToken = () => new Promise((resolve, reject) => {
  retrieveTokens().then((tokens) => {
    if (tokens && tokens.refresh_token) {
      const request = {
        method: 'POST',
        url: '/auth/oauth/token',
        body: {
          grant_type: 'refresh_token',
          refresh_token: tokens.refresh_token,
          client_id: apiConfig.clientId,
          client_secret: apiConfig.clientSecret,
        },
      };
      apiFetch(request) // eslint-disable-line
        .then(response => response.body) // TODO: do something with response.headers if needed
        .then((body) => {
          storeTokens(body)
            .then(() => resolve(true))
            .catch(e => reject(e));
        }).catch(e => reject(e));
    } else {
      reject(new Error('No refresh token found'));
    }
  }).catch(e => reject(e));
});

const doFetch = (url, request) => new Promise((resolve, reject) => fetch(url, request)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  })
  .then((response) => {
    resolve({
      body: response.json(),
      headers: response.headers,
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.message === '401' && counter < 5) {
      counter += 1;
      refreshToken()
        .then((refreshed) => {
          counter = 0;
          return resolve({ message: refreshed ? 'token refreshed' : 'token not refreshed' });
        })
        .catch((_err) => {
          counter = 0;
          return reject(_err);
        });
    } else if (err.message === '401' && counter >= 5) {
      clearCredentials().then(() => {
        counter = 0;
        return reject(err);
      }).catch(reject);
    } else {
      console.log('Rejected');
      return reject(err);
    }
  }));

export const apiUtils = {
  getConfig: () => apiConfig
};

export const apiFetch = request => new Promise((resolve, reject) => {
  getHeaders().then((headers) => {
    const _request = {};
    let _url = `${apiConfig.serverUrl}/api${request.url}`;
    _request.method = request.method ? request.method.toUpperCase() : 'GET';
    if (_request.method === 'GET' || _request.method === 'HEAD') {
      _url = request.query || request.body ?
        `${_url}?${getObjectToUrlParams(Object.assign(request.body || {}, request.query || {}))}` :
        _url;
      _request.headers = headers;
    } else {
      _request.body = JSON.stringify(request.body || {});
      _request.headers = headers;
    }
    doFetch(_url, _request).then((result) => {
      if (result.message && result.message === 'token refreshed') {
        return apiFetch(request).then(resolve).catch(reject);
      }
      return resolve(result);
    }).catch(reject);
  }).catch(reject);
});
