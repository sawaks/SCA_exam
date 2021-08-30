import { useEffect } from 'react';

export default function EasterEgg() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`%c
    __    _      __            
   / /   (_)____/ /_____  _____
  / /   / / ___/ __/ __ \\/ ___/
 / /___/ (__  ) /_/ / / / /    
/_____/_/____/\\__/_/ /_/_/     
    `, 'font-family:monospace');
  }, []);

  return null;
}
