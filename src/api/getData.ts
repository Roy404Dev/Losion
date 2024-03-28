import createClerkSupabaseClient from "@/lib/supabaseClient";
import { TaskType } from "@/state/taskSlice/taskSlice";

export const getData = async () => {
  const client = createClerkSupabaseClient();
  const { data: todo } = await client.from("userTasks").select();
  return todo;
};

export const getTabs = async (userId: string) => {
  const client = createClerkSupabaseClient();
  const { data: tabData } = await client
    .from("userTabs")
    .select()
    .eq("user_id", userId);

  return tabData;
};

export const getUserTask = async (
  taskId: string | null,
  token: string | null,
  userId: string | null
): Promise<TaskType[]> => {
  if (!token) {
    console.error("Token is missing");
    throw new Error("Token is missing");
  }
  try {
    const client = createClerkSupabaseClient();
    const { data: task } = await client
      .from("task_list_template")
      .select()
      .eq("tab_id", taskId)
      .eq("user_id", userId);
    return task || [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
