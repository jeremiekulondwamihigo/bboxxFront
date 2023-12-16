/* eslint-disable react/prop-types */
import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { lien } from 'static/Lien';

function FeedbackComponent({ demande, update }) {
  const [reclamation, setReclamation] = useState('');
  const [dataReclammer, setDataReclammer] = useState([]);

  const loadingMesage = async () => {
    if (demande || update) {
      let id = demande ? demande.codeAgent : update.demande.codeAgent;
      const reponse = await axios.get(`${lien}/message/${id}`);
      setDataReclammer(reponse.data.conversation);
    }
  };
  useEffect(() => {
    loadingMesage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demande, update]);

  const sendReclamation = (e) => {
    if (update && e.keyCode === 13) {
      setReclamation('');
      const data = {
        code: update.demande._id,
        message: reclamation,
        sender: 'co',
        codeAgent: update.demande.codeAgent
      };
      axios
        .post(lien + '/reclamation', data)
        .then((reponse) => {
          setDataReclammer(reponse.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    if (demande && e.keyCode === 13) {
      setReclamation('');
      const data = {
        code: demande._id,
        message: reclamation,
        sender: 'co',
        codeAgent: demande.codeAgent
      };
      axios
        .post(lien + '/reclamation', data)
        .then((reponse) => {
          setDataReclammer(reponse.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="relative mt-2 mb-2">
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setReclamation(e.target.value);
              }}
              onKeyUp={(e) => sendReclamation(e)}
              className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
              placeholder="Feedback..."
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          {dataReclammer &&
            dataReclammer.map((index) => {
              return (
                <div className={index.sender === 'co' ? 'messageReponse' : 'messageAgent'} key={index._id}>
                  {index.message}
                  <p className="dateSpan">{moment(index.createdAt).fromNow()}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default FeedbackComponent;
