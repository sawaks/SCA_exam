import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useRouterServer(url) {
  const router = useRouter();

  useEffect(() => {
    router.push(url);
  }, []);
}
