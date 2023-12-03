/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { lien_image } from '../static/Lien'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import { PostDemandeFunction, ReadDemande } from "../Redux/Demande";
import { CreateContexte } from '../Context'
import './style.css'
import { Add, Clear, Remove } from '@mui/icons-material'

import UpdateDemandeDetail from './UpdateDemandeDetail'
import Popup from '../static/Popup'
import BasicTabs from '../Control/Tabs'
import FeedbackComponent from './FeedBack'
import ReponsesComponent from './ReponseComponent'

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
function ReponseAdmin(props) {
  const { update } = props
  const [openPopup, setOpenPopup] = React.useState(false)
  const { demande } = useContext(CreateContexte)
  const [dataTo, setDataTo] = React.useState({
    propriete: '',
    id: '',
  })

  const loading = (propriete, id, e) => {
    e.preventDefault()
    setDataTo({ propriete, id })
    setOpenPopup(true)
  }

  const titres = [
    { id: 0, label: 'Reponse' },
    { id: 1, label: 'Feedback' },
  ]
  const components = [
    { id: 0, component: <ReponsesComponent update={update} /> },
    {
      id: 1,
      component: <FeedbackComponent demande={demande} update={update} />,
    },
  ]

  function AfficherJsx({ demandes }) {
    return (
      <div style={{ textAlign: 'justify' }}>
        <p>
          {demandes.codeAgent && (
            <span onClick={(e) => loading('codeAgent', demandes._id, e)}>
              <span style={style.span}>Code Agent : </span>
              {demandes.codeAgent}
            </span>
          )}
          {demandes.codeClient && (
            <span onClick={(e) => loading('codeClient', demandes._id, e)}>
              <span style={style.span}>Code Client : </span>
              {demandes.codeclient}
            </span>
          )}
        </p>

        <br />
        <p style={{ cursor: 'pointer' }}>
          <span onClick={(e) => loading('province', demandes._id, e)}>
            <span style={style.span}>Province : </span>
            {demandes.province}
          </span>

          <span onClick={(e) => loading('country', demandes._id, e)}>
            <span style={style.span}>country : </span>
            {demandes.country}
          </span>

          <span onClick={(e) => loading('sector', demandes._id, e)}>
            <span style={style.span}>Sector : </span>
            {demandes.sector}
          </span>

          <span onClick={(e) => loading('cell', demandes._id, e)}>
            <span style={style.span}>Cell : </span>
            {demandes.cell}
          </span>

          <span onClick={(e) => loading('reference', demandes._id, e)}>
            <span style={style.span}>Référence : </span>
            {demandes.reference}
          </span>

          <span onClick={(e) => loading('sat', demandes._id, e)}>
            <span style={style.span}>Sat : </span>
            {demandes.reference}
          </span>
        </p>
        <p>
          <span onClick={(e) => loading('statut', demandes._id, e)}>
            <span style={style.span}>Statut du client</span>{' '}
            {`${demandes.statut === 'allumer' ? 'allumé' : 'éteint'}`}{' '}
          </span>
          {demandes.raison && (
            <span onClick={(e) => loading('raison', demandes._id, e)}>
              <span style={style.span}>Raison</span>
              {demandes.raison}
            </span>
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          {(demande || update) && (
            <>
              <TransformWrapper initialScale={1}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <React.Fragment>
                    <div className="tools mb-1">
                      <Add
                        onClick={() => zoomIn()}
                        style={{ cursor: 'pointer' }}
                      />
                      <Remove
                        onClick={() => zoomOut()}
                        style={{ cursor: 'pointer' }}
                      />
                      <Clear
                        onClick={() => resetTransform()}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <TransformComponent>
                      <img
                        src={`${lien_image}/${
                          update ? update.demande.file : demande.file
                        }`}
                        alt="materiel"
                        className="imageMateriel"
                      />
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
              {demande && !update && <AfficherJsx demandes={demande} />}
              {update && <AfficherJsx demandes={update.demande} />}
            </>
          )}
        </div>
        <div className="col-lg-4">
          <BasicTabs titres={titres} components={components} />
        </div>
      </div>
      {dataTo && (
        <Popup open={openPopup} setOpen={setOpenPopup} title="Modification">
          <UpdateDemandeDetail data={dataTo} />
        </Popup>
      )}
    </div>
  )
}
const style = {
  span: {
    color: '#0078',
    fontWeight: 'bold',
    marginRight: '5px',
    marginLeft: '5px',
  },
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ReponseAdmin)
