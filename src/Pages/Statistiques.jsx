import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import AutoComplement from '../static/AutoComplete'
// import axios from 'axios'
// import { lien } from '../static/Lien'
// import _ from 'lodash'
import SelectPeriodeStore from '../Control/SelectPeriodeStore'
import Popup from '../static/Popup'

function Statistiques() {
  const region = useSelector((state) => state.zone)
  const [value, setValue] = React.useState("")
  const [periodeSelect, setPeriodeSelect] = React.useState('')
  const [open, setOpen] = React.useState(false)
  // const [listeDemande, setListeDemande] = React.useState()
  // const loadingDemandes = async () => {
  //   try {
  //     const response = await axios.get(lien + '/demandeAll')
  //     setListeDemande(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // React.useEffect(() => {
  //   loadingDemandes()
  // }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 p-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <AutoComplement
                  value={value}
                  setValue={setValue}
                  options={region.zone}
                  title="Selectionnez la region"
                  propr="denomination"
                />
              </div>
              <div className="col-lg-6">
                <p onClick={() => setOpen(true)}>
                  Selectionnez un  paquet de demandes
                  
                </p>
                <p>{periodeSelect}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 statistique"></div>
      </div>
      <Popup
        open={open}
        setOpen={setOpen}
        title="Selectionnez un paquet de demandes"
      >
        <SelectPeriodeStore
          value={periodeSelect}
          setClose={setOpen}
          setValue={setPeriodeSelect}
          region={value.idZone}
        />
      </Popup>
    </div>
  )
}

export default Statistiques
