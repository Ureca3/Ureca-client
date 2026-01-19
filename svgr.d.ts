declare module '*.svg' {
  import { FC } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
