/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { lien_image } from '../static/Lien'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import { PostDemandeFunction, ReadDemande } from "../Redux/Demande";
import { CreateContexte } from '../Context'
import './style.css'
import { Add, Clear, Edit, Remove } from '@mui/icons-material'

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
              {demande && !update && (
                <div style={{ textAlign: 'justify' }}>
                  <p>
                    {' '}
                    {demande.codeclient &&
                      `code client : ${demande.codeclient};`}{' '}
                    <span
                      onClick={(e) => loading('codeClient', demande._id, e)}
                    >
                      <Edit fontSize="small" />
                    </span>
                  </p>
                  {demande.codeAgent &&
                    `code demandeur : ${demande.codeAgent};`}
                  <br />
                  <p>
                    {' '}
                    {demande.adresse && `Adresse : ${demande.adresse}`}
                    <span onClick={(e) => loading('adresse', demande._id, e)}>
                      <Edit fontSize="small" />
                    </span>
                  </p>
                  <p>
                    {`Statut du client : ${
                      demande.statut === 'allumer' ? 'allumé' : 'éteint'
                    }`}{' '}
                    <span onClick={(e) => loading('statut', demande._id, e)}>
                      <Edit fontSize="small" />
                    </span>
                  </p>

                  <p>
                    {demande.raison && `Raison : ${demande.raison}`}{' '}
                    <span onClick={(e) => loading('raison', demande._id, e)}>
                      <Edit fontSize="small" />
                    </span>{' '}
                  </p>
                </div>
              )}
              {update && (
                <div style={{ textAlign: 'justify' }}>
                  {update.demande.codeclient &&
                    `code client : ${update.demande.codeclient};`}{' '}
                  <br />
                  {update.demande.codeAgent &&
                    `code demandeur : ${update.demande.codeAgent};`}
                  <br />
                  {update.demande.adresse &&
                    `Adresse : ${update.demande.adresse}`}{' '}
                  <br />
                  {`Statut du client : ${
                    update.demande.statut === 'allumer' ? 'allumé' : 'éteint'
                  }`}{' '}
                  <br />
                  {update.demande.raison && `Raison : ${update.demande.raison}`}
                </div>
              )}
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ReponseAdmin)
