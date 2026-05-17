import { forwardRef, useState, useEffect, useRef, useId } from 'react';
import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';
import type { ButtonVariant, ButtonColorScheme, ButtonSize } from '../Button';
import styles from './DropdownMenuTrigger.module.css';

interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Contenu du menu — typiquement des <DropdownMenuButton /> */
  children: React.ReactNode;
  /** Label du bouton déclencheur */
  triggerLabel: string;
  /** Icône à gauche du bouton trigger */
  triggerLeftIcon?: React.ReactNode;
  /** Icône à droite du bouton trigger */
  triggerRightIcon?: React.ReactNode;
  /** Variant du bouton trigger */
  triggerVariant?: ButtonVariant;
  /** Color scheme du bouton trigger */
  triggerColorScheme?: ButtonColorScheme;
  /** Size du bouton trigger */
  triggerSize?: ButtonSize;
  /** État contrôlé (optionnel — si non fourni, le composant gère son état en interne) */
  open?: boolean;
  /** Callback quand l'état open/close change */
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenuTrigger = forwardRef<HTMLDivElement, DropdownMenuTriggerProps>(
  (
    {
      children,
      triggerLabel,
      triggerLeftIcon,
      triggerRightIcon,
      triggerVariant = 'contained',
      triggerColorScheme = 'default',
      triggerSize = 'nm',
      open: controlledOpen,
      onOpenChange,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const menuId = useId();

    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (!isControlled) setInternalOpen(false);
          onOpenChange?.(false);
        }
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          if (!isControlled) setInternalOpen(false);
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, isControlled, onOpenChange]);

    const handleToggle = () => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const classes = [styles.dropdownMenuTrigger, className].filter(Boolean).join(' ');

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        data-component="ds-br-dropdown-menu-trigger"
        data-state={isOpen ? 'open' : 'closed'}
        className={classes}
        {...props}
      >
        <Button
          variant={triggerVariant}
          colorScheme={triggerColorScheme}
          size={triggerSize}
          leftIcon={triggerLeftIcon}
          rightIcon={triggerRightIcon}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls={isOpen ? menuId : undefined}
          onClick={handleToggle}
        >
          {triggerLabel}
        </Button>
        <DropdownMenu
          id={menuId}
          className={styles.menu}
          aria-hidden={isOpen ? undefined : true}
        >
          {children}
        </DropdownMenu>
      </div>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export { DropdownMenuTrigger };
export type { DropdownMenuTriggerProps };
