import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";

const useGetToken = () => {
  const { getToken, userId } = useAuth();
  const query = useQuery<string | null>({
    queryKey: ["token", userId],
    queryFn: () => getToken({ template: "supabase" }),
    staleTime: 60 * 60 * 1000, // 1 hour stale time
  });
  if(query.data) return query.data;
  return null;
};

export default useGetToken;
