export default (before, after) => {
  const oldLines = Object.keys(before)
    .filter(key => before[key] === after[key])
    .map(key => `   ${key}: ${before[key]}`);

  const changedLines = Object.keys(before)
    .filter(key => (before[key] !== after[key]) && (after[key] !== undefined))
    .map(key => ` - ${key}: ${before[key]}\n + ${key}: ${after[key]}`);

  const removedLines = Object.keys(before)
    .filter(key => after[key] === undefined)
    .map(key => ` - ${key}: ${before[key]}`);

  const newLines = Object.keys(after)
    .filter(key => before[key] === undefined)
    .map(key => ` + ${key}: ${after[key]}`);

  return [...oldLines, ...changedLines, ...removedLines, ...newLines];
};
