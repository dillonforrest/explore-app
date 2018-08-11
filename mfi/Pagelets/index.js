import { ping } from 'lambdagrid-mfi';

const Filters = ping('Pagelets', 'create pagelet', {
  view: ping('ReactViews', 'get view', 'Checkboxes'),
  readers: () => ['filters']
  transform: state => ({
    filters: state.get('filters'),
    filterData: ping('AppState', 'write', 'filter data'),
    toggleFilter: ping('AppState', 'write', 'toggle filter'),
  }),
});

const Chart = ping('Pagelets', 'create pagelet', {
  view: ping('ReactViews', 'get view', 'Chart'),
  readers: state => state.get('currentChart') === 'daily' ? ['daily data'] : ['hourly data'],
  transform: state => ({
    xAxislabels: state.get(state.get('currentChart')).map(row => row.get('label')),
    datasetLabel: state.get('currentChart'),
    data: state.get(state.get('currentChart')).map(row => row.get('value')),
  }),
});

ping('Pagelets', 'add pagelets', {
  Filters,
  Chart,
});
