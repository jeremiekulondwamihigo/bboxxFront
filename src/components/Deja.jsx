import { Card } from "@mui/material";
import React from "react";
import axios from "axios";
import { dateFrancais, lien } from "../static/Lien";
import Loading from "../Loading";
import ReponseAdmin from "./ReponseAdmin";

function Deja() {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState();
  const [load, setLoading] = React.useState(false);
  const [update, setUpdate] = React.useState();
  const key = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const postData = async (e) => {
    if (e.keyCode === 13 && value !== "") {
      setLoading(true);
      const reponse = await axios.get(`${lien}/oneReponse/${value}`);
      setData(reponse.data);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="relative mt-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => key(e)}
          onKeyUp={(e) => postData(e)}
          className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
          placeholder="Search"
        />
        <svg
          viewBox="0 0 24 24"
          className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      {load && <Loading title="Patientez..." taille={20} />}
      <div className="container">
        <div className="row">
          {data &&
            data.map((index) => {
              return (
                <div className="col-lg-3" key={index._id}>
                  <Card
                    onClick={() => setUpdate(index)}
                    variant="outlined"
                    className="p-2 w-100 carteRetard"
                  >
                    <p className="code">{index.codeClient}</p>
                    <p className="retard">
                      {index.consExpDays}
                      {index.jOrH} ;{" "}
                      <span className="success">agent : {index.codeAgent}</span>{" "}
                    </p>
                    <p className="retard">
                      Date {dateFrancais(index.createdAt)} à{" "}
                      {index.createdAt.split("T")[1].split(":")[0]}:
                      {index.createdAt.split("T")[1].split(":")[1]}
                    </p>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>

      {update && <ReponseAdmin update={update} />}
    </>
  );
}

export default Deja;
