/* eslint-disable no-unused-vars */
import { Card, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'
import _ from 'lodash'

// eslint-disable-next-line react/prop-types
function SelectPeriodeStore({ value, setValue, setClose, region }) {
  console.log(region)
  const periode = useSelector((state) => state.periodeStore)
  const click = (e, index) => {
    e.preventDefault()
    setValue(index)
  }
  const agent = useSelector((state) => state.agent)
  const [agentRegion, setAgentRegion] = React.useState()
  const fetchAgent = () => {
    if (agent.agent) {
      const fetc = _.filter(agent.agent, { codeZone: region })
      setAgentRegion(fetc)
    }
  }
  React.useEffect(() => {
    fetchAgent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, agent])

  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const handleChange = (e) => {
    let target = e.target.value.toUpperCase();

    setFilterFn({
      fn: (items) => {
        if (target === "") {
          return items;
        } else {
          return items.filter((x) => x.nom.includes(target))
        }
      },
    });
  };
  return (
    <div className="container" style={{ width: '30rem', height:"100vh" }}>
      <div className="row">
        {periode.getPeriode === 'success' &&
          periode.periode.length > 0 &&
          periode.periode.map((index) => {
            return (
              <div
                className="col-lg-3"
                key={index._id}
                onClick={(e) => click(e, index._id)}
              >
                <Card
                  style={value === index._id ? style.lotGreen : style.lotWhite}
                  className="p-2"
                  sx={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  {index._id}
                </Card>
              </div>
            )
          })}
      </div>
      <div className="row mt-3">
        <div className="col-lg-6">
        <div className="relative mt-2 mb-2">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
              placeholder="Recherche"
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
          {agentRegion &&
            filterFn.fn(agentRegion).map((index) => {
              return (
                <div style={style.agentListe} key={index._id}>
                  <Typography sx={{ fontSize: '12px' }} noWrap>
                    {index.nom}
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    CODE : {index.codeAgent};{' '}
                    <span
                      style={{ color: `${index.active ? 'black' : 'red'}` }}
                    >
                      {index.active ? 'Actif' : 'Bloquer'}
                    </span>
                  </Typography>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
const style = {
  lotGreen: {
    backgroundColor: '#d9fdd3',
  },
  lotWhite: {
    backgroundColor: '#fff',
  },
  agentListe: {
    backgroundColor: '#dedede',
    marginTop: '5px',
    borderRadius: '10px',
    padding: '5px',
    cursor: 'pointer',
    width: '98%',
  },
}

export default SelectPeriodeStore
