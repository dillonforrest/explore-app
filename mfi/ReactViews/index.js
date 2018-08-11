import { ping } from 'lambdagrid-mfi';
import { LineChart } from 'lambdagrid-mfi/react-chartjs';
import { FormGroup, Input, Label, Button } from 'lambdagrid-mfi/reactstrap';

function Chart(props) {
  const data = {
    labels: props.xAxislabels,
    datasets: {
      label: props.datasetLabel,
      data: props.data,
    },
  };

  const GoBack = <Button onClick={() => props.select('daily')}>Back</Button>;

  return (<div>
    <h4>{props.dailyOrHourly}</h4>
    <div>{props.datasetLabel == 'hourly' && GoBack}</div>
    <LineChart
      data={data}
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
    {props.filters.map(Checkbox)}
    <Button onClick={props.filterData}>Add</Button>
  </div>);
}

ping('ReactViews', 'add views', {
  Chart,
  Checkboxes,
});
