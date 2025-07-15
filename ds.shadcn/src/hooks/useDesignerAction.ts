import { useDesignerContext } from "./useDesignerContext";
import { Action } from "./useDesigner";

/**
 * Hook to get a function to dispatch actions to the designer state.
 */
export const useDesignerAction = () => {
  const { dispatch } = useDesignerContext();
  return (action: Action) => dispatch(action);
};
