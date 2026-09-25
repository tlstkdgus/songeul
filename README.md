# 손글 (SonGeul) — 시니어 뱅킹 프론트엔드 프로토타입

65세 이상 사용자를 위한 모바일 송금 흐름을 클릭해 볼 수 있게 만든 **React 프론트엔드 프로토타입**입니다.
2025 KIITI 동계 학술대회 아이디어·앱 콘테스트 출품작 '손글'의 화면 흐름과 접근성 설계를 코드로 옮겼습니다.

> **프로토타입 범위**
> 백엔드와 실제 OCR 연동은 없습니다. 사진 인식 결과, 보안 검사 결과, 가족 승인은 **목업 데이터와 타이머로 흐름만** 보여 줍니다.
> 설정 화면(가족 관리·송금 한도·고령자 보호)의 값은 브라우저 안의 로컬 상태로만 유지되고 서버에 저장되지 않습니다.
> 출품작에서 설계한 OCR 앙상블(CLOVA OCR + Google Vision + 파인튜닝 모델 가중 투표)과 이상 거래 감지는 이 저장소에 구현돼 있지 않습니다.

## 송금 흐름

```
홈 → 사진 찍어 보내기(/camera) → 인식 결과 확인(/ocr-confirm) → 보안 검사(/security-check)
   → 사기 경고(/fraud-alert) 또는 송금 완료(/transfer-success) → 가족 승인 대기(/approval-request)
```

| 화면 | 실제로 동작하는 것 | 목업인 것 |
|---|---|---|
| 촬영 `/camera` | 촬영·갤러리 버튼과 화면 이동 | 카메라 캡처(getUserMedia 없음), 인식 결과는 예시 데이터로 고정 |
| 확인 `/ocr-confirm` | 은행·계좌·금액 수정, 화면 진입 0.5초 뒤 **음성으로 읽어 줌**(Web Speech API, ko-KR, 0.9배속) | 인식 결과 값 |
| 보안 검사 `/security-check` | 계좌 확인 → 사기 DB → 거래 패턴 3단계 진행 연출 | 검사 결과(무작위로 경고/완료 분기) |
| 가족 승인 `/approval-request` | 5분 카운트다운 화면 | 실제 승인 요청·응답 |
| 설정 `/settings` 이하 | 가족(관계별 권한)·송금 한도(기본·관계별·시간대별)·고령자 보호 설정 입력 | 저장·알림 발송 |

그 밖의 라우트: `/transfer`(금액 입력), `/safe-accounts`, `/add-safe-account`, `/family-management`, `/transfer-limit`, `/elderly-protection` — 총 14개 (`src/App.tsx`).

## 접근성 구현

- **음성(TTS)**: `useTTS` 훅과 `src/utils/accessibility.ts`의 speak/stop (Web Speech API)
- **햅틱**: `useHaptic` 훅 — 성공·오류·경고별 `navigator.vibrate` 패턴. `navigator.vibrate`를 지원하지 않는 브라우저(iOS Safari 등)에서는 동작하지 않습니다.
- **키보드·스크린리더**: 본문 건너뛰기 링크, 포커스 트랩(`setupFocusTrap`), 스크린리더 알림(`announceToScreenReader`), 클릭 가능한 카드의 `tabIndex`
- **큰 글씨·큰 터치 영역** (`src/styles/globalStyles.css` CSS 변수)
  - 본문 20–24px, 작은 글씨 18px, 제목 32–36px, 줄 간격 1.6
  - 최소 터치 영역 48px, 주요 버튼 높이 64px
- **사용자 설정 대응**: `prefers-contrast: high`(본문을 검정으로), `prefers-reduced-motion: reduce`(애니메이션 최소화), `prefers-color-scheme: dark`

### 색상과 대비 (흰 배경 `#FFFFFF` 기준, WCAG 2.x 대비율)

| 토큰 | 값 | 용도 | 대비율 | 기준 |
|---|---|---|---|---|
| `--color-trust` | `#003366` | 본문 텍스트 | 12.6 : 1 | AAA |
| `--color-text-secondary` | `#616161` | 보조 텍스트 | 6.2 : 1 | AA |
| `--color-success` | `#2E7D32` | 성공·확인 | 5.1 : 1 | AA |
| `--color-error` | `#D32F2F` | 위험·경고 | 5.0 : 1 | AA |
| `--color-action` | `#FFD700` | 주요 액션 버튼 배경 (네이비 글자와 9.0 : 1) | — | AAA |
| `--color-ai` | `#FF9800` | AI 비서 버튼 배경 | 2.2 : 1 | **기준 미달** |

AI 비서 버튼(`--color-ai` 계열)은 흰색과의 대비가 AA(4.5 : 1)에 못 미칩니다. 개선이 필요한 항목입니다.

## 기술 스택

- React 18 + TypeScript 5
- Vite 5
- React Router 6
- 컴포넌트별 일반 CSS 파일(BEM 스타일 클래스) + CSS 변수 — CSS Modules나 UI 라이브러리는 쓰지 않습니다.

## 프로젝트 구조

```
src/
├── components/   # Button, Card, Text, BalanceCard, ActionButton, AIAssistant
├── pages/        # 라우트별 화면 14개
├── hooks/        # useAccessibility.ts (useTTS, useHaptic)
├── utils/        # accessibility.ts
├── styles/       # globalStyles.css (디자인 토큰), theme.ts
├── types/
├── App.tsx       # 라우팅
└── main.tsx
```

## 실행

Node.js 18 이상이 필요합니다. 저장소 루트에서 실행합니다.

```bash
npm install
npm run dev       # 개발 서버
npm run build     # tsc + vite build
npm run preview
```

## 라이선스

MIT License
