declare module '*.png' {
  const value: {
    src: string;
    width: number;
    height: number;
  };
  // eslint-disable-next-line import/no-default-export
  export default value;
}
