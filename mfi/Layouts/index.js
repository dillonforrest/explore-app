import { ping } from 'lambdagrid-mfi';

function Main() {
  return (<div>
    {ping('Pagelets', 'get pagelet', 'Filters')}
    {ping('Pagelets', 'get pagelet', 'Chart')}
  </div>);
}

ping('Layouts', 'add layout', { Main });
