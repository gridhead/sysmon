import { Contrast, North, PieChart, South, Storage, TableChart, Tag } from "@mui/icons-material";
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
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip as RCTooltip } from "recharts";

import { EaseSize } from "../util/conv.tsx";
import { makeDiskNumb, makeDiskPart, makeDiskRcrd, makeDiskTint } from "../util/part.tsx";

export default function Disk() {
  const dispatch = useDispatch();
  const freq = useSelector((area) => area.area.freq);
  const disk = useSelector((area) => area.area.disk);
  const vibe = useSelector((area) => area.area.vibe);

  const obtain_data = useCallback(async () => {
    const intervalPart = fetch("/disk/part", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const intervalNumb = fetch("/disk/numb", { method: "GET", credentials: "include" }).then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
    });

    const [dataPart, dataNumb] = await Promise.all([intervalPart, intervalNumb]);
    dispatch(makeDiskPart(dataPart));
    dispatch(makeDiskNumb(dataNumb));
    dispatch(makeDiskRcrd());
    dispatch(makeDiskTint());
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
                title="Occurrences"
                subheader="Storage activities right now"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.rd }}>
                        <North />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${disk.numb.numb.rd} reads`} secondary="Reading activities"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{`${((disk.numb.numb.rd * 100) / (disk.numb.numb.rd + disk.numb.numb.wt)).toFixed(1)}%`}</span>
                    </IconButton>
                  </ListItem>
                  <ListItem disableGutters={true} disablePadding={true} dense={true}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.wt }}>
                        <South />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${disk.numb.numb.wt} writes`} secondary="Writing activities"></ListItemText>
                    <IconButton edge="end" disabled={true}>
                      <span className="dataelem">{`${((disk.numb.numb.wt * 100) / (disk.numb.numb.rd + disk.numb.numb.wt)).toFixed(1)}%`}</span>
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
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
                title="Occurrences"
                subheader="Storage activities over time"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <ResponsiveContainer width={"100%"} height={300}>
                  <LineChart
                    data={disk.rcrd.numb}
                    width={800}
                    height={600}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                    <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                    <YAxis tick={{ fontSize: 10 }} tickCount={20} width={34} hide={true} />
                    <RCTooltip
                      formatter={(data) => `${data} activities`}
                      contentStyle={{ fontSize: "10px", padding: "6px" }}
                      itemStyle={{ padding: "0" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="rd" stroke={disk.rcrd.tint.rd} legendType="none" yAxisId={0} />
                    <Line type="monotone" dataKey="wt" stroke={disk.rcrd.tint.wt} legendType="none" yAxisId={0} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid container spacing={2} size={{ xs: 12 }}>
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
                  title="Size"
                  subheader="Storage activities in size right now"
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    <ListItem disableGutters={true} disablePadding={true} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.rd }}>
                          <North />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${EaseSize(disk.numb.size.rd)} read`}
                        secondary="Reading activities"
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">{`${((disk.numb.size.rd * 100) / (disk.numb.size.rd + disk.numb.size.wt)).toFixed(1)}%`}</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} disablePadding={true} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.wt }}>
                          <South />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${EaseSize(disk.numb.size.wt)} written`}
                        secondary="Writing activities"
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">{`${((disk.numb.size.wt * 100) / (disk.numb.size.rd + disk.numb.size.wt)).toFixed(1)}%`}</span>
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
                  title="Time"
                  subheader="Storage activities in time right now"
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                    <ListItem disableGutters={true} disablePadding={true} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.rd }}>
                          <North />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${disk.numb.time.rd} seconds spent on reading`}
                        secondary="Reading activities"
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">{`${((disk.numb.time.rd * 100) / (disk.numb.time.rd + disk.numb.time.wt)).toFixed(1)}%`}</span>
                      </IconButton>
                    </ListItem>
                    <ListItem disableGutters={true} disablePadding={true} dense={true}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: disk.rcrd.tint.wt }}>
                          <South />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${disk.numb.time.wt} seconds spent on writing`}
                        secondary="Writing activities"
                      ></ListItemText>
                      <IconButton edge="end" disabled={true}>
                        <span className="dataelem">{`${((disk.numb.time.wt * 100) / (disk.numb.time.rd + disk.numb.time.wt)).toFixed(1)}%`}</span>
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
                  title="Size"
                  subheader="Storage activities in size over time"
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={300}>
                    <LineChart
                      data={disk.rcrd.size}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis tick={{ fontSize: 10 }} tickCount={20} width={34} hide={true} />
                      <RCTooltip
                        formatter={(data) => `${EaseSize(data)}`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="rd" stroke={disk.rcrd.tint.rd} legendType="none" yAxisId={0} />
                      <Line type="monotone" dataKey="wt" stroke={disk.rcrd.tint.wt} legendType="none" yAxisId={0} />
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
                  title="Time"
                  subheader="Storage activities in time over time"
                  style={{ padding: "6px 10px 6px 10px" }}
                />
                <Divider />
                <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                  <ResponsiveContainer width={"100%"} height={300}>
                    <LineChart
                      data={disk.rcrd.time}
                      width={800}
                      height={600}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid stroke={vibe} strokeDasharray="5 5" />
                      <XAxis tick={{ fontSize: 10 }} tickCount={20} height={20} dataKey="time" />
                      <YAxis tick={{ fontSize: 10 }} tickCount={20} width={34} hide={true} />
                      <RCTooltip
                        formatter={(data) => `${data} secs`}
                        contentStyle={{ fontSize: "10px", padding: "6px" }}
                        itemStyle={{ padding: "0" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="rd" stroke={disk.rcrd.tint.rd} legendType="none" />
                      <Line type="monotone" dataKey="wt" stroke={disk.rcrd.tint.wt} legendType="none" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
                title="Occurrences"
                subheader="Storage activities right now"
                style={{ padding: "6px 10px 6px 10px" }}
              />
              <Divider />
              <CardContent style={{ padding: "6px 10px 6px 10px" }}>
                <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  {disk.part.numb > 0 ? (
                    Object.entries(disk.part.data).map(([item, data]) => (
                      <ListItem key={item} disableGutters={true} disablePadding={true} dense={true}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "rgba(128, 128, 128, 0.5)", color: vibe }}>
                            <Storage />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`"${data.devs}" mounted on "${data.mtpt}"`}
                          secondary={`Total. ${EaseSize(data.size.absolute.full)}, Used. ${EaseSize(data.size.absolute.used)}, Free. ${EaseSize(data.size.absolute.free)}`}
                        ></ListItemText>
                        <IconButton edge="end" disabled={true}>
                          <span className="dataelem">{data.size.relative.toFixed(1)}%</span>
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
        </Grid>
      </div>
    </>
  );
}
