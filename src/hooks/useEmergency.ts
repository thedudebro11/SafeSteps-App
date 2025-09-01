import React from 'react';
import { startEmergency, stopEmergency } from '../lib/api';
import { useBackgroundLocation } from './useBackgroundLocation';
export function useEmergency() {
  const [active, setActive] = React.useState(false);
  const { start, stop } = useBackgroundLocation();
  const begin = async () => { await startEmergency(); await start(7, true); setActive(true); };
  const end = async () => { await stopEmergency(); await stop(); setActive(false); };
  return { active, begin, end };
}
