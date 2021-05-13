import { call, put, takeLeading } from 'typed-redux-saga'

import { actions, Status } from '@reducers/signer'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { getSigner } from '@web3/eth/access'
import { getAddress, getBalance } from '@web3/eth/signer'

export function* initSigner(): Generator {
  if (!window.ethereum) {
    console.log('error install metamask of browser with metamask support')
    yield put(actions.setStatus(Status.Error))
    yield put(actions.setMessage('To access this page you need MetaMask extension'))
    return
  }
  try {
    yield* call(getSigner)
    const userAddress = yield* call(getAddress)
    const userBalance = yield* call(getBalance)
    yield put(actions.setAddress(userAddress))
    yield put(actions.setBalance(userBalance))
    yield put(
      snackbarsActions.add({
        message: 'Ethereum network connected.',
        variant: 'success',
        persist: false
      })
    )
    yield put(actions.setStatus(Status.Initalized))
  } catch (error) {
    yield put(actions.setStatus(Status.Error))
    yield put(actions.setMessage('There was an error'))
  }
}

export function* signerSaga(): Generator {
  yield takeLeading(actions.initSigner, initSigner)
}
