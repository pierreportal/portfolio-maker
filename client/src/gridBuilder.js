export const buildGrid = (gridParams, N) => {
  const allSizes = [...Array(N).keys()].map((i) => {
    return (
      gridParams.boxSizes[i] || {
        width: 1,
        height: 1,
      }
    );
  });

  let shiftCol = 0;
  let shiftRow = 0;

  for (let i = 0; i < N; i++) {
    allSizes[i].colIndex = shiftCol % gridParams.nCols;
    shiftCol += allSizes[i].width;
    shiftRow += allSizes[i - 1]
      ? Number(
          allSizes[i - 1].width + allSizes[i - 1].colIndex >= gridParams.nCols
        )
      : 0;
    allSizes[i].rowIndex = shiftRow;
  }
  return allSizes;
};
