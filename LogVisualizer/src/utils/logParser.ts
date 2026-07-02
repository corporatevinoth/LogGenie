export const parseLog = (rawLog: string) => {
  const lines = rawLog
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => ({
    id: `line-${index}`,
    label: line,
  }));
};
