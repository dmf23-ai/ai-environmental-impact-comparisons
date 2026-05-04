// Round a value up to a "nice" axis ceiling — 1, 1.25, 1.5, 1.6, 2, 2.5, 3,
// 4, 5, 10 times a power of ten. Used by the bar-chart infographics so the
// right-edge axis label is a clean number.
//
// `granular: true` opts into additional 6 / 7 / 8 steps. The water-bracket
// chart uses the granular path; the other charts use the default. Without
// the opt-in, mantissas above 5 round straight up to 10, which gives most
// charts useful breathing room on the right edge.

export interface NiceCeilingOptions {
  granular?: boolean;
}

export function niceCeiling(n: number, opts: NiceCeilingOptions = {}): number {
  if (n <= 10) return Math.ceil(n);
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
  const mantissa = n / magnitude;
  let rounded: number;
  if (mantissa <= 1) rounded = 1;
  else if (mantissa <= 1.25) rounded = 1.25;
  else if (mantissa <= 1.5) rounded = 1.5;
  else if (mantissa <= 1.6) rounded = 1.6;
  else if (mantissa <= 2) rounded = 2;
  else if (mantissa <= 2.5) rounded = 2.5;
  else if (mantissa <= 3) rounded = 3;
  else if (mantissa <= 4) rounded = 4;
  else if (mantissa <= 5) rounded = 5;
  else if (opts.granular) {
    if (mantissa <= 6) rounded = 6;
    else if (mantissa <= 7) rounded = 7;
    else if (mantissa <= 8) rounded = 8;
    else rounded = 10;
  } else {
    rounded = 10;
  }
  return rounded * magnitude;
}
