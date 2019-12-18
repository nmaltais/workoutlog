import * as ActionTypes from './ActionTypes';

export const exercises = (state = { isLoading: true,
                                 errMess: null,
                                 exercises:[]}, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_EXERCISES:
            return {...state, isLoading: false, errMess: null, exercises: action.payload};

        case ActionTypes.EXERCISES_LOADING:
            return {...state, isLoading: true, errMess: null, exercises: []}

        case ActionTypes.EXERCISES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
