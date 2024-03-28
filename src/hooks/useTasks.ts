import { getUserTask } from "@/api/getData";
import useGetToken from "@/api/useGetToken";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const useTasks = () => {
  const params = useParams();
  const auth = useAuth();
  const token = useGetToken();
  const userId = auth.userId || null;
  const taskId = params.id || null;
  const query = useQuery({
    queryKey: ["taskLayout", {taskId}],
    queryFn: () => getUserTask(taskId, token, userId),
    enabled: userId !== null && taskId !== null && token !== null,
    staleTime: 60 * 60 * 1000,
  });
  if(!query.data) return null;
  return query.data;
};

export default useTasks;
