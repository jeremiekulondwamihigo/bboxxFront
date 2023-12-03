/* eslint-disable react/prop-types */
import { Card, Typography } from '@mui/material'
import { lien_image } from '../static/Lien'

// eslint-disable-next-line react/prop-types, no-unused-vars
function DemandeReponse({ data }) {
  return (
    <>
      <Card variant="elevation" sx={{ background: '#d9fdd3' }}>
        <div className="messageTitle">
          <div className="content">
            <p>
              <span style={{ color: '#e542a3', fontWeight: '600' }}>
                {data.agent.nom}
              </span>{' '}
              {data.agent.telephone}
            </p>
            <Typography sx={{ fontSize: '12px' }} noWrap component="p">
              {`${data.agent.codeAgent} ${data.province} ${data.country}
              ${data.sector}
              ${data.cell}
              ${data.reference}
              ${data.sat}`}
            </Typography>
            <Typography sx={{ fontSize: '12px' }} noWrap>
              {data.statut}
            </Typography>
          </div>
          <div className="contentImage">
            <img src={`${lien_image}/${data.file}`} />
          </div>
        </div>
        <div style={{ padding: '3px' }}>
          <p>
            {data.reponse[0].codeClient}; {data.reponse[0].nomClient}
          </p>
          <p>{data.reponse[0].PayementStatut}</p>
          <p>Type de crédit:</p>
          <p>
            Day
            <br />
            Nombre de contrats: <br />2
          </p>
          <p>
            {data.reponse[0].consExpDays}{' '}
            {data.reponse[0].consExpDays > 1 ? 'Days' : 'Day'}
          </p>
          <p>{data.reponse[0].codeCu}
          <span style={{ float: 'right', fontSize: '11px' }}>
            Le {new Date(data.reponse[0].createdAt).getDate()} à{' '}
            {new Date(data.reponse[0].createdAt).getHours()}:
            {new Date(data.reponse[0].createdAt).getMinutes()}
          </span>
          </p>
         
        </div>
      </Card>
    </>
  )
}

export default DemandeReponse
