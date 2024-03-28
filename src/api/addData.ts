import createClerkSupabaseClient from "@/lib/supabaseClient";

type taskType = {
  id: string;
  user_id: any;
  table_name: string;
  emoji: string;
  property: string;
  status: string;
  tab_id: string;
};

type AddPageType = {
  userId: any;
  name: string;
  emoji: string;
  template_id: number;
};

export const AddPage = async ({
  userId,
  name,
  emoji,
  template_id,
}: AddPageType) => {
  const client = createClerkSupabaseClient();
  const { data, error } = await client.from("userTabs").insert({
    created_at: new Date().toISOString(),
    emoji: emoji,
    name: name,
    user_id: userId,
    template_id: template_id,
  });

  if (error) {
    console.error("Error inserting data:", error.message);
    return null; // Handle error appropriately
  }

  return data;
};

export const addTask = async ({
  id,
  table_name,
  property,
  status,
  user_id,
  emoji,
  tab_id,
}: taskType) => {
  const client = createClerkSupabaseClient();
  const { data, error } = await client.from("task_list_template").insert({
    id: id,
    created_at: new Date().toISOString(),
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

export const modifyTab = async ({
  name,
  userId,
  emoji,
  template_id,
}: AddPageType) => {
  const client = createClerkSupabaseClient();
  let updateObject: any = {};

  if (name !== undefined) {
    updateObject.name = name;
  }
  if (emoji !== undefined) {
    updateObject.emoji = emoji;
  }
  if (template_id !== undefined) {
    updateObject.template_id = template_id;
  }
  const { data, error } = await client
    .from("userTabs")
    .update(updateObject)
    .eq("userId", userId);

  if (error) {
    console.error("Error updating data:", error.message);
    return null;
  }

  return data;
};
