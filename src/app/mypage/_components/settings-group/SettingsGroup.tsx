const titleStyle = 'text-gray';
const rowsClass =
  'flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingsGroup = ({ title, children, className }: Props) => {
  return (
    <div className="flex flex-col">
      <span className={titleStyle}>{title}</span>
      <div className={`${rowsClass} ${className ?? ''}`.trim()}>{children}</div>
    </div>
  );
};
