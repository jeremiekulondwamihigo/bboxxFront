/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { Edit, Save } from '@mui/icons-material';
import axios from 'axios';
import { postReponse } from 'Redux/Reponses';
import { lien } from 'static/Lien';
import { CreateContexte } from 'Context';
import DirectionSnackbar from 'Control/SnackBar';

function ReponsesComponent({ update }) {
  const [intial, setInitial] = React.useState({
    codeCu: '',
    codeClient: '',
    consExpDays: '',
    nomClient: ''
  });
  const { demande } = useContext(CreateContexte);
  const { codeCu, codeClient, consExpDays, nomClient } = intial;
  let [status, setStatut] = React.useState({ payement: '', statut: '' });
  const { payement, statut } = status;
  const [message, setMessage] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);

  function reset() {
    setInitial({ codeCu: '', codeClient: '', consExpDays: '', nomClient: '' });
    setStatut({ payement: '', statut: '' });
  }

  const reponse = useSelector((state) => state.reponse);
  const [open, setOpen] = React.useState(true);

  const checkStatut = (chiffre) => {
    setInitial({
      ...intial,
      consExpDays: chiffre
    });
    let statut = '';
    let payement = '';
    if (chiffre >= 0) {
      statut = 'installed';
      payement = 'normal';
    }
    if (chiffre >= -30 && chiffre <= -1) {
      statut = 'installed';
      payement = 'expired';
    }
    if (chiffre >= -44 && chiffre <= -31) {
      statut = 'installed';
      payement = 'defaulted';
    }
    if (chiffre <= -45) {
      statut = 'pending repossession';
      payement = 'defaulted';
    }
    if (isNaN(chiffre)) {
      statut = 'pending activation';
      payement = 'pending fulfliment';
    }
    setStatut({ payement, statut });
    return { payement, statut };
  };

  const parametres = useSelector((state) => state.parametre);
  React.useEffect(() => {
    if (codeClient !== '') {
      setStatut({ payement: '', statut: '' });

      let cus = parametres.parametre.filter((x) => x.customer === codeClient);

      if (cus.length > 0) {
        setInitial({
          ...intial,
          codeCu: cus[0].customer_cu,
          nomClient: cus[0].nomClient,
          consExpDays: ''
        });
      } else {
        setInitial({
          ...intial,
          codeCu: '',
          nomClient: '',
          consExpDays: ''
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeClient]);

  const dispatch = useDispatch();
  const reponseData = (e) => {
    e.preventDefault();
    const datass = {
      idDemande: demande.idDemande,
      codeClient,
      codeAgent: localStorage.getItem('bboxxSupprtCode'),
      codeCu,
      clientStatut: statut,
      PayementStatut: payement,
      consExpDays,
      nomClient
    };
    dispatch(postReponse(datass));
    reset();
  };
  const modifier = async () => {
    setOpenSnack(false);

    axios
      .put(lien + '/reponse', {
        idReponse: update._id,
        data: {
          codeClient,
          nomClient,
          codeCu,
          clientStatut: statut,
          PayementStatut: payement,
          consExpDays
        }
      })
      .then((response) => {
        setMessage(response.data);
        reset();
        setOpenSnack(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    if (update) {
      let valeur = {
        consExpDays: update.consExpDays,
        codeClient: update.codeClient,
        codeCu: update.codeCu
      };

      checkStatut(update.consExpDays);
      setInitial({
        ...intial,
        ...valeur
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <>
      {reponse.postDemande === 'rejected' && <DirectionSnackbar message={reponse.postDemandeError} open={open} setOpen={setOpen} />}

      {openSnack && <DirectionSnackbar message={message} open={openSnack} setOpen={setOpenSnack} />}
      <TextField
        style={{ marginTop: '10px' }}
        onChange={(e) => {
          e.preventDefault();
          setInitial({
            ...intial,
            codeClient: e.target.value
          });
        }}
        name="code_client"
        autoComplete="off"
        fullWidth
        value={codeClient}
        label="Code du Client"
      />
      <TextField
        style={{ marginTop: '10px' }}
        onChange={(e) => {
          e.preventDefault();
          setInitial({
            ...intial,
            nomClient: e.target.value
          });
        }}
        name="nomClient"
        autoComplete="off"
        fullWidth
        value={nomClient}
        label="Nom du Client"
      />
      <TextField
        style={{ marginTop: '10px' }}
        onChange={(e) => {
          e.preventDefault();
          setInitial({ ...intial, codeCu: e.target.value });
        }}
        value={codeCu}
        name="nom"
        autoComplete="off"
        fullWidth
        label="Code CU"
      />
      <div className="expiredDate">
        <TextField
          onChange={(e) => checkStatut(e.target.value)}
          style={{ marginTop: '10px' }}
          name="consExpDays"
          autoComplete="off"
          fullWidth
          value={consExpDays}
          label="consExpDays"
        />
      </div>
      <TextField
        style={{ marginTop: '10px' }}
        onChange={(e) => {
          e.preventDefault();
          setStatut({
            ...status,
            statut: e.target.value
          });
        }}
        name="nom"
        autoComplete="off"
        fullWidth
        value={statut}
        label="Statut du client"
      />

      <TextField
        style={{ marginTop: '10px' }}
        onChange={(e) => {
          e.preventDefault();
          setStatut({
            ...status,
            payement: e.target.value
          });
        }}
        name="nom"
        value={payement}
        autoComplete="off"
        fullWidth
        label="Payement statut"
      />

      <div style={{ marginTop: '10px' }}>
        <Button fullWidth variant="contained" color="primary" onClick={update ? () => modifier() : (e) => reponseData(e)}>
          {update ? <Edit fontSize="small" /> : <Save fontSize="small" />}{' '}
          <span style={{ marginLeft: '10px' }}> {update ? 'Update' : 'Save'}</span>
        </Button>
      </div>
    </>
  );
}
export default ReponsesComponent;
