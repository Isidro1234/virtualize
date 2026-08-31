import React from 'react'
import LiveaddingComp from '../../../components/structure/LiveAddingComp'
import { VerifySession } from '../../lib/verifySession'
import { getSession } from '../../actions/auth'

export default async function Live() {

  return (
    <LiveaddingComp />
  )
}
