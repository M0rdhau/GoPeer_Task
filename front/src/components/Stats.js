import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsTable } from './presentational/DetailsTable'
import { LinkDetails } from './LinkDetails'
import { OverviewData } from './OverviewData'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { deleteLink } from '../reducers/linkDataReducer'

export const Stats = () => {

  const linkData = useSelector(state => state.linkData)

  const match = useRouteMatch('/details/:id')

  const linkID = (match && linkData)
    ? match.params.id
    : null

  const dispatch = useDispatch()
  const removeLink = (linkID) => {
    dispatch(deleteLink(linkID))
  }

  return(
    <div className='stats'>
      <Switch>
        <Route path='/details/:id'>
          <LinkDetails linkID = {linkID} removeLink={removeLink}/>
        </Route>
        <Route path='/'>
          <DetailsTable linkData={linkData}/>
          <OverviewData linkData={linkData} />
        </Route>
      </Switch>
    </div>
  )
}