import React, {useState} from 'react'
import styled from 'styled-components'
import { Container } from '../../components'
import triggers from '../../store/staticTriggers'
import actions from '../../store/staticActions'
import getCardViaType from '../../utils/getCardViaType'
import Button from '@material-ui/core/Button';

const Scrollable = styled.div`
  height: 100%;
  max-height: 800px;
  overflow: scroll;
`
const StyledButton = styled(Button)`
  margin-top: 20px !important;
  color: ${({ theme }) => theme.white } !important;
  font-weight: 900 !important;
  border-color: ${({ theme }) => theme.white } !important;
`
const CreateButton = (props) => <StyledButton 
  variant="outlined" 
  fullWidth
  {...props}>
  Create
</StyledButton>

export default () => {
  const [selectedTrigger, setSelectedTrigger] = useState({})
  const [selectedAction, setSelectedAction] = useState({})
  const handleChange = (values, name, cardType) => {
    console.log('values, name, cardType', values, name, cardType)
    if(cardType === 'action') setSelectedAction({ type: name, ...values })
    if(cardType === 'trigger') setSelectedTrigger({ type: name, ...values })
  }

  const handleClick = () => {
    console.log(selectedTrigger, selectedAction)
  }

  return <Container className='flex'>
    <div className='mr20'>
      <h2>Select Trigger</h2>
      <Scrollable>
        {triggers.map(trigger => {
          const TriggerCard = getCardViaType(trigger.type) 
          return <TriggerCard 
            onClick={()=>setSelectedTrigger({type: trigger.type})}
            enableInputs={trigger.type === selectedTrigger.type} 
            disabled={selectedTrigger.type && trigger.type !== selectedTrigger.type} 
            onChange={handleChange}
            key={trigger.type} 
            className='mb10 pointer' />
        })}
      </Scrollable>
    </div>
    <div>
      <h2>Select Action</h2>
      <Scrollable>
        {actions.map(action=> {
          const ActionCard = getCardViaType(action.type) 
          return <ActionCard
            onClick={()=>setSelectedAction({type: action.type})}
            enableInputs={action.type === selectedAction.type} 
            disabled={selectedAction.type && (action.type !== selectedAction.type)} 
            key={action.type} 
            onChange={handleChange}
            className='mb10 pointer'>
              {selectedAction.type && selectedTrigger.type && <CreateButton onClick={handleClick} />}
            </ActionCard>
        })}
      </Scrollable>
      </div>
    </Container>
}