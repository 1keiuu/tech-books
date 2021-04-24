// TODO: anyの排除
export const groupBy = (array: {}[], key: string) => {
  const res = {};
  const reducer = (acc: any, cur: any, idx: any, src: any) => {
    const target: any = Object.entries(acc).find((obj) => {
      return obj[0] == String(cur[key]);
    });
    if (target) {
      target[1].push(cur);
    } else {
      acc[cur[key]] = [cur];
    }
    return acc;
  };

  return Object.values(array.reduce(reducer, res));
};
