/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import { Typography, Grid } from '@mui/material';
import { Dropdown, Menu } from 'antd';
import { MessageOutlined } from '@ant-design/icons/lib/icons';
import { Input } from 'antd';
import { dateFrancais } from 'utils/Lien';

function AffichageStat({ listeDemande }) {
  const menu = (
    <Menu
      items={[
        {
          label: 'Feedback',
          key: 'Copy',
          icon: <MessageOutlined />
        },
        {
          label: 'Répondre',
          key: 'Repondre',
          icon: <MessageOutlined />
        }
      ]}
    ></Menu>
  );

  const [data, setData] = React.useState({ valeur: [], keys: [] });
  const { valeur, keys } = data;
  const analyse = () => {
    const donne = _.groupBy(listeDemande, 'codeAgent');
    setData({ valeur: donne, keys: Object.keys(donne) });
  };
  React.useEffect(() => {
    analyse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeDemande]);

  const showNameCode = (index) => {
    return {
      nom: valeur['' + index][0].agent.nom,
      code: valeur['' + index][0].agent.codeAgent
    };
  };
  const reponduNonRepondu = (index) => {
    let repondu = 0;
    let nonRepondu = 0;
    for (let i = 0; i < valeur['' + index].length; i++) {
      if (valeur['' + index][i].reponse.length > 0) {
        repondu = repondu + 1;
      } else {
        nonRepondu = nonRepondu + 1;
      }
    }
    return { repondu, nonRepondu };
  };
  const [affiche_tab, setAffiche_tab] = React.useState('agent');
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
          return items.filter((x) => x.agent.nom.includes(target));
        }
      }
    });
  };
  console.log(listeDemande);
  return (
    <>
      <div className="statDemande">
        {listeDemande && (
          <p style={{ textAlign: 'center' }}>
            <span style={{ color: 'red', marginRight: '10px', fontSize: '1rem' }}>
              {listeDemande.filter((x) => x.reponse.length > 0).length}
            </span>
            demande(s) repondue(s) sur
            <span style={{ color: 'red', margin: '7px', fontSize: '1rem' }}>{listeDemande.length}</span> demande(s) envoyée(s) soit{' '}
            <span style={{ color: 'red', margin: '7px', fontSize: '1rem' }}>
              {(listeDemande.filter((x) => x.reponse.length > 0).length * 100) / listeDemande.length}%
            </span>
          </p>
        )}
      </div>
      {listeDemande && (
        <div style={{ paddingTop: '5px' }}>
          <Grid container>
            <Grid item lg={3}></Grid>

            <Grid item lg={3}>
              <select
                name="pets"
                id="pet-select"
                onChange={(e) => {
                  e.preventDefault();
                  setAffiche_tab(e.target.value);
                }}
              >
                <option value="agent">Statistique agent</option>
                <option value="stat">Stat. tous les agents</option>
              </select>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: '20px' }}>
            {affiche_tab === 'agent' && (
              <>
                <Grid item lg={6}>
                  <Grid sx={{ marginBottom: '2px' }}>
                    <Input type="text" placeholder="Recherchez agent" onChange={(e) => handleChange(e)} />
                  </Grid>
                </Grid>
                <table>
                  <thead>
                    <th>
                      <td>ID</td>
                    </th>
                    <th>
                      <td>Agent</td>
                    </th>
                    <th>
                      <td>Code_Agent</td>
                    </th>
                    <th>
                      <td>Code Client</td>
                    </th>
                    <th>
                      <td>
                        <select name="pets" id="pet-select">
                          <option value="">Statut client</option>
                          <option value="installed">installed</option>
                          <option value="pending repossession">Pending repossession</option>
                          <option value="pending activation">Pending activation</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                    </th>
                    <th>
                      <td>
                        <select name="pets" id="pet-select">
                          <option value="">Statut payement</option>
                          <option value="normal">normal</option>
                          <option value="expired">expired</option>
                          <option value="defaulted">Defaulted</option>
                          <option value="pending fulfliment">pending fulfliment</option>
                          <option value="terminated">terminated</option>
                        </select>
                      </td>
                    </th>
                    <th>
                      <td>Days</td>
                    </th>
                    <th>
                      <td>Date</td>
                    </th>
                    <th>
                      <td>Obs</td>
                    </th>
                  </thead>
                  <tbody>
                    {listeDemande &&
                      filterFn.fn(listeDemande).map((index) => {
                        return (
                          <Dropdown key={index._id} overlay={menu} trigger={['contextMenu']}>
                            <tr>
                              <td>{index.idDemande}</td>
                              <td>
                                <Typography noWrap sx={{ fontSize: '13px', width: '5rem' }}>
                                  {index.agent.nom}
                                </Typography>
                              </td>
                              <td>{index.agent.codeAgent}</td>
                              <td>{index.reponse.length > 0 ? index.reponse[0].codeClient : ''}</td>
                              <td>{index.reponse.length > 0 ? index.reponse[0].clientStatut : ''}</td>
                              <td>{index.reponse.length > 0 ? index.reponse[0].PayementStatut : ''}</td>
                              <td>{index.reponse.length > 0 ? index.reponse[0].consExpDays : ''}</td>
                              <td>{dateFrancais(index.createdAt)}</td>
                              <td className="warning">
                                {index.reponse.length > 0 ? (
                                  <Typography
                                    color="green"
                                    sx={{
                                      fontSize: '12px'
                                    }}
                                  >
                                    Done
                                  </Typography>
                                ) : (
                                  <Typography color="blue" sx={{ fontSize: '12px' }} className="success">
                                    Wait...
                                  </Typography>
                                )}
                              </td>
                            </tr>
                          </Dropdown>
                        );
                      })}
                  </tbody>
                </table>
              </>
            )}
            {affiche_tab === 'stat' && (
              <table>
                <thead>
                  <tr>
                    <td>Nom Agent</td>
                    <td>Code agent</td>
                    <td>Repondue(s)</td>
                    <td>Attente(s)</td>
                    <td>Max</td>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((cle) => {
                    return (
                      <tr key={cle}>
                        <td className="nom">
                          <Typography noWrap component="span" fontSize="12px">
                            {showNameCode(cle).nom}
                          </Typography>
                        </td>
                        <td>{showNameCode(cle).code}</td>
                        <td>{reponduNonRepondu(cle).repondu}</td>
                        <td>{reponduNonRepondu(cle).nonRepondu}</td>
                        <td>{reponduNonRepondu(cle).repondu + reponduNonRepondu(cle).nonRepondu}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Grid>
        </div>
      )}
    </>
  );
}

export default AffichageStat;
