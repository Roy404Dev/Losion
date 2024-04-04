import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any;
  }
}

const supabaseOptions: SupabaseAuthClientOptions = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const client = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  {
    global: {
      // Get the Supabase token with a custom fetch method
      fetch: async (url, options = {}) => {
        const clerkToken = await window.Clerk.session?.getToken({
          template: "supabase",
        });

        // Construct fetch headers
        const headers = new Headers(options?.headers);
        headers.set("Authorization", `Bearer ${clerkToken}`);

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
    auth: supabaseOptions,
  }
);

const supabase = () => client;

export default supabase;

// export const supabaseClerk = () => createClerkSupabaseClient;
