/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material'
import React from 'react'
import { Checkbox } from '@mui/material'
import axios from 'axios'
import { lien } from '../static/Lien'
import DirectionSnackbar from '../Control/SnackBar'
// eslint-disable-next-line react/prop-types
function UpdateDemandeDetail({ data }) {
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState('')
  const [message, setMessage] = React.useState('')
  React.useEffect(() => {
    setValue('')
  }, [data])

  const sendData = (e) => {
    e.preventDefault()
    if (value !== '') {
      axios
        .put(lien + '/modifierDemandeData', {
          id: data.id,
          value,
          propriete: data.propriete,
        })
        .then((response) => {
          if (response.status === 200) {
            setMessage('Modification effectuée')
            setOpen(true)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else {
      setMessage('Le champs ne doit pas être vide')
      setOpen(true)
    }
  }

  return (
    <div style={{ width: '20rem' }}>
      {open && (
        <DirectionSnackbar message={message} open={open} setOpen={setOpen} />
      )}
      {data.propriete === 'statut' ? (
        <div className="justifyCenter">
          <div
            onClick={(e) => {
              e.preventDefault()
              setValue('allumer')
            }}
          >
            <label>Allumé</label>
            <Checkbox
              title="Allumé"
              checked={value === 'allumer' ? true : false}
            />
          </div>
          <div
            onClick={(e) => {
              e.preventDefault()
              setValue('eteint')
            }}
          >
            <label>Eteint</label>
            <Checkbox
              title="Eteint"
              checked={value === 'eteint' ? true : false}
            />
          </div>
        </div>
      ) : (
        <div>
          <TextField
            style={{ marginTop: '10px' }}
            onChange={(e) => setValue(e.target.value)}
            name="code_client"
            value={value}
            autoComplete="off"
            fullWidth
            label={`Modification ${data.propriete}`}
          />
        </div>
      )}
      <div>
        <Button
          onClick={(e) => sendData(e)}
          variant="contained"
          color="primary"
          className="mt-3"
          fullWidth
        >
          Valider
        </Button>
      </div>
    </div>
  )
}

export default UpdateDemandeDetail
