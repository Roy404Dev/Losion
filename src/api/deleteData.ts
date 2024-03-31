import createClerkSupabaseClient from "@/lib/supabaseClient";
import { useAuth } from "@clerk/clerk-react";

type taskProps = {
  task_id: string;
};

type tabProps = {
  tab_id: string;
  user_id: string;
};

export const deleteTask = async ({ task_id }: taskProps) => {
  if (!task_id) throw new Error("task id is missing");
  const client = createClerkSupabaseClient();
  const { data, error } = await client
    .from("task_list_template")
    .delete()
    .eq("id", task_id);
  //TODO need check also user id

  if (error) return error.message;
  return data;
};

export const deleteTab = async ({ tab_id, user_id }: tabProps) => {
  if (!user_id || !tab_id) return null;
  const client = createClerkSupabaseClient();
  const { data, error } = await client
    .from("userTabs")
    .delete()
    .eq("id", tab_id)
    .eq("user_id", user_id);
  if (error) return error.message;
  return data;
};
