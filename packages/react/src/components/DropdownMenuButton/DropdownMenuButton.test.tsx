import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { DropdownMenuButton } from './DropdownMenuButton';

const LOGO = '/logo.png';

describe('DropdownMenuButton — rendu', () => {
  it('rend le label (children)', () => {
    render(<DropdownMenuButton src={LOGO}>Odaptos</DropdownMenuButton>);
    expect(screen.getByRole('button', { name: /Odaptos/i })).toBeInTheDocument();
  });

  it('rend le logo avec le src correct', () => {
    render(<DropdownMenuButton src={LOGO} alt="Logo Odaptos">Odaptos</DropdownMenuButton>);
    expect(screen.getByRole('img', { name: 'Logo Odaptos' })).toHaveAttribute('src', LOGO);
  });

  it('utilise alt vide par défaut pour le logo', () => {
    const { container } = render(<DropdownMenuButton src={LOGO}>Odaptos</DropdownMenuButton>);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('expose data-component="ds-br-dropdown-menu-button"', () => {
    render(<DropdownMenuButton src={LOGO}>Odaptos</DropdownMenuButton>);
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-component',
      'ds-br-dropdown-menu-button'
    );
  });

  it('ajoute une className supplémentaire', () => {
    render(
      <DropdownMenuButton src={LOGO} className="custom">
        Odaptos
      </DropdownMenuButton>
    );
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('transmet les props HTML au bouton', () => {
    render(
      <DropdownMenuButton src={LOGO} data-testid="btn">
        Odaptos
      </DropdownMenuButton>
    );
    expect(screen.getByTestId('btn')).toBeInTheDocument();
  });
});

describe('DropdownMenuButton — état activated', () => {
  it('expose data-activated="false" par défaut', () => {
    render(<DropdownMenuButton src={LOGO}>Odaptos</DropdownMenuButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-activated', 'false');
  });

  it('expose data-activated="true" quand activated', () => {
    render(
      <DropdownMenuButton src={LOGO} activated>
        Odaptos
      </DropdownMenuButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-activated', 'true');
  });
});

describe('DropdownMenuButton — right icon', () => {
  it("n'affiche pas l'icône externe par défaut", () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO}>Odaptos</DropdownMenuButton>
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it("affiche l'icône externe quand rightIcon={true}", () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO} rightIcon>
        Odaptos
      </DropdownMenuButton>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('DropdownMenuButton — état disabled', () => {
  it('est désactivé quand disabled', () => {
    render(
      <DropdownMenuButton src={LOGO} disabled>
        Odaptos
      </DropdownMenuButton>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('ne déclenche pas onClick quand disabled', async () => {
    const onClick = vi.fn();
    render(
      <DropdownMenuButton src={LOGO} disabled onClick={onClick}>
        Odaptos
      </DropdownMenuButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('DropdownMenuButton — interactions', () => {
  it('déclenche onClick au clic', async () => {
    const onClick = vi.fn();
    render(
      <DropdownMenuButton src={LOGO} onClick={onClick}>
        Odaptos
      </DropdownMenuButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('DropdownMenuButton — accessibilité', () => {
  it('état par défaut : aucune violation axe', async () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos">
        Odaptos
      </DropdownMenuButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('état activated : aucune violation axe', async () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos" activated>
        Odaptos
      </DropdownMenuButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('état disabled : aucune violation axe', async () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos" disabled>
        Odaptos
      </DropdownMenuButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('avec rightIcon : aucune violation axe', async () => {
    const { container } = render(
      <DropdownMenuButton src={LOGO} alt="Logo Odaptos" rightIcon>
        Odaptos
      </DropdownMenuButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
