import { Card } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { dateFrancais, lien } from 'static/Lien';
import ReponseAdmin from 'pages/Demandes/Reponse';
import { Input } from 'antd';

function Deja() {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState();
  const [load, setLoading] = React.useState(false);
  console.log(load);
  const [update, setUpdate] = React.useState();
  const key = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const postData = async (e) => {
    if (e.keyCode === 13 && value !== '') {
      setLoading(true);
      const reponse = await axios.get(`${lien}/oneReponse/${value}`);
      setData(reponse.data);
      setLoading(false);
    }
  };
  return (
    <>
      <Input type="text" value={value} onChange={(e) => key(e)} onKeyUp={(e) => postData(e)} placeholder="Search" />
      <div className="container">
        <div className="row">
          {data &&
            data.map((index) => {
              return (
                <div className="col-lg-3" key={index._id}>
                  <Card onClick={() => setUpdate(index)} variant="outlined" className="p-2 w-100 carteRetard">
                    <p className="code">{index.codeClient}</p>
                    <p className="retard">
                      {index.consExpDays}
                      {index.jOrH} ; <span className="success">agent : {index.codeAgent}</span>{' '}
                    </p>
                    <p className="retard">
                      Date {dateFrancais(index.createdAt)} à {index.createdAt.split('T')[1].split(':')[0]}:
                      {index.createdAt.split('T')[1].split(':')[1]}
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
