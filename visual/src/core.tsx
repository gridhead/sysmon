import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import packInfo from "../package.json";
import Disk from "./path/disk.tsx";
import Memo from "./path/memo.tsx";
import MainMenu from "./path/menu.tsx";
import Ntwk from "./path/ntwk.tsx";
import Over from "./path/over.tsx";
import Proc from "./path/proc.tsx";
import Task from "./path/task.tsx";

export default function Core() {
  useEffect(() => {
    document.title = `Observer v${packInfo.version}`;
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainMenu />} path="/">
            <Route element={<Over />} index />
            <Route element={<Task />} path="/page_task" />
            <Route element={<Proc />} path="/page_proc" />
            <Route element={<Memo />} path="/page_memo" />
            <Route element={<Ntwk />} path="/page_ntwk" />
            <Route element={<Disk />} path="/page_disk" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
