/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import '../style.css';
import { useSelector } from 'react-redux';
import AutoComplement from 'static/AutoComplete';
import AffichageStat from './AffichageStat';
import _ from 'lodash';
import { Alert, Button, Grid, Card, Fab, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import Graphique from './Graphique';
import axios from 'axios';
import { lien } from 'static/Lien';
import Popup from 'static/Popup.jsx';
import { Input } from 'antd';

import MainCard from 'components/MainCard';

function Statistiques() {
  const region = useSelector((state) => state.zone);
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('');

  const agent = useSelector((state) => state.agent);
  const [agentRegion, setAgentRegion] = React.useState();
  const fetchAgent = () => {
    if (agent.agent) {
      const fetc = _.filter(agent.agent, {
        codeZone: value ? value.idZone : ''
      });
      setAgentRegion(fetc);
    }
  };
  React.useEffect(() => {
    fetchAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    }
  });
  const handleChange = (e) => {
    let target = e.target.value.toUpperCase();

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items;
        } else {
          return items.filter((x) => x.nom.includes(target));
        }
      }
    });
  };

  const [lot, setLot] = React.useState();
  const [agentSelect, setAgentSelect] = React.useState();
  const periode = useSelector((state) => state.periodeStore);

  const click = (e, index) => {
    e.preventDefault();

    if (lot && lot == index) {
      setLot();
    } else {
      setLot(index);
    }
  };
  const selectAgent = (e, data) => {
    e.preventDefault();

    if (agentSelect && agentSelect._id === data._id) {
      setAgentSelect();
    } else {
      setAgentSelect(data);
    }
  };

  const [donner, setDonner] = React.useState();
  const [error, setError] = React.useState({ message: '', valeur: false });
  const { valeur, message } = error;
  const sendDataFectch = (e) => {
    e.preventDefault();
    const donner = {
      region: value ? value.idZone : undefined,
      agent: agentSelect ? agentSelect.codeAgent : undefined,
      paquet: lot ? lot : undefined
    };
    const { region, agent, paquet } = donner;
    if (!region && !agent && !paquet) {
      setError({
        valeur: true,
        message: 'Veuillez choisir un critere de selection'
      });
    } else {
      setError({ valeur: false, message: '' });
      let sended = {};
      if (donner.agent !== undefined) {
        sended.codeAgent = donner.agent;
      }
      if (donner.region !== undefined) {
        sended.codeZone = donner.region;
      }
      if (donner.paquet !== undefined) {
        sended.lot = donner.paquet;
      }
      setDonner(sended);
    }
  };

  const [listeDemande, setListeDemande] = React.useState();
  const loadingDemandes = async () => {
    try {
      axios.post(lien + '/demandeAgentAll', donner).then((response) => {
        setListeDemande(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (donner) {
      loadingDemandes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donner]);

  return (
    <MainCard>
      {valeur && <Alert severity="error">{message}</Alert>}
      <Popup open={open} setOpen={setOpen} title="Filtre">
        <Grid container sx={{ height: '100vh', width: '32rem', marginTop: '10px' }}>
          <Grid item lg={6}>
            <AutoComplement value={value} setValue={setValue} options={region.zone} title="Selectionnez la region" propr="denomination" />
            <div>
              {agentRegion && (
                <>
                  <Grid sx={{ marginBottom: '2px', marginTop: '2px' }}>
                    <Input type="text" onChange={(e) => handleChange(e)} placeholder="Recherchez un agent...." />
                  </Grid>
                  {filterFn.fn(agentRegion).map((index) => {
                    return (
                      <div
                        style={agentSelect && agentSelect._id === index._id ? style.agentListeSelect : style.agentListe}
                        key={index._id}
                        onClick={(e) => selectAgent(e, index)}
                      >
                        <Typography sx={{ fontSize: '12px' }} noWrap>
                          {index.nom}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>
                          CODE : {index.codeAgent};{' '}
                          <span
                            style={{
                              color: `${index.active ? 'black' : 'red'}`
                            }}
                          >
                            {index.active ? 'Actif' : 'Bloquer'}
                          </span>
                        </Typography>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Grid>
          <Grid lg={6} sx={{ paddingLeft: '5px' }}>
            <Grid container>
              {periode.getPeriode === 'success' &&
                periode.periode.length > 0 &&
                periode.periode.map((index) => {
                  return (
                    <Grid lg={6} key={index._id} onClick={(e) => click(e, index._id)}>
                      <Card
                        style={lot === index._id ? style.lotGreen : style.lotWhite}
                        sx={{ textAlign: 'center', marginRight: '4px', cursor: 'pointer' }}
                      >
                        {index._id}
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
            <Grid sx={{ marginTop: '3px' }}>
              <Button color="primary" variant="contained" onClick={(e) => sendDataFectch(e)}>
                <Search fontSize="small" /> <span style={{ marginLeft: '5px' }}>Recherche</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popup>
      <Grid container>
        <Grid item lg={12}>
          <Fab size="small" color="primary" onClick={() => setOpen(true)}>
            <Search fontSize="small" />
          </Fab>
          {listeDemande && (
            <>
              <div>
                <Graphique donner={listeDemande} recherche={donner} />
              </div>
              <div>
                <AffichageStat listeDemande={listeDemande} />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
}
const style = {
  agentListe: {
    backgroundColor: '#dedede',
    marginTop: '5px',
    borderRadius: '10px',
    padding: '5px',
    cursor: 'pointer',
    width: '98%'
  },
  agentListeSelect: {
    backgroundColor: '#d9fdd3',
    marginTop: '5px',
    borderRadius: '10px',
    padding: '5px',
    cursor: 'pointer',
    width: '98%'
  },
  lotGreen: {
    backgroundColor: '#d9fdd3'
  },
  lotWhite: {
    backgroundColor: '#fff'
  }
};

export default Statistiques;
