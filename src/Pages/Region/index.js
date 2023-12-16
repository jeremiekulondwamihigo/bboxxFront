import axios from 'axios';
import AddZone from './AddZone';
import { lien } from 'static/Lien';
import { useEffect, useState } from 'react';
import { Details } from '@mui/icons-material';
import { Fab } from '@mui/material';
import Popup from 'static/Popup';
import AgentListe from '../Agent/AgentListe';
import { DataGrid } from '@mui/x-data-grid';

function Region() {
  const [data, setData] = useState();
  const loading = async () => {
    const response = await axios.get(lien + '/zone');
    setData(response.data);
  };
  useEffect(() => {
    loading();
  }, []);
  const [open, setOpen] = useState(false);
  const [donner, setdonner] = useState(false);
  const functionListe = (donne) => {
    setdonner(donne);
    setOpen(true);
  };
  const columns = [
    {
      field: 'idZone',
      headerName: 'ID_Region',
      width: 100,
      editable: false
    },
    {
      field: 'denomination',
      headerName: 'REGION',
      width: 180,
      editable: false
    },
    {
      field: 'agent',
      headerName: 'SA',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return <span>{params.row.agentListe.length}</span>;
      }
    },
    {
      field: 'tech',
      headerName: 'TECH',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return <span>{params.row.techListe.length}</span>;
      }
    },
    {
      field: 'detail',
      headerName: 'Détails',
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <Fab color="primary" size="small" onClick={() => functionListe(params.row)}>
            <Details fontSize="small" />
          </Fab>
        );
      }
    }
  ];
  return (
    <div>
      <AddZone />
      {data && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7
              }
            }
          }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
      {donner && (
        <Popup open={open} setOpen={setOpen} title={`Région ${donner.denomination}`}>
          <AgentListe liste={donner} />
        </Popup>
      )}
    </div>
  );
}

export default Region;
