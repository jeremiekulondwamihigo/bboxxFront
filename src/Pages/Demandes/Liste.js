/* eslint-disable react/prop-types */
import { Card } from '@mui/material';
import './style.css';
import React, { useContext } from 'react';
import { lien } from 'utils/Lien';
import moment from 'moment';
import { CreateContexte } from 'Context';
import axios from 'axios';
import _ from 'lodash';
import { useCallback } from 'react';

function DemandeListe() {
  const { setDemande, demande } = useContext(CreateContexte);

  const [data, setData] = React.useState([]);

  const loading = useCallback(async () => {
    const response = await axios.get(`${lien}/touteDemande/0`);
    if (response.data != data) {
      setData(_.groupBy(response.data, 'zone.denomination'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demande]);

  React.useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demande]);
  return (
    <>
      {data &&
        Object.keys(data).map((index) => {
          return (
            <div key={index}>
              <div className="regionDemande">
                <p>
                  {index} <span className="nombre">{data['' + index].length}</span>{' '}
                </p>
              </div>
              {data['' + index].map((e, cle) => {
                return (
                  <Card
                    onClick={(event) => {
                      event.stopPropagation();
                      setDemande(e);
                    }}
                    style={{ cursor: 'pointer', padding: '3px' }}
                    key={cle}
                  >
                    <div className="allP">
                      <p className={e.concerne === '' ? 'black' : localStorage.getItem('bboxxSupprtCode') === e.concerne ? 'green' : 'red'}>
                        {' '}
                        {e.idDemande};{' '}
                      </p>
                      {e.codeClient && <p>Code client : {e.codeClient}</p>} <p> statut : {e.statut}</p>
                      {e.raison && <p>{e.raison}</p>}
                      <p>adresse : {e.sat}</p>
                      <p className="alignLeft">{moment(e.createdAt).fromNow()}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        })}
    </>
  );
}

export default React.memo(DemandeListe);
