import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { backendLink } from '../../keys_dev'
import Alert from '../Layout/Alert'
import { ReactDatez, ReduxReactDatez } from 'react-datez'
import 'react-datez/dist/css/react-datez.css'
import '../../Stylesheets/SendReplacementReq.css'
import { Form } from 'react-bootstrap'
export default function AccidentalSendReplacementReq(props) {
  const token = useSelector((state) => state.token)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [problem, setProblem] = useState('')
  const [err, setErr] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const [msg] = useState('Request Sent Successfully')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const sendRequest = () => {
    setErr('')
    if (!startDate) {
      setErr('Start Target Date field can not be empty')
    }
    if (!endDate) {
      setErr('End Target Date field can not be empty')
    }
    if (startDate && endDate && !reason) {
      axios({
        url: `${backendLink}/leave/sendLeaveRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          // replacementRequestId: ['5fde5989e2520ebd2b44623f'],
          targetStartDate: startDate,
          targetEndDate: endDate,
          type: 'accidental',
          //documentUrl: 'https://www.facebook.com',
          //reason: 'because',
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setShowAlert(true)
            props.setShow(false)
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (startDate && endDate && reason) {
      axios({
        url: `${backendLink}/leave/sendLeaveRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          // replacementRequestId: ['5fde5989e2520ebd2b44623f'],
          targetStartDate: startDate,
          targetEndDate: endDate,
          type: 'accidental',
          //documentUrl: 'https://www.facebook.com',
          reason: reason,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setShowAlert(true)
            props.setShow(false)
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    setStartDate('')
    setEndDate('')
    setReason('')
    setProblem('')
    setErr('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])

  return (
    <div className="SendReplacementReq">
      <Modal show={props.show} centered size="lg" onHide={props.handleClose}>
        <Modal.Header
          closeButton
          style={{ borderBottom: '0px' }}
          className="notRotatedTitle"
        >
          Send Accidental Leave Request
        </Modal.Header>
        <Modal.Body>
          <table className="SendReplacementReqDatetable">
            <tbody>
              <Form.Group>
                <tr>
                  <td className="SendLeaveReqCol3">
                    <Form.Label
                      column
                      sm="12"
                      className="SendReplacementReqGeneral"
                    >
                      Target Start Date:*
                    </Form.Label>
                  </td>
                  <td className="SendLeaveReqCol3">
                    <Form.Label
                      column
                      sm="12"
                      className="SendReplacementReqGeneral"
                    >
                      Target End Date:*
                    </Form.Label>
                  </td>
                </tr>
                <tr>
                  <td className="SendLeaveReqCol3">
                    <div className="form-group">
                      <div className="form-group">
                        <ReactDatez
                          className="SendLeaveReqDate"
                          name="dateInput"
                          handleChange={(e) => setStartDate(e.split('T')[0])}
                          value={startDate}
                          component={ReduxReactDatez}
                          displayCalendars={1}
                          highlightWeekends={false}
                          firstDayOfWeek="Sa"
                          allowPast={true}
                          position="center"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="SendLeaveReqCol3">
                    <div className="form-group">
                      <div className="form-group">
                        <ReactDatez
                          className="SendLeaveReqDate"
                          name="dateInput"
                          handleChange={(e) => setEndDate(e.split('T')[0])}
                          value={endDate}
                          component={ReduxReactDatez}
                          displayCalendars={1}
                          highlightWeekends={false}
                          allowPast={true}
                          firstDayOfWeek="Sa"
                          position="center"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </Form.Group>
            </tbody>
          </table>

          <table>
            <tbody>
              <Form.Group>
                <tr>
                  <td className="SendReplacementReqCol1">
                    <Form.Label column className="SendReplacementReqGeneral">
                      {' '}
                      Reason:
                    </Form.Label>
                  </td>
                  <td className="SendChangeDayReqCol2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="SendChangeDayReqForm"
                      onChange={(e) => setReason(e.target.value)}
                    ></Form.Control>
                  </td>
                </tr>
              </Form.Group>
              <tr>
                <td colSpan="5" className="SendReplacementReq3">
                  {err ? (
                    <div className="SendReplacementReqError">{err}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  {problem ? (
                    <div className="SendReplacementReqProblem">{problem}</div>
                  ) : (
                    <Button
                      className="SendReplacementReqButton"
                      onClick={sendRequest}
                    >
                      Send{' '}
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <Alert
        showAlert={showAlert}
        severity="success"
        msg={msg}
        handleClose={handleCloseAlert}
      />
    </div>
  )
}
