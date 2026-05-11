import { forwardRef } from 'react';
import styles from './DropdownMenuButton.module.css';

interface DropdownMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Contenu textuel (nom de la compagnie ou du projet) */
  children: React.ReactNode;
  /** URL du logo */
  src: string;
  /** Texte alternatif du logo */
  alt?: string;
  /** Affiche l'icône de lien externe */
  rightIcon?: boolean;
  /** Indique si cet item est l'item actif (sélectionné) */
  activated?: boolean;
}

const DropdownMenuButton = forwardRef<HTMLButtonElement, DropdownMenuButtonProps>(
  (
    {
      children,
      src,
      alt = '',
      rightIcon = false,
      activated = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.dropdownMenuButton,
      activated && styles['is-activated'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        data-component="ds-br-dropdown-menu-button"
        data-activated={activated}
        className={classes}
        disabled={disabled}
        {...props}
      >
        <div className={styles.logoFrame}>
          <img src={src} alt={alt} className={styles.logoImage} />
        </div>
        <span className={styles.label}>{children}</span>
        {rightIcon && (
          <span className={styles.rightIcon} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V14M14 5H19M19 5V10M19 5L10 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
);

DropdownMenuButton.displayName = 'DropdownMenuButton';

export { DropdownMenuButton };
export type { DropdownMenuButtonProps };
