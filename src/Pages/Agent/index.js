import Popup from 'static/Popup';
import React, { memo } from 'react';
import AddAgent from './Agent';
import axios from 'axios';
import { lien } from 'static/Lien';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Tooltip } from '@mui/material';
import { Add, Edit, Block, RestartAlt } from '@mui/icons-material';
import DirectionSnackbar from 'Control/SnackBar';
import { useSelector } from 'react-redux';

function AgentListe() {
  const [openAgent, setOpenAgent] = React.useState(false);
  const [openAgentUpdate, setOpenAgentUpdate] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const allListe = useSelector((state) => state.agent);

  const bloquer = (agent) => {
    axios.put(lien + '/bloquer', { id: agent._id, value: !agent.active }).then((result) => {
      if (result.status === 200) {
        setOpen(true);
      }
    });
  };
  const resetPassword = (agent) => {
    axios.put(lien + '/reset', { id: agent._id }).then((result) => {
      if (result.status === 200) {
        setOpen(true);
      }
    });
  };
  const [dataTo, setDataTo] = React.useState();
  const update = (donner, e) => {
    e.preventDefault();
    setDataTo(donner);
    setOpenAgentUpdate(true);
  };

  const columns = [
    {
      field: 'nom',
      headerName: 'Noms',
      width: 250,
      editable: false
    },
    {
      field: 'codeAgent',
      headerName: 'code Agent',
      width: 200,
      editable: false
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return params.row.region.length > 0 ? params.row.region[0].denomination : '';
      }
    },
    {
      field: 'telephone',
      headerName: 'Téléphone',
      width: 200,
      editable: false
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <p>
            <Tooltip title="Modifiez">
              <Fab color="primary" size="small" onClick={(e) => update(params.row, e)}>
                <Edit fontSize="small" />
              </Fab>
            </Tooltip>
            <Tooltip title="Réinitialisez ses accès">
              <Fab color="success" size="small" onClick={() => resetPassword(params.row)}>
                <RestartAlt fontSize="small" />
              </Fab>
            </Tooltip>
            <Tooltip title={params.row.active ? 'Bloquer' : 'Débloquer'}>
              <Fab color="warning" size="small" onClick={() => bloquer(params.row)}>
                <Block fontSize="small" />
              </Fab>
            </Tooltip>
          </p>
        );
      }
    }
  ];
  return (
    <div>
      {open && <DirectionSnackbar open={open} setOpen={setOpen} message="Opération effectuée" />}
      <div className="m-3">
        <Fab onClick={() => setOpenAgent(true)} size="small" color="primary">
          <Add fontSize="small" />
        </Fab>
      </div>
      {allListe.agent && (
        <DataGrid
          rows={allListe.agent}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15
              }
            }
          }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}

      <Popup open={openAgent} setOpen={setOpenAgent} title="Ajoutez un agent">
        <AddAgent />
      </Popup>
      <Popup open={openAgentUpdate} setOpen={setOpenAgentUpdate} title="Modifier l'agent">
        <AddAgent data={dataTo} />
      </Popup>
    </div>
  );
}

export default memo(AgentListe);
