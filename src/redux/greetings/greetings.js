const FETCH_STARTED = 'hello-rails-react/greetings/FETCH_STARTED';
const FETCH_COMPLETED = 'hello-rails-react/greetings/FETCH_COMPLETED';
const FETCH_FAILED = 'hello-rails-react/greetings/FETCH_FAILED';
const initial = {
  status: 'App started',
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return {
        status: 'Fetching',
      };
    case FETCH_COMPLETED:
      return {
        status: 'Fullfilled',
        message: action.payload,
      };
    case FETCH_FAILED:
      return {
        status: 'Failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchStarted = () => ({
  type: FETCH_STARTED,
});

const fetchCompleted = (message) => ({
  type: FETCH_COMPLETED,
  payload: message,
});

const fetchFailed = (failure) => ({
  type: FETCH_FAILED,
  payload: failure,
});


export const fetchGreetings = () => async (dispatch) => {
  dispatch(fetchStarted);

  try {
    const response = await fetch('/api/v1/greeting');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const { message } = await response.json();
    dispatch(fetchCompleted(message));
  } catch (error) {
    dispatch(fetchFailed(error));
  }
};

export default reducer;
