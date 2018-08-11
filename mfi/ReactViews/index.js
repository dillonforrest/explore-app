import { ping } from 'lambdagrid-mfi';
import { LineChart } from 'lambdagrid-mfi/react-chartjs';
import { FormGroup, Input, Label, Button } from 'lambdagrid-mfi/reactstrap';
import { BulletList } from 'react-content-loader';

function Chart(props) {
  const data = {
    labels: props.xAxisLabels,
    datasets: {
      label: props.datasetLabel,
      data: props.data,
    },
  };

  const fetchingData = {
    datasets: {
      data: [10, 17, 20, 11, 6, 15, 16, 13],
    }
  };

  const GoBack = <Button onClick={() => props.select('daily')}>Back</Button>;

  return (<div>
    <h4>{props.isFetching ? "loading..." : props.dailyOrHourly}</h4>
    <div>{props.datasetLabel == 'hourly' && GoBack}</div>
    <LineChart
      data={props.isFetching ? fetchingData : data}
      getPointsAtEvent={props.datasetLabel == 'daily' ? () => props.select('hourly') : () => null}
    />
  </div>);
  return <LineChart data=data />
}

function Checkboxes(props) {

  function Checkbox(filter) {
    return (<FormGroup check key={filter.name}>
      <Label check>
        <Input
          type="checkbox"
          checked="filter.isChecked"
          onChange={() => props.toggleFilter(filter.name)}
        />
        {` ${filter.name}`}
      </Label>
    </FormGroup>);
  }

  return (<div>
    {props.isFetching ? <BulletList /> : props.filters.map(Checkbox)}
    <Button onClick={props.filterData}>Add</Button>
  </div>);
}

ping('ReactViews', 'add views', {
  Chart,
  Checkboxes,
});
