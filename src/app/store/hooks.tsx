// typificate hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>(); // typificate version of useDispatch. Ensures that dispatch only takes correct actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // typificate version of useSelector. Indicates auto-completion and type checking when selecting data from a state
