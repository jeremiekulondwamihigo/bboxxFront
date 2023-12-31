import React from 'react';
import { Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { lien } from 'utils/Lien';
import ExcelButton from 'static/ExcelButton';
import { Input } from 'antd';
import '../style.css';

function Rapport() {
  const [dates, setDates] = React.useState({ debut: '', fin: '' });
  const [donnerFound, setDonnerFound] = React.useState([]);
  const [samplejson2, setSample] = React.useState();
  const [nomFile, setNomFile] = React.useState('');
  const generateNomFile = () => {
    if (dates.debut !== '' && dates.fin !== '') {
      let date1 = new Date(dates.debut);
      let date2 = new Date(dates.fin);
      if (date1.getFullYear() === date2.getFullYear()) {
        if (date1.getMonth() == date2.getMonth()) {
          if (date1.getDate() === date2.getDate()) {
            return `du ${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`;
          } else {
            return `du ${date1.getDate()} au ${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`;
          }
        } else {
          return `du ${date1.getDate()}/${date1.getMonth() + 1} au ${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`;
        }
      } else {
        return `du ${date1.getDate()}/${date1.getMonth() + 1}/${date1.getFullYear()} au ${date2.getDate()}/${
          date2.getMonth() + 1
        }/${date2.getFullYear()}`;
      }
    }
  };

  const retourDate = (date) => {
    let dates = new Date(date).getDate();
    let month = parseInt(new Date(date).getMonth()) + 1;
    let year = new Date(date).getFullYear();
    return `${dates}/${month}/${year}`;
  };
  const [loading, setLoading] = React.useState(false);

  const searchData = React.useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      let data = {
        debut: dates.debut,
        fin: dates.fin
      };
      axios.post(lien + '/rapport', data).then((response) => {
        if (response.data.error) {
          setLoading(false);
          alert(response.data.message);
        } else {
          setDonnerFound(response.data);
          const donner = [];
          for (let i = 0; i < response.data.length; i++) {
            donner.push({
              ID: response.data[i].codeClient,
              NOMS: response.data[i].nomClient,
              'SERIAL NUMBER': response.data[i].codeCu,
              'CLIENT STATUS': response.data[i].clientStatut,
              'PAYMENT STATUS': response.data[i].PayementStatut,
              'CONS. EXP. DAYS': response.data[i].PayementStatut === 'normal' ? '0' : response.data[i].consExpDays,
              REGION: response.data[i].region,
              SHOP: response.data[i].shop,
              'CODE AGENT': response.data[i].demandeur.codeAgent,
              'NOMS DU DEMANDEUR': response.data[i].demandeur.nom,
              'SA & TECH': response.data[i].demandeur.fonction !== 'tech' ? 'SA' : 'TECH',
              DATE: retourDate(response.data[i].createdAt),
              'C.O': response.data[i].agent.nom,
              'STATUT DE LA DEMANDE': response.data[i].demande.typeImage,
              "HEURE D'ENVOI": `${new Date(response.data[i].demande.createdAt).getHours()}:${new Date(
                response.data[i].demande.createdAt
              ).getMinutes()}`,
              'HEURE DE REPONSE': `${new Date(response.data[i].createdAt).getHours()}:${new Date(response.data[i].createdAt).getMinutes()}`,
              LONGITUDE: response.data[i].demande.coordonnes.longitude,
              LATITUDE: response.data[i].demande.coordonnes.latitude,
              ALTITUDE: response.data[i].demande.coordonnes.altitude,
              'ETAT PHYSIQUE': response.data[i].demande.statut,
              'RAISON DE NON PAYEMENT ': response.data[i].demande.raison,
              SAT: response.data[i].demande.sat,
              COUNTRY: response.data[i].demande.country,
              SECTOR: response.data[i].demande.sector,
              CELL: response.data[i].demande.cell,
              REFERENCE: response.data[i].demande.reference
            });
          }
          setLoading(false);
          setSample(donner);
          setNomFile(generateNomFile());
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dates]
  );
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <div style={{ display: 'flex', width: '50%' }}>
          <div style={{ width: '50%' }}>
            <Input
              type="date"
              onChange={(e) =>
                setDates({
                  ...dates,
                  debut: e.target.value
                })
              }
              placeholder="Date"
            />
          </div>
          <div style={{ width: '50%' }}>
            <Input
              onChange={(e) =>
                setDates({
                  ...dates,
                  fin: e.target.value
                })
              }
              type="date"
              placeholder="Date"
            />
          </div>
        </div>
        <Button disabled={loading} color="primary" variant="contained" onClick={(e) => searchData(e)}>
          <Search fontSize="small" /> {loading ? 'Loading...' : 'Recherche'}
        </Button>
        <ExcelButton data={samplejson2} title="Export to Excel" fileName={`${nomFile}.xlsx`} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Code client</td>
              <td>stat.client</td>
              <td>Pay.stat</td>
              <td>DAYS</td>
              <td>demandeur</td>
              <td>code</td>
              <td>Date</td>
              <td>c.o</td>
              <td>H.E</td>
              <td>H.R</td>
              <td>Statut</td>
              <td>Raison</td>
            </tr>
          </thead>
          <tbody>
            {donnerFound.length > 0 ? (
              donnerFound.map((index) => {
                return (
                  <tr key={index._id}>
                    <td>{index.codeClient}</td>
                    <td>{index.clientStatut}</td>
                    <td>{index.PayementStatut}</td>
                    <td>{index.consExpDays}</td>
                    <td>{index.demandeur.nom}</td>
                    <td>{index.demandeur.codeAgent}</td>
                    <td>{retourDate(index.createdAt)}</td>
                    <td>{index.agent.nom}</td>
                    <td>{`${new Date(index.demande.createdAt).getHours()}:${new Date(index.demande.createdAt).getMinutes()}`}</td>
                    <td>{`${new Date(index.createdAt).getHours()}:${new Date(index.createdAt).getMinutes()}`}</td>
                    <td>{index.demande.statut}</td>
                    <td>{index.demande.raison}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td style={{ color: 'red' }} colSpan="12">
                  Aucun résultat...
                </td>
              </tr>
            )}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Rapport;
