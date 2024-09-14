'use client';

// TODO: fix ssr error
// import { CustomImageEditor } from '@/components/ui/custom-image-editor';
import dynamic from 'next/dynamic';

const CustomImageEditor = dynamic(
  () => import('@/components/ui/custom-image-editor').then(x => x.CustomImageEditor),
  { ssr: false }
);

export default function PaintPage() {
  return <CustomImageEditor />;
}