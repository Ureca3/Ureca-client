import type { Meta, StoryObj } from '@storybook/nextjs';

import { Row } from './index';

const meta: Meta<typeof Row> = {
  title: 'Components/UI/Row',
  component: Row,
  tags: ['autodocs'],
  args: {
    children: <span className="text-sm text-gray-900">알림 설정</span>,
  },
  argTypes: {
    onClick: { action: 'click' },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

export const Default: Story = {
  render: (args) => <Row {...args} />,
};
