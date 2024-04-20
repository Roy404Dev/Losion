import supabase from "@/lib/supabaseClient";

type taskProps = {
  task_id: string;
  user_id: string | undefined | null;
};

type tabProps = {
  tab_id: string;
  user_id: string | undefined | null;
};

export const deleteTask = async ({ task_id, user_id }: taskProps) => {
  if (!task_id || !user_id) throw new Error("task id is missing");
  const client = supabase();
  const { data, error } = await client
    .from("task_list_template")
    .delete()
    .eq("id", task_id)
    .eq("user_id", user_id)
  if (error) return error.message;
  return data;
};

export const deleteTab = async ({ tab_id, user_id }: tabProps) => {
  if (!user_id || !tab_id) return null;
  const client = supabase();
  const { data, error } = await client
    .from("userTabs")
    .delete()
    .eq("id", tab_id)
    .eq("user_id", user_id);
  if (error) return error.message;
  return data;
};
