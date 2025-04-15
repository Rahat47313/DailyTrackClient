import { RootState } from "../store";

export const selectNavAndSideVisibility = (state: RootState) => state.navAndSide.navAndSideVisibility;