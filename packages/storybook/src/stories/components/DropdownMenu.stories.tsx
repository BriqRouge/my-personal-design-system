import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuButton } from '@brique-rouge/react';

const LOGO = 'https://placehold.co/16x16/e5e5e5/737373?text=L';

const meta = {
  title: 'Composants/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/NZtxQVYKRqeaGcC7hT5pjw?node-id=375-19690',
    },
  },
  argTypes: {
    children: {
      description: 'Contenu du menu — typiquement des <DropdownMenuButton />',
      control: false,
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Défaut',
  args: { children: '' },
  render: () => (
    <DropdownMenu>
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos">Odaptos</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo BPCE">BPCE</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo iBP" rightIcon activated>
        iBP
      </DropdownMenuButton>
    </DropdownMenu>
  ),
};

export const AvecItemsDesactives: Story = {
  name: "Avec items désactivés",
  args: { children: '' },
  render: () => (
    <DropdownMenu>
      <DropdownMenuButton src={LOGO} alt="Logo BPCE">BPCE</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos" activated>
        Odaptos
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo iBP" disabled>
        Showcase à venir
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo Conseil" disabled>
        Showcase à venir
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo Vinci" disabled>
        Showcase à venir
      </DropdownMenuButton>
    </DropdownMenu>
  ),
};

export const UnSeulItem: Story = {
  name: 'Un seul item',
  args: { children: '' },
  render: () => (
    <DropdownMenu>
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos" activated>
        Odaptos
      </DropdownMenuButton>
    </DropdownMenu>
  ),
};

export const Playground: Story = {
  args: { children: '' },
  render: () => (
    <DropdownMenu>
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos">Odaptos</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo BPCE">BPCE</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo iBP" rightIcon>iBP</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo Vinci" disabled>Showcase à venir</DropdownMenuButton>
      <DropdownMenuButton src={LOGO} alt="Logo Conseil" disabled>
        Showcase à venir
      </DropdownMenuButton>
    </DropdownMenu>
  ),
};
