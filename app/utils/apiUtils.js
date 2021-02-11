import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

console.log("da");
const { GITHUB_URL } = process.env;
const { ITUNES_URL } = process.env;

console.log(ITUNES_URL);

const apiClients = {
  github: null,
  itunes: null,
  default: null
};
export const getApiClient = (type = 'github') => apiClients[type];

export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(GITHUB_URL);
      console.log(apiClients[type]);
      return apiClients[type];
    case 'itunes':
      apiClients[type] = createApiClientWithTransForm(ITUNES_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(GITHUB_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  console.log(baseURL);
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
