function hsvToHsl(h: number, s: number, v: number) {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  let l = ((2 - s) * v) / 2;
  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = (s * v) / (l * 2);
    } else {
      s = (s * v) / (2 - l * 2);
    }
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${Math.round(h * 360)}, ${s}%, ${l}%)`;
}

export { hsvToHsl };
