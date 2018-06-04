import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Modal } from '../../components'
import * as modalActionCreators from '../../redux/modules/modal'
import * as ducksActionCreators from '../../redux/modules/ducks'

const mapStateToProps = ({ modal, users }) => {
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)
