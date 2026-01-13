import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'solid',
    tone: 'primary',
    size: 'm',
    children: '버튼',
  },
  argTypes: {
    size: { control: 'radio', options: ['m', 'l'] },
    variant: { control: 'radio', options: ['solid', 'outline', 'text'] },
    tone: { control: 'radio', options: ['primary', 'secondary', 'error'] },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <Button {...args}>
      <span>{args.children}</span>
    </Button>
  ),
};
