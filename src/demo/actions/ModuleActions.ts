import ModuleActionTypes from '../constants/action-types/ModuleActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export function moduleChanged(globModule) {
  AppDispatcher.dispatch({
    globModule,
    type: ModuleActionTypes.MODULE_CHANGED,
  });
}
