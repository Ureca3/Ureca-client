'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { policyApi } from '@/services/policy/policyApi';
import { useAppDispatch } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

type AgreementKey = 'terms' | 'privacy' | 'service';

export const PolicyAgree = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false, // 이용약관 동의(필수)
    privacy: false, // 개인정보 수집 및 이용동의(필수)
    service: false, // 서비스 이용 안내 동의 (필수)
  });

  const isAllRequiredChecked = agreements.terms && agreements.privacy && agreements.service;

  const handleToggleAll = (checked: boolean) => {
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      service: checked,
    });
  };

  const handleToggleOne = (key: AgreementKey) => {
    const next = {
      ...agreements,
      [key]: !agreements[key],
    };

    const allChecked = next.terms && next.privacy && next.service;

    setAgreements({
      ...next,
      all: allChecked,
    });
  };

  const handleAgree = async () => {
    try {
      await policyApi.agree();
      router.replace('/');
    } catch {
      dispatch(
        toastActions.show({
          text: '약관 동의 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          variant: 'error',
        }),
      );
    }
  };

  return (
    <main>
      <section className="relative flex flex-col gap-2 px-6 pt-4 pb-6 text-xs font-semibold text-black">
        <div className="absolute -top-9 flex items-center gap-2 text-xl font-bold text-black">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={(e) => handleToggleAll(e.target.checked)}
              className="border-gray-dark accent-primary-500 h-4 w-4 border-2"
            />
            <p>약관 전체동의</p>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => handleToggleOne('terms')}
              className="border-gray-dark accent-primary-500 h-4 w-4 border-2"
            />
            <p className="text-gray-dark">이용약관 동의(필수)</p>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleToggleOne('privacy')}
              className="border-gray-dark accent-primary-500 h-4 w-4 border-2"
            />
            <p className="text-gray-dark">개인정보 수집 및 이용동의(필수)</p>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={agreements.service}
              onChange={() => handleToggleOne('service')}
              className="border-gray-dark accent-primary-500 h-4 w-4 border-2"
            />
            <p className="text-gray-dark">서비스 이용 안내 동의(필수)</p>
          </label>
        </div>

        <p className="pl-6 text-[8px]">상담 요약 및 서비스 이용 관련 안내를 받을 수 있습니다.</p>
      </section>

      <section className="px-2">
        <Button
          variant="solid"
          tone="primary"
          size="m"
          className="w-full font-semibold"
          disabled={!isAllRequiredChecked}
          onClick={handleAgree}
        >
          동의하기
        </Button>
      </section>
    </main>
  );
};
