import React from 'react'
import { useSelector } from 'react-redux'
import { DetailsTable } from './DetailsTable'
import { LinkDetails } from './LinkDetails'
import { OverviewData } from './OverviewData'

export const Stats = () => {

  const linkData = useSelector(state => state.linkData)



  return(
    <div style={{ width: '30vw' }}>
      <DetailsTable linkData={linkData}/>
      <OverviewData linkData={linkData} />
      <LinkDetails linkID = {'60e9ce9601ded5b5a802209f'}/>
    </div>
  )
}