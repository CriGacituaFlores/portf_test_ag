import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

import auth from './auth';
import me from './me';
import login from './login';
import signup from './signup';
import team from './team';
import user, { updateUser, createUser } from './user';
import { fieldList, fieldSensors, fieldDegreedays } from './field';
import weather from './weather';

export default combineReducers({
  auth,
  me,
  login,
  signup,
  team,
  user,
  updateUser,
  createUser,
  fieldList,
  fieldSensors,
  fieldDegreedays,
  weather,
  form: reducer
});
