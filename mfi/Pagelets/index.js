import { ping } from 'lambdagrid-mfi';

const Filters = ping('Pagelets', 'create pagelet', {
  view: ping('ReactViews', 'get view', 'Checkboxes'),
  readers: () => ['filters'],
  fetchingViews: {
    'filters': ping('ReactViews', 'get view', 'FetchingCheckboxes'),
  },
  transform: state => ({
    filters: state.get('filters'),
    filterData: ping('AppState', 'write', 'filter data'),
    toggleFilter: ping('AppState', 'write', 'toggle filter'),
  }),
});

const Chart = ping('Pagelets', 'create pagelet', {
  view: ping('ReactViews', 'get view', 'Chart'),
  readers: state => state.get('currentChart') === 'daily' ? ['daily data'] : ['hourly data'],
  fetchingViews: {
    'daily data': ping('ReactViews', 'get view', 'FetchingChart'),
    'hourly data': ping('ReactViews', 'get view', 'FetchingChart'),
  },
  transform: state => ({
    xAxisLabels: state.get(state.get('currentChart')).map(row => row.get('label')),
    datasetLabel: state.get('currentChart'),
    data: state.get(state.get('currentChart')).map(row => row.get('value')),
    onDataClick: ping('AppState', 'write', 'pick hourly'),
    isFetching: state.hasIn(['readers fetching', `${state.get('currentChart')} data`]),
  }),
});

ping('Pagelets', 'add pagelets', {
  Filters,
  Chart,
});
