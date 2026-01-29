'use client';
import React from 'react';

import { ErrorComponent } from '@/components/ui/fallback/error';

const NotFound = () => {
  return (
    <div className="h-screen">
      <ErrorComponent />
    </div>
  );
};

export default NotFound;
