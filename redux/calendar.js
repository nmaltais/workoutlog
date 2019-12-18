import * as ActionTypes from './ActionTypes';

export const calendar = (state = { isLoading: true,
                                 errMess: null,
                                 dates:[]}, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_CALENDAR:
            return {...state, isLoading: false, errMess: null, dates: action.payload};

        case ActionTypes.CALENDAR_LOADING:
            return {...state, isLoading: true, errMess: null, dates: []}

        case ActionTypes.CALENDAR_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_ROUTINE_TO_CALENDAR:

            let isUpdated = false;
            let newDates = state.dates;
            newDates.forEach(date => {
                if(date.date == action.payload.dateString){
                    date.routineID = action.payload.routineID;
                    date.actualWorkout = [];
                    isUpdated = true;
                }
            });
            if(!isUpdated){
                let newDate = {
                    date : action.payload.dateString,
                    routineID : action.payload.routineID,
                    actualWorkout : []
                }
                newDates = state.dates.concat(newDate);
            }
            
            return {...state, isLoading: false, errMess: null, dates: newDates}
        default:
          return state;
      }
};
