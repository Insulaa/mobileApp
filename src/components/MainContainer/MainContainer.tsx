import React, {useState, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {Button} from '@material-ui/core';
import Typography from '../Typography/Typography';
import {actions as userActions} from '../../redux/userStore';

const MainContainer = () => {
  const dispatch = useDispatch();

  const {
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
  } = useSelector((state: RootState) => state.userStore);

  return (
    <div>
      <Typography variant="b2-bold">HI</Typography>
    </div>
  );
};

export default MainContainer;
