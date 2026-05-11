import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuButton } from '@brique-rouge/react';

const LOGO_PLACEHOLDER = 'https://placehold.co/16x16/e5e5e5/737373?text=L';

const meta = {
  title: 'Composants/DropdownMenuButton',
  component: DropdownMenuButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/NZtxQVYKRqeaGcC7hT5pjw?node-id=370-19497',
    },
  },
  argTypes: {
    children: {
      description: 'Nom de la compagnie ou du projet',
      control: 'text',
    },
    src: {
      description: 'URL du logo',
      control: 'text',
    },
    alt: {
      description: 'Texte alternatif du logo',
      control: 'text',
    },
    rightIcon: {
      description: 'Affiche l'icône de lien externe',
      control: 'boolean',
    },
    activated: {
      description: 'Indique si cet item est l'item actif',
      control: 'boolean',
    },
    disabled: {
      description: 'Item non disponible (projet à venir)',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DropdownMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Odaptos',
    src: LOGO_PLACEHOLDER,
    alt: 'Logo Odaptos',
  },
};

export const Activated: Story = {
  name: 'Activé',
  args: {
    children: 'Odaptos',
    src: LOGO_PLACEHOLDER,
    alt: 'Logo Odaptos',
    activated: true,
  },
};

export const AvecLienExterne: Story = {
  name: 'Avec lien externe',
  args: {
    children: 'iBP',
    src: LOGO_PLACEHOLDER,
    alt: 'Logo iBP',
    activated: true,
    rightIcon: true,
  },
};

export const Disabled: Story = {
  name: 'Désactivé (projet à venir)',
  args: {
    children: 'Showcase à venir',
    src: LOGO_PLACEHOLDER,
    alt: '',
    disabled: true,
  },
};

export const TousLesEtats: Story = {
  name: 'Tous les états',
  args: { children: 'Odaptos', src: LOGO_PLACEHOLDER, alt: 'Logo Odaptos' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <DropdownMenuButton src={LOGO_PLACEHOLDER} alt="Logo A">
        Company Name
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO_PLACEHOLDER} alt="Logo B" activated>
        Odaptos
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO_PLACEHOLDER} alt="Logo C" activated rightIcon>
        iBP
      </DropdownMenuButton>
      <DropdownMenuButton src={LOGO_PLACEHOLDER} alt="" disabled>
        Showcase à venir
      </DropdownMenuButton>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Odaptos',
    src: LOGO_PLACEHOLDER,
    alt: 'Logo Odaptos',
    activated: false,
    rightIcon: false,
    disabled: false,
  },
};
