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
// Family/Guardian Types - 가족 등록 유연화
export type FamilyRelationship = 'child' | 'spouse' | 'parent' | 'sibling' | 'grandchild' | 'extended' | 'caregiver' | 'legal_guardian';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: FamilyRelationship;
  phone: string;
  email?: string;
  profileImage?: string;
  registeredAt: Date;
  isActive: boolean;
  // 권한 설정
  permissions: FamilyPermissions;
}

export interface FamilyPermissions {
  canApproveTransfer: boolean;      // 송금 승인 가능 여부
  canSetLimit: boolean;              // 상한선 설정 가능 여부
  canReceiveAlert: boolean;           // 송금 알림 수신 여부
  canViewBalance: boolean;            // 잔액 조회 가능 여부
  approvalRequired: boolean;          // 이 보호자의 승인이 필수인지
}

// Transfer Limit Types - 동적 송금 상한선
export interface TransferLimitConfig {
  id: string;
  type: 'daily' | 'single' | 'monthly';
  baseLimit: number;
  byRelationship: Record<FamilyRelationship, number>;
  byTimeOfDay: {
    morning: number;      // 06:00 - 12:00
    afternoon: number;    // 12:00 - 18:00
    evening: number;      // 18:00 - 24:00
    night: number;        // 00:00 - 06:00
  };
  lastUpdated: Date;
}

// Enhanced Security Types
export interface BiometricAuth {
  type: 'fingerprint' | 'face_recognition' | 'none';
  isEnabled: boolean;
  lastUsed?: Date;
}

export interface EnhancedSecurityCheck extends SecurityCheckResult {
  biometricRequired: boolean;
  guardianApprovalRequired: boolean;
  guardianApprovalDeadline?: Date;
  requiredApprovals: string[];      // guardian IDs
  receivedApprovals: string[];      // guardian IDs who approved
}

// Elderly Care Types - 독거노인 보호
export interface ElderlyProfile {
  isElderlyAlone: boolean;
  emergencyContact: FamilyMember;
  emergencyContactBackup?: FamilyMember;
  regularCheckInTime?: string;        // e.g., "14:00" (2 PM)
  suspiciousActivityThreshold: number; // 의심 거래 기준액
  dailyCheckInEnabled: boolean;
  weeklyReportEnabled: boolean;
  lastCheckIn?: Date;
  notificationPreferences: {
    smsAlert: boolean;
    phoneCall: boolean;
    familyNotification: boolean;
  };
}

// Fraud Prevention Types
export interface TransferApprovalRequest {
  id: string;
  transferData: TransferData;
  requestedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  requiredApprovals: string[];       // guardian IDs
  receivedApprovals: Map<string, {
    guardianId: string;
    approvedAt: Date;
    method: 'app' | 'sms' | 'call';
  }>;
  reason?: string;                   // 거부 사유
}

// Enhanced Transfer Data
export interface EnhancedTransferData extends TransferData {
  transferLimitCheck: {
    withinLimit: boolean;
    remainingDailyLimit: number;
    requiresApproval: boolean;
  };
  securityVerification: EnhancedSecurityCheck;
  guardianApprovals?: TransferApprovalRequest;
  biometricVerification?: {
    required: boolean;
    completed: boolean;
  };
}