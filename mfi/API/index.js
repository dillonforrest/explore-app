import { ping } from 'lambdagrid-mfi';

function mainServer() {
  return ping('EnvironmentVariables', 'get', 'main api server domain');
}

function dispatchRequest(url, query) {
  return ping('API', 'send http request', url);
}

function dailyData() {
  return dispatchRequest('GET', {
    hostname: mainServer(),
    pathname: '/daily'
  });
}

function hourlyData() {
  return dispatchRequest('GET', {
    hostname: mainServer(),
    pathname: '/hourly',
  });
}

function filters() {
  return dispatchRequest('GET', {
    hostname: mainServer(),
    pathname: '/filters',
  });
}

function filterData({ filters, dailyOrHourly }) {
  return dispatchRequest('GET', {
    hostname: mainServer(),
    pathname: `/${dailyOrHourly}`,
    query: { filters },
  });
}

ping('API', 'add requests', {
  'get daily data': dailyData,
  'get hourly data': hourlyData,
  'get filters': filters,
  'filter data': filterData,
});
