export function EaseSize(size: number): string {
  const unitList: string[] = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  let indx = 0,
    otpt = size;

  if (size === 0) {
    return "0.00B";
  } else {
    while (otpt >= 1024 && indx < unitList.length - 1) {
      otpt /= 1024.0;
      indx++;
    }
    return `${otpt.toFixed(2)}${unitList[indx]}`;
  }
}
