const UserReducer = (state, action) => {
  const ReducerMonad = action => {
    return {
      map: ({ type, func }) => {
        if (action.type === type) {
          state = func(state, action.payload);
        }
        return ReducerMonad(action);
      },
      flatMap: ({ type, func }) => {
        if (action.type === type) {
          state = func(state, action.payload);
        }
        return state;
      },
      value: () => state,
    };
  };

  return ReducerMonad(action) //
    .map({
      type: 'CREATE_USER',
      func: (state, payload) => ({ ...state, [payload.id]: payload }),
    })
    .map({
      type: 'RENAME_USER',
      func: (state, payload) => ({ ...state, [payload.id]: { ...state[payload.id], name: payload.name } }),
    })
    .value();
};

const INITIAL_STATE = {};
const state1 = UserReducer(INITIAL_STATE, { type: 'CREATE_USER', payload: { id: '100', name: 'John Doe' } });
console.log('state1:', state1);
const state2 = UserReducer(state1, { type: 'CREATE_USER', payload: { id: '200', name: 'Richard Roe' } });
console.log('state2:', state2);
const state3 = UserReducer(state2, { type: 'RENAME_USER', payload: { id: '100', name: 'Johnny Doe' } });
console.log('state3:', state3);
