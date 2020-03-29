import React, { useState, useEffect } from 'react'
import List from './components/BearList'
import Input from './components/InputForm';
import { useSelector, useDispatch } from 'react-redux';
import { bearActions } from './redux/store'
import { bindActionCreators } from 'redux';
export default () => {

  const actions = bindActionCreators(bearActions, useDispatch());
 
  useEffect(() => {
    actions.getBears()
  }, [])

  return (
    <div>
      <h2>ApiBears</h2>
      <List />
      <Input />
    </div>
  )
}
