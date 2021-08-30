import { useState, useEffect } from 'react';

function installPWAPrompt() {
  const [prompt, setInstallPromptEvent] = useState(null);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      // eslint-disable-next-line no-console
      console.error('"beforeinstallprompt" event did not run. The user may already have the app installed.')
    );
  };

  useEffect(() => {
    const onReady = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', onReady);

    return () => {
      window.removeEventListener('beforeinstallprompt', onReady);
    };
  }, []);

  return [prompt, promptToInstall];
}

export default installPWAPrompt;
