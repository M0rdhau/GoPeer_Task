import React, { useEffect, useState, useCallback } from 'react'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import { useForm } from '../hooks/useForm'
import linkService from '../services/linkService'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

export const LinkDetails = ({ linkID }) => {
  const [linkData, setLinkData] = useState([])
  const [values, setValues, clear] = useForm({ to: '2021-07-10T23:19:02.806Z', from: '2021-01-06T00:19:02.806Z', type: 'month' })

  const [barValues, setBarValues] = useState(false)

  const dispatch = useDispatch()

  const getLinkData = useCallback(async () => {
    try{
      const response = await linkService
        .getSingleUrl(linkID, values)
      setLinkData(response.data)
    }catch(e){
      dispatch(setNotification('Unable to retrieve details', true))
    }
  }, [linkID, values, dispatch])

  useEffect(() => {
    getLinkData()
  }, [getLinkData])

  useEffect(() => {
    if(linkData.length > 0){
      setBarValues({
        data: linkData.map(link => ({ x:link._id, y:link.count, z: new Date(link._id) })),
        domain: { x: [0, linkData.length], y: [0, Math.max(...linkData.map(l => l.count))] }
      })
    }
  }, [linkData])

  return (
    <>
      <div className='sorter'>
        <label htmlFor='from'>From:</label>
        <input name='from' type='date' value={values.from} onChange={setValues}/>
        <label htmlFor='to'>To:</label>
        <input name='to' type='date' value={values.to} onChange={setValues}/>
        <label htmlFor='type'>Group entries by:</label>
        <select name='type' onChange={setValues}>
          <option value='year'>Year</option>
          <option value='month'>Month</option>
          <option value='day'>Day</option>
        </select>
        <button onClick={clear}>Reset</button>
        <button onClick={getLinkData}>Search</button>
        <Link to='/'>Back</Link>
      </div>
      {barValues &&
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={15}
          width={800}>
          <VictoryBar
            data={barValues.data}
            domain={barValues.domain}
            sortKey='z'
          />
        </VictoryChart>
      }
    </>
  )
}