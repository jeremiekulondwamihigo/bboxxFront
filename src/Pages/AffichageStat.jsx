/* eslint-disable react/prop-types */
import React from 'react'
import _ from 'lodash'
import { Typography } from '@mui/material'
import { Dropdown, Menu } from 'antd'
import {MessageOutlined} from '@ant-design/icons/lib/icons'

function AffichageStat({ listeDemande }) {
  const menu = (
    <Menu
      items={[
        {
          label: 'Feedback',
          key: 'Copy',
          icon: <MessageOutlined />,
        },
        {
          label: 'Répondre',
          key: 'Repondre',
          icon: <MessageOutlined />,
        },
      ]}
    ></Menu>
  )

  const [data, setData] = React.useState({ valeur: [], keys: [] })
  const { valeur, keys } = data
  const analyse = () => {
    const donne = _.groupBy(listeDemande, 'codeAgent')
    setData({ valeur: donne, keys: Object.keys(donne) })
  }
  React.useEffect(() => {
    analyse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeDemande])

  const showNameCode = (index) => {
    return {
      nom: valeur['' + index][0].agent.nom,
      code: valeur['' + index][0].agent.codeAgent,
    }
  }
  const reponduNonRepondu = (index) => {
    let repondu = 0
    let nonRepondu = 0
    for (let i = 0; i < valeur['' + index].length; i++) {
      if (valeur['' + index][i].reponse.length > 0) {
        repondu = repondu + 1
      } else {
        nonRepondu = nonRepondu + 1
      }
    }
    return { repondu, nonRepondu }
  }
  const [affiche_tab, setAffiche_tab] = React.useState('agent')
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items
    },
  })
  const handleChange = (e) => {
    let target = e.target.value.toUpperCase()

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items
        } else {
          return items.filter((x) => x.agent.nom.includes(target))
        }
      },
    })
  }
  return (
    <div className="messag">
      {listeDemande && (
        <>
          <div style={{ paddingTop: '5px' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="relative mt-2 mb-2">
                    <input
                      type="text"
                      className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
                      placeholder="Recherchez agent"
                      onChange={(e) => handleChange(e)}
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
                </div>
                <div className="col-lg-3">
                  <label htmlFor="pet-select">Status</label>
                  <select name="pets" id="pet-select">
                    <option value="dog">installed</option>
                    <option value="cat">Pending repossession</option>
                    <option value="hamster">Pending activation</option>
                    <option value="hamster">Inactive</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="pet-select">Paym Status</label>

                  <select name="pets" id="pet-select">
                    <option value="">normal</option>
                    <option value="dog">expired</option>
                    <option value="cat">Defaulted</option>
                    <option value="hamster">pending fulfliment</option>
                    <option value="parrot">terminated</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="messageSecond">
              <div className="container">
                <div className="row">
                  <div className="statDemande">
                    {listeDemande && (
                      <p>
                        <span style={{color:"red", marginRight:"10px", fontSize:"1rem"}}>
                        {
                          listeDemande.filter((x) => x.reponse.length > 0)
                            .length
                        }
                        </span>
                        demande(s) repondue(s) sur<span style={{color:"red", margin:"7px", fontSize:"1rem"}}>
                        {listeDemande.length}</span>  demande(s)
                        envoyée(s) soit <span style={{color:"red", margin:"7px", fontSize:"1rem"}}>
                        {
                          ((listeDemande.filter((x) => x.reponse.length > 0)
                          .length) * 100) / listeDemande.length 
                        }%
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <select
                      name="pets"
                      id="pet-select"
                      onChange={(e) => {
                        e.preventDefault()
                        setAffiche_tab(e.target.value)
                      }}
                    >
                      <option value="agent">Statistique agent</option>
                      <option value="stat">Stat. tous les agents</option>
                    </select>
                  </div>
                  {affiche_tab === 'agent' && (
                    <table>
                      <thead>
                        <th>
                          <td>ID</td>
                        </th>
                        <th>
                          <td>Agent</td>
                        </th>
                        <th>
                          <td>Code</td>
                        </th>
                        <th>
                          <td>SA & TECH</td>
                        </th>
                        <th>
                          <td>Obs</td>
                        </th>
                      </thead>
                      <tbody>
                        {listeDemande &&
                        filterFn.fn(listeDemande).map((index) => {
                            return (
                              <Dropdown
                                key={index._id}
                                overlay={menu}
                                trigger={['contextMenu']}
                              >
                                <tr>
                                  <td>{index.idDemande}</td>
                                  <td>
                                    <Typography
                                      noWrap
                                      sx={{ fontSize: '12px', width: '12rem' }}
                                    >
                                      {index.agent.nom}
                                    </Typography>
                                  </td>
                                  <td>{index.agent.codeAgent}</td>
                                  <td>
                                    {index.agent.fonction !== 'tech'
                                      ? 'SA'
                                      : 'TECH'}
                                  </td>
                                  <td className="warning">
                                    {index.reponse.length > 0 ? (
                                      <Typography
                                        color="green"
                                        sx={{
                                          fontSize: '12px',
                                        }}
                                      >
                                        Done
                                      </Typography>
                                    ) : (
                                      <Typography
                                        color="blue"
                                        sx={{ fontSize: '12px' }}
                                        className="success"
                                      >
                                        Wait...
                                      </Typography>
                                    )}
                                  </td>
                                </tr>
                              </Dropdown>
                            )
                          })}
                      </tbody>
                    </table>
                  )}
                  {affiche_tab === 'stat' && (
                    <table>
                      <thead>
                        <tr>
                          <td>Repond</td>
                          <td>Attente</td>
                          <td>Total</td>
                          <td>Code</td>
                        </tr>
                      </thead>
                      <tbody>
                        {keys.map((cle) => {
                          return (
                            <>
                              <tr key={cle}>
                                <td colSpan="3" className="nom">
                                  <Typography
                                    noWrap
                                    component="span"
                                    fontSize="12px"
                                  >
                                    {showNameCode(cle).nom}
                                  </Typography>
                                </td>
                                <td rowSpan="2">{showNameCode(cle).code}</td>
                              </tr>
                              <tr>
                                <td>{reponduNonRepondu(cle).repondu}</td>
                                <td>{reponduNonRepondu(cle).nonRepondu}</td>
                                <td>
                                  {reponduNonRepondu(cle).repondu +
                                    reponduNonRepondu(cle).nonRepondu}
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AffichageStat
