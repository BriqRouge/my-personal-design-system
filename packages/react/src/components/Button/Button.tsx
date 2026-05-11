import { forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';
type ButtonColorScheme = 'default' | 'light' | 'dark';
type ButtonSize = 'nm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type visuel du bouton */
  variant?: ButtonVariant;
  /** Schéma de couleur — 'default' pour contained, 'light'|'dark' pour outlined */
  colorScheme?: ButtonColorScheme;
  /** Taille du bouton */
  size?: ButtonSize;
  /** Icône à gauche du label */
  leftIcon?: React.ReactNode;
  /** Icône à droite du label */
  rightIcon?: React.ReactNode;
  /** Contenu textuel du bouton */
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      colorScheme = 'default',
      size = 'nm',
      leftIcon,
      rightIcon,
      disabled = false,
      children,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      variant === 'outlined' ? styles[`color-scheme-${colorScheme}`] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-variant={variant}
        data-size={size}
        data-component="ds-br-button"
        className={classes}
        {...props}
      >
        {leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonColorScheme, ButtonSize };
