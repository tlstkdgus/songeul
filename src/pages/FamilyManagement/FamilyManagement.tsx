import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FamilyMember, FamilyRelationship } from '../../types';
import './FamilyManagement.css';

/**
 * Family Management Screen - 가족 등록 관리
 * 보호자/가족 여러 명 등록 및 권한 설정
 */
export const FamilyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    // 예시 데이터
    {
      id: '1',
      name: '김길동 (아들)',
      relationship: 'child',
      phone: '010-1234-5678',
      email: 'son@email.com',
      registeredAt: new Date(),
      isActive: true,
      permissions: {
        canApproveTransfer: true,
        canSetLimit: true,
        canReceiveAlert: true,
        canViewBalance: true,
        approvalRequired: true,
      },
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    relationship: 'child' as FamilyRelationship,
    phone: '',
    email: '',
  });

  const relationshipLabels: Record<FamilyRelationship, string> = {
    child: '자녀',
    spouse: '배우자',
    parent: '부모',
    sibling: '형제자매',
    grandchild: '손주',
    extended: '친척',
    caregiver: '요양보호사',
    legal_guardian: '법정후견인',
  };

  const handleAddFamily = () => {
    if (!formData.name || !formData.phone) {
      alert('필수 정보를 입력해주세요');
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.name,
      relationship: formData.relationship,
      phone: formData.phone,
      email: formData.email,
      registeredAt: new Date(),
      isActive: true,
      permissions: {
        canApproveTransfer: true,
        canSetLimit: true,
        canReceiveAlert: true,
        canViewBalance: true,
        approvalRequired: true,
      },
    };

    setFamilyMembers([...familyMembers, newMember]);
    setFormData({ name: '', relationship: 'child', phone: '', email: '' });
    setShowAddModal(false);
  };

  const handleRemoveFamily = (id: string) => {
    if (window.confirm('이 가족 구성원을 제거하시겠습니까?')) {
      setFamilyMembers(familyMembers.filter((member) => member.id !== id));
      setSelectedMember(null);
    }
  };

  const handleTogglePermission = (
    memberId: string,
    permission: keyof FamilyMember['permissions']
  ) => {
    const updatedMembers = familyMembers.map((member) => {
      if (member.id === memberId) {
        return {
          ...member,
          permissions: {
            ...member.permissions,
            [permission]: !member.permissions[permission],
          },
        };
      }
      return member;
    });
    setFamilyMembers(updatedMembers);
    // 선택된 멤버도 업데이트
    const updatedMember = updatedMembers.find(m => m.id === memberId);
    if (updatedMember) {
      setSelectedMember(updatedMember);
    }
  };

  return (
    <div className="family-management">
      <header className="family-management__header">
        <button
          className="family-management__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="family-management__title">가족 등록 관리</h1>
      </header>

      <main className="family-management__content">
        {/* 등록된 가족 목록 */}
        <section className="family-management__list">
          <h2 className="family-management__section-title">등록된 보호자</h2>

          {familyMembers.length === 0 ? (
            <div className="family-management__empty">
              <p>등록된 가족 구성원이 없습니다</p>
              <p className="family-management__empty-sub">
                아래 버튼을 클릭하여 가족을 등록해주세요
              </p>
            </div>
          ) : (
            <div className="family-management__cards">
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  className={`family-management__card ${
                    selectedMember?.id === member.id
                      ? 'family-management__card--selected'
                      : ''
                  }`}
                  onClick={() => setSelectedMember(member)}
                  aria-label={`${member.name} 선택`}
                >
                  <div className="family-management__card-header">
                    <h3 className="family-management__member-name">
                      {member.name}
                    </h3>
                    <span className="family-management__relationship">
                      {relationshipLabels[member.relationship]}
                    </span>
                  </div>
                  <p className="family-management__contact">{member.phone}</p>
                  {member.email && (
                    <p className="family-management__contact">
                      {member.email}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 선택된 가족 권한 설정 */}
        {selectedMember && (
          <section className="family-management__permissions">
            <h2 className="family-management__section-title">권한 설정</h2>

            <div className="family-management__permission-item">
              <label className="family-management__permission-label">
                <input
                  type="checkbox"
                  checked={selectedMember.permissions.canApproveTransfer}
                  onChange={() =>
                    handleTogglePermission(
                      selectedMember.id,
                      'canApproveTransfer'
                    )
                  }
                  aria-label="송금 승인 권한"
                />
                <span>송금 승인 권한</span>
              </label>
              <p className="family-management__permission-desc">
                큰 금액 송금 시 이 사람의 승인이 필요합니다
              </p>
            </div>

            <div className="family-management__permission-item">
              <label className="family-management__permission-label">
                <input
                  type="checkbox"
                  checked={selectedMember.permissions.canSetLimit}
                  onChange={() =>
                    handleTogglePermission(selectedMember.id, 'canSetLimit')
                  }
                  aria-label="송금 한도 설정 권한"
                />
                <span>송금 한도 설정 권한</span>
              </label>
              <p className="family-management__permission-desc">
                일일 송금 한도를 설정할 수 있습니다
              </p>
            </div>

            <div className="family-management__permission-item">
              <label className="family-management__permission-label">
                <input
                  type="checkbox"
                  checked={selectedMember.permissions.canReceiveAlert}
                  onChange={() =>
                    handleTogglePermission(
                      selectedMember.id,
                      'canReceiveAlert'
                    )
                  }
                  aria-label="송금 알림 수신"
                />
                <span>송금 알림 수신</span>
              </label>
              <p className="family-management__permission-desc">
                모든 송금 내역을 실시간으로 알려드립니다
              </p>
            </div>

            <div className="family-management__permission-item">
              <label className="family-management__permission-label">
                <input
                  type="checkbox"
                  checked={selectedMember.permissions.canViewBalance}
                  onChange={() =>
                    handleTogglePermission(selectedMember.id, 'canViewBalance')
                  }
                  aria-label="잔액 조회 권한"
                />
                <span>잔액 조회 권한</span>
              </label>
              <p className="family-management__permission-desc">
                계좌 잔액을 조회할 수 있습니다
              </p>
            </div>

            <button
              className="family-management__remove-btn"
              onClick={() => handleRemoveFamily(selectedMember.id)}
              aria-label={`${selectedMember.name} 제거`}
            >
              이 가족 구성원 제거
            </button>
          </section>
        )}
      </main>

      {/* 가족 추가 버튼 */}
      <button
        className="family-management__add-btn"
        onClick={() => setShowAddModal(true)}
        aria-label="가족 등록"
      >
        + 가족 등록
      </button>

      {/* 가족 추가 모달 */}
      {showAddModal && (
        <div className="family-management__modal">
          <div className="family-management__modal-content">
            <h2 className="family-management__modal-title">가족 등록</h2>

            <div className="family-management__form-group">
              <label htmlFor="name" className="family-management__label">
                이름
              </label>
              <input
                id="name"
                type="text"
                className="family-management__input"
                placeholder="예: 김길동"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                aria-label="이름"
              />
            </div>

            <div className="family-management__form-group">
              <label htmlFor="relationship" className="family-management__label">
                관계
              </label>
              <select
                id="relationship"
                className="family-management__select"
                value={formData.relationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    relationship: e.target.value as FamilyRelationship,
                  })
                }
                aria-label="관계"
              >
                {Object.entries(relationshipLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="family-management__form-group">
              <label htmlFor="phone" className="family-management__label">
                휴대폰 번호
              </label>
              <input
                id="phone"
                type="tel"
                className="family-management__input"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                aria-label="휴대폰 번호"
              />
            </div>

            <div className="family-management__form-group">
              <label htmlFor="email" className="family-management__label">
                이메일 (선택)
              </label>
              <input
                id="email"
                type="email"
                className="family-management__input"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-label="이메일"
              />
            </div>

            <div className="family-management__modal-buttons">
              <button
                className="family-management__btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                취소
              </button>
              <button
                className="family-management__btn-confirm"
                onClick={handleAddFamily}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
