/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import _ from 'lodash'

function Graphique({ donner, recherche }) {
  const [allDatas, setDatas] = useState({ all: [], datas: [] })
  const { datas, all } = allDatas
  const loading = () => {
    let table = []
    let allRegion = []
    const agentTech = _.groupBy(donner, 'zone.denomination')

    let cle = Object.keys(agentTech)
    for (let i = 0; i < cle.length; i++) {
      allRegion.push({
        name: cle[i],
        value: agentTech['' + cle[i]].length,
      })
      table.push({
        region: cle[i],
        agent: agentTech['' + cle[i]].filter(
          (x) => x.agent.fonction === 'agent',
        ).length,
        tech: agentTech['' + cle[i]].filter((x) => x.agent.fonction === 'tech')
          .length,
      })
    }
    console.log(allRegion)
    setDatas({
      all: allRegion,
      datas: table,
    })
  }
  useEffect(() => {
    loading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donner])


  return (
    <div style={{ height: '25rem' }}>
      {!recherche.codeAgent && (
        <ResponsiveContainer width="100%">
          <BarChart data={datas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="agent"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="tech"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
      {!recherche.codeAgent && (
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Regions</td>
              <td>Nombre de visites</td>
            </tr>
          </thead>
          <tbody>
            {all.map((index, key)=>{
              return(
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{index.name}</td>
                  <td>{index.value}</td>

                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default memo(Graphique)
