/**
 * TypeScript Type Definitions for Senior Banking App
 */

// User Types
export interface User {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  profileImage?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  date: Date;
  recipient?: string;
  sender?: string;
  description?: string;
  status: 'pending' | 'completed' | 'failed';
}

// Safe Account Types
export interface SafeAccount {
  id: string;
  nickname: string;
  emoji: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
  isFavorite: boolean;
  createdAt: Date;
}

// OCR Types
export interface OCRResult {
  bankName?: string;
  accountNumber?: string;
  amount?: number;
  holderName?: string;
  confidence: number;
}

// Security Check Types
export interface SecurityCheckResult {
  step: 'account_validation' | 'fraud_check' | 'anomaly_detection';
  status: 'checking' | 'passed' | 'warning' | 'failed';
  message: string;
  isSafe: boolean;
}

export interface SecurityVerification {
  checks: SecurityCheckResult[];
  overallStatus: 'safe' | 'warning' | 'danger';
  recommendation: string;
  allowedToProceed: boolean;
}

// Accessibility Types
export interface A11yProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  role?: string;
  tabIndex?: number;
}

// Component Common Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

// Button Props
export interface ButtonProps extends BaseComponentProps, A11yProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

// Card Props
export interface CardProps extends BaseComponentProps, A11yProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  clickable?: boolean;
  children: React.ReactNode;
}

// Text Props
export interface TextProps extends BaseComponentProps, A11yProps {
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body1' | 'body2' | 'caption';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  align?: 'left' | 'center' | 'right';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

// Modal Props
export interface ModalProps extends BaseComponentProps, A11yProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

// Alert Types
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  duration?: number;
}

// Voice Interaction Types
export interface VoiceCommand {
  command: string;
  intent: 'transfer' | 'check_balance' | 'view_transactions' | 'help';
  parameters?: Record<string, any>;
}

// Navigation Types
export type Screen =
  | 'home'
  | 'transfer'
  | 'photo-transfer'
  | 'safe-accounts'
  | 'transactions'
  | 'settings'
  | 'help';

export interface NavigationState {
  currentScreen: Screen;
  previousScreen?: Screen;
  params?: Record<string, any>;
}

// Transfer Types
export interface TransferData {
  recipientBank: string;
  recipientAccount: string;
  recipientName: string;
  amount: number;
  message?: string;
}

export interface TransferStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  userFriendlyMessage: string;
  severity: 'low' | 'medium' | 'high';
}
