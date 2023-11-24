/* eslint-disable react/prop-types */
import { Block } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { lien } from "../static/Lien";
import { useState } from "react";
import DirectionSnackbar from "../Control/SnackBar";
function AgentListe(props) {
  const { liste } = props;
  const [open, setOpen] = useState(false);
  const bloquer = (agent) => {
    axios
      .put(lien + "/bloquer", { id: agent._id, value: !agent.active })
      .then((result) => {
        if (result.status === 200) {
          setOpen(true);
        }
      });
  };
  const resetPassword = (agent) => {
    axios
      .put(lien + "/reset", { id: agent._id})
      .then((result) => {
        if (result.status === 200) {
          setOpen(true);
        }
      });
  };
  const columns = [
    {
      field: "codeAgent",
      headerName: "Code",
      width: 100,
      editable: false,
    },
    {
      field: "nom",
      headerName: "NOMS",
      width: 180,
      editable: false,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 120,
      editable: false,
    },
    {
      field: "active",
      headerName: "Status",
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <span className={params.row.active ? "green" : "red"}>
            {params.row.active ? "Actif" : "Bloquer"}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <span onClick={() => bloquer(params.row)}>
            <Block fontSize="small" />
          </span>
        );
      },
    },
    {
      field: "paswo",
      headerName: "Reset",
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <span onClick={() => resetPassword(params.row)} className="cursor-pointer">
            Reset
          </span>
        );
      },
    },
  ];
  return (
    <div className="container">
      {open && (
        <DirectionSnackbar
          open={open}
          setOpen={setOpen}
          message="Opération effectuée"
        />
      )}
      <div className="row">
        <p>Agents</p>
        <div className="col-lg-12">
          {liste.agentListe.length > 0 ? (
            <DataGrid
              rows={liste.agentListe}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              pageSizeOptions={[7]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <p className="red">Aucun agent trouvé</p>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <p>Techniciens</p>
        <div className="col-lg-12">
          {liste.techListe.length > 0 ? (
            <DataGrid
              rows={liste.techListe}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              pageSizeOptions={[7]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <p className="red">Aucun technicien trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentListe;
