import { RootState } from '../store';

export const selectSidebarRightVisibility = (state: RootState): boolean => 
  state.sidebarRight.sidebarRightVisibility;