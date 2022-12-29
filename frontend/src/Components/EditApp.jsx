import { useState } from 'react'

export const EditApp = ({ appData }) => {
  const [editForm, setEditForm] = useState({
    interview: false,
    phoneScreening: false,
    accepted: false,
    denied: false
  })


  return (
    <div>
      <h4>edit</h4>
      <input type="radio" name='interview'  />
    </div>
  )
}
