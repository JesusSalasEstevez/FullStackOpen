import {useState} from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

}

export default Toggable