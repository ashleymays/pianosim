import { useAppSelector, useAppDispatch } from '~/features/hooks';
import { loadInstruments } from '~/features/instruments';

export const useInstrumentNames = () => {
  const instrumentNames = useAppSelector((state) => state.instruments.names);
  const dispatch = useAppDispatch();

  const loadInstrumentNames = () => {
    return dispatch(loadInstruments()).unwrap();
  };

  return { instrumentNames, loadInstrumentNames };
};