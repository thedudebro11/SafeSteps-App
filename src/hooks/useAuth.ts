import React from 'react';
import { supabase } from '../lib/supabase';
export function useAuth() {
  const [initializing, setInitializing] = React.useState(true);
  const [session, setSession] = React.useState<import('@supabase/supabase-js').Session | null>(null);
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session ?? null); setInitializing(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    return () => { sub.subscription.unsubscribe(); };
  }, []);
  return { session, initializing };
}
