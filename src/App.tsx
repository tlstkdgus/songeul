import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeNew } from './pages/Home/HomeNew';
import { Camera } from './pages/Camera/Camera';
import { OCRConfirm } from './pages/OCRConfirm/OCRConfirm';
import { SecurityCheck } from './pages/SecurityCheck/SecurityCheck';
import { FraudAlert } from './pages/FraudAlert/FraudAlert';
import { SafeAccounts } from './pages/SafeAccounts/SafeAccounts';
import { AddSafeAccount } from './pages/AddSafeAccount/AddSafeAccount';
import { Transfer } from './pages/Transfer/Transfer';
import { TransferSuccess } from './pages/TransferSuccess/TransferSuccess';
import './styles/globalStyles.css';

/**
 * Senior Banking App
 * 시니어 사용자를 위한 접근성 최적화 뱅킹 앱
 */
function App() {
  return (
    <Router>
      <a href="#main-content" className="sr-only">
        메인 콘텐츠로 건너뛰기
      </a>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/ocr-confirm" element={<OCRConfirm />} />
          <Route path="/security-check" element={<SecurityCheck />} />
          <Route path="/fraud-alert" element={<FraudAlert />} />
          <Route path="/safe-accounts" element={<SafeAccounts />} />
          <Route path="/add-safe-account" element={<AddSafeAccount />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer-success" element={<TransferSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
