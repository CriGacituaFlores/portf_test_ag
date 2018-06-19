import { apiFetch } from '../services/api';
import { teamActions } from '../constants/actions';

function teamIsLoading() {
  return {
    type: teamActions.TEAM_IS_LOADING,
    teamIsLoading: true,
  };
}

function teamError(error) {
  return {
    type: teamActions.TEAM_ERROR,
    teamError: error,
  };
}

function setTeam(team) {
  return {
    type: teamActions.TEAM,
    team,
  };
}

export default function getUserList() {
  return (dispatch) => {
    dispatch(teamIsLoading());
    const _request = {
      method: 'GET',
      url: '/users/',
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setTeam(_body));
      })
      .catch(() => {
        dispatch(teamError({ message: 'Something went wrong getting team data' }));
      });
  };
}
