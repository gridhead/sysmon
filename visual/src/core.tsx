import { BrowserRouter, Route, Routes } from "react-router";

import Disk from "./path/disk.tsx";
import Memo from "./path/memo.tsx";
import MainMenu from "./path/menu.tsx";
import Ntwk from "./path/ntwk.tsx";
import Over from "./path/over.tsx";
import Proc from "./path/proc.tsx";
import Task from "./path/task.tsx";

export default function Core() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainMenu />} path="/">
            <Route element={<Over />} index />
            <Route element={<Task />} path="/task" />
            <Route element={<Proc />} path="/proc" />
            <Route element={<Memo />} path="/memo" />
            <Route element={<Ntwk />} path="/ntwk" />
            <Route element={<Disk />} path="/disk" />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*<MainMenu />*/}
    </>
  );
}
