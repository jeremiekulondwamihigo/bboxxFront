/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card } from '@mui/material'
import { lien_image } from '../static/Lien'

function DemandeNReponse({ data }) {
  return (
    <Card variant="elevation" style={{ padding: '3px' }}>
      <div className="justifyCenter imageNonReponse">
        <img src={`${lien_image}/${data.file}`} />
      </div>
      <div>
        <p>
          {`${data.codeAgent}; ${data.codeclient ? data.codeclient : ''} 
          ${data.province};
           ${data.country};
            ${data.sector};
             ${data.cell};
              ${data.reference};
               ${data.sat}; `}
          <span className="success">{data.statut}</span>
          {data.raison && data.raison}
        </p>
        <span style={{ float: 'right', fontSize: '11px' }}>
          Le {new Date(data.createdAt).getDate()} à{' '}
          {new Date(data.createdAt).getHours()}:
          {new Date(data.createdAt).getMinutes()}
        </span>
      </div>
    </Card>
  )
}

export default DemandeNReponse
