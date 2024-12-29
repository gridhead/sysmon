import {
  AccessTime,
  Alarm,
  Contrast,
  Download,
  GridView,
  History,
  Notifications,
  Percent,
  PieChart,
  Storage,
  SwapHoriz,
  TableChart,
  Tag,
} from "@mui/icons-material";
import { CardHeader, Grid2 as Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RCTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { makeProcFull, makeProcLoad, makeProcRcrd, makeProcStat, makeProcTint, makeProcUnit } from "../util/part.tsx";

export default function Proc() {
  const dispatch = useDispatch();
  const freq = useSelector((area) => area.area.freq);
  const proc = useSelector((area) => area.area.proc);
  const vibe = useSelector((area) => area.area.vibe);

  const obtain_data = useCallback(async () => {
    const intervalLoad = fetch("/proc/load", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const intervalStat = fetch("/proc/stat", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const intervalFull = fetch("/proc/full", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const intervalUnit = fetch("/proc/unit", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const [dataLoad, dataStat, dataFull, dataUnit] = await Promise.all([
      intervalLoad,
      intervalStat,
      intervalFull,
      intervalUnit,
    ]);
    dispatch(makeProcLoad(dataLoad));
    dispatch(makeProcStat(dataStat));
    dispatch(makeProcFull(dataFull));
    dispatch(makeProcUnit(dataUnit));
    dispatch(makeProcRcrd());
    dispatch(makeProcTint());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(obtain_data, freq);

    return () => {
      clearInterval(interval);
    };
  }, [obtain_data, freq]);

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid container size={{ xs: 12 }}>
            <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: vibe }}>
                    <PieChart />
                  </Avatar>
                }
                action={
                  <IconButton disabled={true}>
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Tag />
                    </Avatar>
                  </IconButton>
                }
                title={`${proc.unit.meta.name}`}
                subheader={`${proc.unit.meta.vend} (${proc.unit.meta.arch})`}
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Alarm />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${proc.unit.freq.curt.toFixed(2)}MHz`}
                      secondary={`Min. ${proc.unit.freq.base.toFixed(2)}MHz, Max. ${proc.unit.freq.peak.toFixed(2)} MHz`}
                    ></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{`${proc.unit.cent.toFixed(1)}%`}</span>
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid container spacing={2} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Contrast />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <TableChart />
                      </Avatar>
                    </IconButton>
                  }
                  title="Frequency"
                  subheader={`${proc.unit.freq.curt.toFixed(2)}MHz`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={200}>
                    <AreaChart
                      data={proc.rcrd.unit.freqlist}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickCount={20}
                        width={34}
                        domain={[proc.unit.freq.base, proc.unit.freq.peak]}
                      />
                      <RCTooltip
                        formatter={(data) => `${data.toFixed(2)}MHz`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="freq" stroke={vibe} fill={vibe} legendType="none" yAxisId={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Contrast />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <TableChart />
                      </Avatar>
                    </IconButton>
                  }
                  title="Usage"
                  subheader={`${proc.unit.cent.toFixed(2)}%`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={200}>
                    <AreaChart
                      data={proc.rcrd.unit.centlist}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis tick={{ fontSize: 10 }} tickCount={20} width={34} domain={[0, 100]} />
                      <RCTooltip
                        formatter={(data) => `${data.toFixed(2)}%`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="cent" stroke={vibe} fill={vibe} legendType="none" yAxisId={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Contrast />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <TableChart />
                      </Avatar>
                    </IconButton>
                  }
                  title="Frequencies"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={400}>
                    <LineChart
                      data={proc.rcrd.full.freqlist}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickCount={20}
                        width={34}
                        domain={[proc.unit.freq.base, proc.unit.freq.peak]}
                      />
                      <RCTooltip
                        formatter={(data) => `${data.toFixed(2)}MHz`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      {Array.from({ length: proc.full.core }, (_, indx) => (
                        <Line
                          key={indx}
                          type="monotone"
                          dataKey={`Core ${indx}`}
                          stroke={proc.rcrd.tint[indx]}
                          legendType="none"
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Contrast />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <TableChart />
                      </Avatar>
                    </IconButton>
                  }
                  title="Usages"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={400}>
                    <LineChart
                      data={proc.rcrd.full.centlist}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis tick={{ fontSize: 10 }} tickCount={20} width={34} domain={[0, 100]} />
                      <RCTooltip
                        formatter={(data) => `${data.toFixed(2)}%`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      {Array.from({ length: proc.full.core }, (_, indx) => (
                        <Line
                          key={indx}
                          type="monotone"
                          dataKey={`Core ${indx}`}
                          stroke={proc.rcrd.tint[indx]}
                          legendType="none"
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Alarm />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <Percent />
                      </Avatar>
                    </IconButton>
                  }
                  title="Cycles"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    {Object.keys(proc.full.data).length > 0 ? (
                      Object.entries(proc.full.data).map(([item, data]) => (
                        <ListItem key={item} disableGutters={true} disablePadding={true} dense={true}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: proc.rcrd.tint[item] }}>
                              {item}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${data.freq.curt.toFixed(2)}MHz`}
                            secondary={`Min. ${data.freq.base.toFixed(2)}MHz, Max. ${data.freq.peak.toFixed(2)}MHz`}
                          ></ListItemText>
                          <IconButton edge="end" disabled={true}>
                            <span className="dataelem">{data.cent.toFixed(1)}%</span>
                          </IconButton>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem disableGutters={true} disablePadding={true} dense={true}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>!</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Loading data" secondary="Please wait"></ListItemText>
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Alarm />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <Percent />
                      </Avatar>
                    </IconButton>
                  }
                  title="Efficiency"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    {Object.keys(proc.full.data).length > 0 ? (
                      Object.entries(proc.full.data).map(([item, data]) => (
                        <ListItem key={item} disableGutters={true} disablePadding={true} dense={true}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: proc.rcrd.tint[item] }}>
                              {item}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`Idle. ${data.time.relative.idle}%, System calls. ${data.time.relative.intr}%`}
                            secondary={`Kernel mode. ${data.time.relative.syst}%, User mode. ${data.time.relative.user}%`}
                          ></ListItemText>
                          <IconButton edge="end" disabled={true} className="dataelem">
                            #
                          </IconButton>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem disableGutters={true} disablePadding={true} dense={true}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>!</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Loading data" secondary="Please wait"></ListItemText>
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <PieChart />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <Tag />
                      </Avatar>
                    </IconButton>
                  }
                  title="Statistics"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <SwapHoriz />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Context switches" secondary={`${proc.stat.ctxt} instances`}></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">#</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <Notifications />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="System calls" secondary={`${proc.stat.call} instances`}></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">#</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <Storage />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Hardware interrupts"
                        secondary={`${proc.stat.hirq} instances`}
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">#</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <GridView />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Software interrupts"
                        secondary={`${proc.stat.sirq} instances`}
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">#</span>
                      </IconButton>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Card sx={{ width: "100%", marginTop: 0, padding: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: vibe }}>
                      <Download />
                    </Avatar>
                  }
                  action={
                    <IconButton disabled={true}>
                      <Avatar sx={{ bgcolor: vibe }}>
                        <AccessTime />
                      </Avatar>
                    </IconButton>
                  }
                  title="Load"
                  subheader={`Across ${proc.full.core} logical processor(s)`}
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <History />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Last one minute"
                        secondary={`${proc.load.time_01.toFixed(2)}% load`}
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">01m</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <History />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Last five minutes"
                        secondary={`${proc.load.time_05.toFixed(2)}% load`}
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">05m</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} style={{ paddingTop: "0px", paddingBottom: "0px" }} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                          <History />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Last fifteen minutes"
                        secondary={`${proc.load.time_15.toFixed(2)}% load`}
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">15m</span>
                      </IconButton>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
