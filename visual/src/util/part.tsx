import { createSlice } from "@reduxjs/toolkit";

import { ObtainRandomTint } from "./rand.tsx";

const initstet = {
  freq: 1000,
  vibe: "#008080",
  proc: {
    load: {
      time_01: 0.0,
      time_05: 0.0,
      time_15: 0.0,
    },
    stat: {
      call: 0,
      ctxt: 0,
      hirq: 0,
      sirq: 0,
    },
    full: {
      core: 0,
      data: {},
    },
    unit: {
      cent: 0,
      core: 0,
      freq: { base: 0.0, curt: 0.0, peak: 0.0 },
      meta: { arch: "Absent", vend: "Absent", name: "Absent", freq: "0.0 MHz", core: 0, flag: [] },
      time: {
        absolute: { idle: 0.0, intr: 0.0, syst: 0.0, user: 0.0 },
        relative: { idle: 0.0, intr: 0.0, syst: 0.0, user: 0.0 },
      },
    },
    rcrd: {
      unit: {
        freqlist: [],
        centlist: [],
      },
      full: {
        freqlist: [],
        centlist: [],
      },
      tint: [],
      iden: 20,
    },
  },
  memo: {
    physical: {
      absolute: { avbl: 0, full: 0, used: 0 },
      relative: 0.0,
    },
    overflow: {
      absolute: { avbl: 0, full: 0, used: 0 },
      relative: 0.0,
      stream: { external: 0, internal: 0 },
    },
    rcrd: {
      physical: [],
      overflow: [],
      iden: 20,
    },
  },
  disk: {
    part: {
      numb: 0,
      data: {},
    },
    numb: {
      numb: { rd: 0, wt: 0 },
      size: { rd: 0, wt: 0 },
      time: { rd: 0, wt: 0 },
    },
    rcrd: {
      numb: [],
      size: [],
      time: [],
      iden: 20,
      tint: { rd: "", wt: "" },
    },
  },
};

export const makeunit = createSlice({
  name: "area",
  initialState: initstet,
  reducers: {
    makeFreq: (area, freq) => {
      area.freq = freq.payload;
    },
    makeProcLoad: (area, procLoad) => {
      area.proc.load = procLoad.payload;
    },
    makeProcStat: (area, procStat) => {
      area.proc.stat = procStat.payload;
    },
    makeProcFull: (area, procFull) => {
      area.proc.full = procFull.payload;
    },
    makeProcUnit: (area, procUnit) => {
      area.proc.unit = procUnit.payload;
    },
    makeProcRcrd: (area) => {
      if (
        area.proc.rcrd.unit.freqlist.length === area.proc.rcrd.iden &&
        area.proc.rcrd.unit.centlist.length === area.proc.rcrd.iden &&
        area.proc.rcrd.full.freqlist.length === area.proc.rcrd.iden &&
        area.proc.rcrd.full.centlist.length === area.proc.rcrd.iden
      ) {
        area.proc.rcrd.unit.freqlist.shift();
        area.proc.rcrd.unit.centlist.shift();
        area.proc.rcrd.full.freqlist.shift();
        area.proc.rcrd.full.centlist.shift();
      }
      const time = new Date().toISOString();
      area.proc.rcrd.unit.freqlist.push({ time: time, freq: area.proc.unit.freq.curt });
      area.proc.rcrd.unit.centlist.push({ time: time, cent: area.proc.unit.cent });

      const freqlist_item = Object.fromEntries(
        Object.entries(area.proc.full.data).map(([item, data]) => [`Core ${item}`, data.freq.curt])
      );
      freqlist_item["time"] = time;
      area.proc.rcrd.full.freqlist.push(freqlist_item);

      const centlist_item = Object.fromEntries(
        Object.entries(area.proc.full.data).map(([item, data]) => [`Core ${item}`, data.cent])
      );
      centlist_item["time"] = time;
      area.proc.rcrd.full.centlist.push(centlist_item);
    },
    makeProcTint: (area) => {
      if (area.proc.rcrd.tint.length === 0 && area.proc.full.core !== 0) {
        Array.from({ length: area.proc.full.core }).forEach(() => {
          area.proc.rcrd.tint.push(ObtainRandomTint());
        });
      }
    },
    makeMemoPhysical: (area, memoPhysical) => {
      area.memo.physical = memoPhysical.payload;
    },
    makeMemoOverflow: (area, memoOverflow) => {
      area.memo.overflow = memoOverflow.payload;
    },
    makeMemoRcrd: (area) => {
      if (
        area.memo.rcrd.physical.length === area.proc.rcrd.iden &&
        area.memo.rcrd.overflow.length === area.proc.rcrd.iden
      ) {
        area.memo.rcrd.physical.shift();
        area.memo.rcrd.overflow.shift();
      }
      const time = new Date().toISOString();
      area.memo.rcrd.physical.push({ time: time, size: area.memo.physical.absolute.used });
      area.memo.rcrd.overflow.push({ time: time, size: area.memo.overflow.absolute.used });
    },
    makeDiskPart: (area, diskPart) => {
      area.disk.part = diskPart.payload;
    },
    makeDiskNumb: (area, diskNumb) => {
      area.disk.numb = diskNumb.payload;
    },
    makeDiskRcrd: (area) => {
      if (
        area.disk.rcrd.numb.length === area.disk.rcrd.iden &&
        area.disk.rcrd.size.length === area.disk.rcrd.iden &&
        area.disk.rcrd.time.length === area.disk.rcrd.iden
      ) {
        area.disk.rcrd.numb.shift();
        area.disk.rcrd.size.shift();
        area.disk.rcrd.time.shift();
      }
      const time = new Date().toISOString();
      area.disk.rcrd.numb.push({ time: time, rd: area.disk.numb.numb.rd, wt: area.disk.numb.numb.wt });
      area.disk.rcrd.size.push({ time: time, rd: area.disk.numb.size.rd, wt: area.disk.numb.size.wt });
      area.disk.rcrd.time.push({ time: time, rd: area.disk.numb.time.rd, wt: area.disk.numb.time.wt });
    },
    makeDiskTint: (area) => {
      if (area.disk.rcrd.tint.rd === "" && area.disk.rcrd.tint.wt === "") {
        area.disk.rcrd.tint.rd = ObtainRandomTint();
        area.disk.rcrd.tint.wt = ObtainRandomTint();
      }
    },
  },
});

export const {
  makeFreq,
  makeProcLoad,
  makeProcStat,
  makeProcFull,
  makeProcUnit,
  makeProcRcrd,
  makeProcTint,
  makeMemoPhysical,
  makeMemoOverflow,
  makeMemoRcrd,
  makeDiskNumb,
  makeDiskPart,
  makeDiskRcrd,
  makeDiskTint,
} = makeunit.actions;

export default makeunit.reducer;
