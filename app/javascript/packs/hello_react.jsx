import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { PageHeader, Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const strIsANumber = str => {
  const reg = new RegExp('^[0-9]+$')
  return reg.exec(str)
}

const validateNumber = str => {
  if (str.length > 0) {
    if (strIsANumber(str)) return 'success'
    return 'error'
  }
  return null
}

const Score = ({ blitzCards, cardsInHand }) => (
    <Row>
      <Col xs={12}>
        <h1>
          Your Score:
        </h1>
        <p>
          {(40 - cardsInHand - blitzCards) + (-2 * blitzCards) || 0}
        </p>
      </Col>
    </Row>
)

class ScoreInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardsInHand: '',
      blitzCards: ''
    }
  }

  validateBlitzCards() {
    const { blitzCards } = this.state
    return validateNumber(blitzCards)
  }

  validateCardsInHand() {
    const { cardsInHand } = this.state
    return validateNumber(cardsInHand)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { cardsInHand, blitzCards } = this.state

    return(
      <Grid>
        <h1>
          Dutch Blitz Score Calculator
        </h1>
        <Row className='grid'>
          <Col xs={12}>
            <form>
              <FormGroup
                controlId="cardsInHand"
                validationState={this.validateCardsInHand()}
              >
                <ControlLabel>Cards in Hand</ControlLabel>
                <FormControl
                  type="number"
                  value={cardsInHand}
                  placeholder="Enter number"
                  onChange={e => this.handleChange(e)}
                  name='cardsInHand'
                />
                <FormControl.Feedback />
                <HelpBlock>Please enter a number</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="cardsInHand"
                validationState={this.validateBlitzCards()}
              >
                <ControlLabel>Blitz Cards</ControlLabel>
                <FormControl
                  type="number"
                  value={blitzCards}
                  placeholder="Enter number"
                  onChange={e => this.handleChange(e)}
                  name='blitzCards'
                />
                <FormControl.Feedback />
                <HelpBlock>Please enter a number</HelpBlock>
              </FormGroup>
            </form>
          </Col>
        </Row>
        { 
          (blitzCards || cardsInHand) && (
            <Score blitzCards={blitzCards} cardsInHand={cardsInHand} />
          ) 
        }
      </Grid>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ScoreInput name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
