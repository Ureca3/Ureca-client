import type { Meta, StoryObj } from '@storybook/nextjs';

import { useAppDispatch } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

import { Toast } from './index';

const meta: Meta<typeof Toast> = {
  title: 'Components/UI/Toast',
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

const Trigger = ({
  text,
  variant,
}: {
  text: string;
  variant?: 'default' | 'success' | 'error';
}) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="bg-primary-700 rounded-sm px-4 py-2 text-white"
      onClick={() => dispatch(toastActions.show({ text, variant }))}
    >
      Show {variant ?? 'default'}
    </button>
  );
};

export const Playground: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <div className="flex gap-2">
        <Trigger text="기본 토스트" />
        <Trigger text="성공했습니다!" variant="success" />
        <Trigger text="에러가 발생했어요" variant="error" />
      </div>

      {/* Toast는 항상 마운트되어 있어야 함 */}
      <Toast />
    </div>
  ),
};
