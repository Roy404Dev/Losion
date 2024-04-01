// export const modifyTask = async () => {

import supabase from "@/lib/supabaseClient";

// }

type taskType = {
  token?: string;
  user_id: any;
  table_name: string;
  emoji: string;
  property: string;
  status: string;
  tab_id: string;
  task_id: string;
};

type tabType = {
  id: string;
  emoji: string;
  name: string;
  user_id: string;
};

export const modifyTask = async ({
  table_name,
  property,
  status,
  user_id,
  emoji,
  tab_id,
  task_id,
}: taskType) => {
  const client = supabase();
  const { data, error } = await client.from("task_list_template").upsert({
    id: task_id,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    table_name: table_name,
    property: property,
    status: status,
    user_id: user_id,
    emoji: emoji,
    tab_id: tab_id,
  });
  if (error) {
    console.error(error.message);
  }
  return data;
};

export const modifyTabAPI = async ({ name, user_id, emoji, id}: tabType) => {
  const client = supabase();
  const { data, error } = await client.from("userTabs").upsert({
    id: id,
    emoji: emoji,
    name: name,
    user_id: user_id,
    modified_at: new Date().toISOString(),
  });
  if (error) {
    console.error(error.message);
  }
  return data;
};
