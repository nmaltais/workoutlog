import * as ActionTypes from './ActionTypes';

export const routines = (state = { isLoading: true,
                                 errMess: null,
                                 routines:[]}, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_ROUTINES:
            return {...state, isLoading: false, errMess: null, routines: action.payload};

        case ActionTypes.ROUTINES_LOADING:
            return {...state, isLoading: true, errMess: null, routines: []}

        case ActionTypes.ROUTINES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.DELETE_ROUTINE:
            return {...state, isLoading:false, errMess: null, routines: state.routines.filter(routine => routine.id != action.payload)}
            
        case ActionTypes.REMOVE_EXERCISE_FROM_ROUTINE:

            let newRoutines = state.routines.map(routine => {
                if(routine.id == action.payload.routineID){
                    routine.exercises = routine.exercises.filter(exercise => exercise.exerciseID != action.payload.exerciseID);
                }
                return routine;
            });
            return {...state, isLoading: false, errMess: null, routines: newRoutines };
        default:
          return state;
      }
};
