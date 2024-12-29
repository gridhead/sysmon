export function ObtainRandomTint() {
  const randnumb = Math.floor(Math.random() * 0xffffff);
  const tintiden = `#${randnumb.toString(16).padStart(6, "0")}`;
  return tintiden;
}
