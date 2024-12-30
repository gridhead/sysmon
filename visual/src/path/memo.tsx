import { Contrast, Memory, PieChart, TableChart, Tag } from "@mui/icons-material";
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
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip as RCTooltip } from "recharts";

import { EaseSize } from "../util/conv.tsx";
import { makeMemoOverflow, makeMemoPhysical, makeMemoRcrd } from "../util/part.tsx";

export default function Memo() {
  const dispatch = useDispatch();
  const freq = useSelector((area) => area.area.freq);
  const memo = useSelector((area) => area.area.memo);
  const vibe = useSelector((area) => area.area.vibe);

  const obtain_data = useCallback(async () => {
    const intervalPhysical = fetch("/memo/physical", { method: "GET", credentials: "include" }).then(
      async (response) => {
        if (response.status === 200) {
          return await response.json();
        }
      }
    );

    const intervalOverflow = fetch("/memo/overflow", { method: "GET", credentials: "include" }).then(
      async (response) => {
        if (response.status === 200) {
          return await response.json();
        }
      }
    );

    const [dataPhysical, dataOverflow] = await Promise.all([intervalPhysical, intervalOverflow]);
    dispatch(makeMemoPhysical(dataPhysical));
    dispatch(makeMemoOverflow(dataOverflow));
    dispatch(makeMemoRcrd());
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
          <Grid container size={{ xs: 12, md: 6, lg: 6 }}>
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
                title="Memory"
                subheader="Physical"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.physical.absolute.full)} secondary="Total"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">100.0%</span>
                    </IconButton>
                  </ListItem>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.physical.absolute.used)} secondary="Used"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{memo.physical.relative.toFixed(1)}%</span>
                    </IconButton>
                  </ListItem>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.physical.absolute.avbl)} secondary="Available"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{(100 - memo.physical.relative).toFixed(1)}%</span>
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid container size={{ xs: 12, md: 6, lg: 6 }}>
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
                title="Memory"
                subheader="Overflow"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.overflow.absolute.full)} secondary="Total"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">100.0%</span>
                    </IconButton>
                  </ListItem>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.overflow.absolute.used)} secondary="Used"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{memo.overflow.relative.toFixed(1)}%</span>
                    </IconButton>
                  </ListItem>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                        <Memory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={EaseSize(memo.overflow.absolute.avbl)} secondary="Available"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{(100 - memo.overflow.relative).toFixed(1)}%</span>
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
                title="Memory"
                subheader="Physical"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <ResponsiveContainer width={"100%"} height={400}>
                  <AreaChart
                    data={memo.rcrd.physical}
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
                      domain={[0, memo.physical.absolute.full]}
                      hide={true}
                    />
                    <RCTooltip
                      formatter={(data) => `${EaseSize(data)}`}
                      contentStyle={{ fontSize: "10px", padding: "6px" }}
                      itemStyle={{ padding: "0" }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="size" stroke={vibe} fill={vibe} legendType="none" yAxisId={0} />
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
                title="Memory"
                subheader="Overflow"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <ResponsiveContainer width={"100%"} height={400}>
                  <AreaChart
                    data={memo.rcrd.overflow}
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
                      domain={[0, memo.overflow.absolute.full]}
                      hide={true}
                    />
                    <RCTooltip
                      formatter={(data) => `${EaseSize(data)}`}
                      contentStyle={{ fontSize: "10px", padding: "6px" }}
                      itemStyle={{ padding: "0" }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="size" stroke={vibe} fill={vibe} legendType="none" yAxisId={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
