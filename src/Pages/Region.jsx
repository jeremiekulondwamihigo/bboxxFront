import axios from "axios";
import AddZone from "../Formulaire/AddZone";
import { lien } from "../static/Lien";
import { useEffect, useState } from "react";
import { Details } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Popup from "../static/Popup";
import AgentListe from "../components/AgentListe";

function Region() {
  const [data, setData] = useState();
  const loading = async () => {
    const response = await axios.get(lien + "/zone");
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
  return (
    <div>
      <AddZone />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Région</th>
            <th>Nbre Agent</th>
            <th>Nbre Tech</th>
            <th>Détail</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((index) => {
              return (
                <tr key={index._id}>
                  <th>{index.idZone}</th>
                  <th>{index.denomination}</th>
                  <th>{index.agentListe.length}</th>
                  <th>{index.techListe.length}</th>
                  <th onClick={() => functionListe(index)}>
                    <Fab color="primary" size="small">
                      <Details fontSize="small" />
                    </Fab>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
      {donner && (
        <Popup open={open} setOpen={setOpen} title={`Région ${donner.denomination}`}>
          <AgentListe liste={donner} />
        </Popup>
      )}
    </div>
  );
}

export default Region;
