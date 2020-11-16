import React, {useState, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {Button} from '@material-ui/core';
import Typography from '../Typography/Typography';
import {actions as userActions} from '../../redux/userStore';
import {Text} from 'react-native';
const MainContainer = () => {
  const dispatch = useDispatch();

  const {
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
  } = useSelector((state: RootState) => state.userStore);

  return <Text>HI</Text>;
};

export default MainContainer;
