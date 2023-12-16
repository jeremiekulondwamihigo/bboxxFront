import Liste from './Liste';
import { Grid } from '@mui/material';
import ReponseAdmin from './Reponse';

function Index() {
  return (
    <Grid container>
      <Grid item xs={3} md={3} lg={3} sm={3}>
        <Liste />
      </Grid>
      <Grid item xs={9} md={9} lg={9} sm={9} sx={{ paddingLeft: '30px' }}>
        <ReponseAdmin />
      </Grid>
    </Grid>
  );
}
export default Index;
