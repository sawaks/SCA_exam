
export const FEATURE_SWITCH_ADD_FLAGS = 'FEATURE_SWITCH_ADD_FLAGS';

export function addFlags(flags) {
  return async dispatch => dispatch({
    type: FEATURE_SWITCH_ADD_FLAGS,
    flags,
  });
}
