import useTasks from "@/hooks/useTasks";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TaskType = {
  created_at: string;
  id: string;
  property: string;
  status: string;
  tab_id: string;
  table_name: string;
  user_id: string;
  order: number | null;
  emoji?: string;
};

export type TasksState = {
  tasks: TaskType[];
};

const initialState: TasksState = {
  tasks: [
    {
      created_at: "",
      id: "",
      property: "",
      status: "",
      tab_id: "",
      table_name: "",
      user_id: "",
      order: null,
    },
  ],
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const tasks = useTasks();
  return tasks;

  // extraReducers: (builder) => {
  //   builder.addCase(fetchTasks.fulfilled, (state, action) => {
  //     if (action.payload != undefined && action.payload) {
  //       state.tasks = [...state.tasks, ...action.payload.tasks];
  //     }
  //   });
  // },
});

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addNewTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    modifyTasks: (state, action: PayloadAction<TaskType>) => {
      //Filter tasks
      const filtered = state.tasks.filter(task => task.id !== action.payload.id)
      state.tasks = [...filtered, {...action.payload}];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      if (action.payload != null) {
        state.tasks = action.payload;
      }
    });
  },
});

export const { addNewTasks, modifyTasks } = taskSlice.actions;
export default taskSlice.reducer;
