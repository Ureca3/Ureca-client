import React from 'react';

export const MapFooter = () => {
  return (
    <div className="rounded-t-2xl bg-white shadow-xl">
      {/* Grab Handle */}
      <div className="flex justify-center py-2">
        <div className="bg-gray h-1 w-10 rounded-full" />
      </div>

      {/* StoreInfo */}
      <div className="max-h-[40vh] px-4 pb-4 text-black">
        {/* Border */}
        <div className="border-primary-500 flex flex-col gap-2 rounded-xl border px-4 pt-6 pb-4">
          {/* Info Header */}
          <section className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">LG U+ 강남점</h2>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-green-600">영업중</span>
              </div>
            </div>
            <p className="text-primary-500 text-md font-semibold">150m</p>
          </section>

          {/* Info Body */}
          <section className="flex flex-col gap-1">
            <p className="text-gray text-sm">주소: 서울 강남구 테헤란로</p>
            <p className="text-gray text-sm">영업시간: 10:00 - 21:00</p>
            <p className="text-gray text-sm">전화번호: 02-1234-5678</p>
          </section>

          {/* Info Footer */}
          <section className="flex gap-2">
            <button className="text-primary-500 flex-1 rounded-md border bg-gray-100 py-2 text-sm font-semibold">
              전화하기
            </button>
            <button className="bg-primary-500 flex-1 rounded-md py-2 text-sm font-semibold text-white">
              길찾기
            </button>
          </section>
        </div>
      </div>
      {/* 네비바 */}
    </div>
  );
};
