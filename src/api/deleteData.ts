import createClerkSupabaseClient from "@/lib/supabaseClient";

type taskProps = {
  task_id: string;
};

export const deleteTask = async ({ task_id }: taskProps) => {
  if(!task_id) throw new Error("task id is missing");
  const client = createClerkSupabaseClient();
  const { data, error } = await client
    .from("task_list_template")
    .delete()
    .eq("id", task_id);
  if(error) return error.message;
  return data;
};
