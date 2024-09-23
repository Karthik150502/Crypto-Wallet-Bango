import React from 'react'

import { getWalletInfo } from '@/app/packages/Solana/solanaInfo'
import WalletView from './wallet'
type Props = {
  publicKey: string
}

export default async function SolanaWalletDetailedView({ publicKey }: Props) {




  const fetchInfo = async () => {
    let res = await getWalletInfo(publicKey);
    return {
      publicKey,
      slot: res.data.result.context.slot,
      value: res.data.result.value,
      id: res.data.id,
      jsonrpc: res.data.jsonrpc
    }
  }


  let res = await fetchInfo();



  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <WalletView {...res} />
    </div>
  )
}
