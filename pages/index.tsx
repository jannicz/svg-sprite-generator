import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index = () => {
  console.log('Render Index.tsx');
  const router = useRouter();

  return (
    <div>
      <h1>SVG Sprite Generator</h1>
      <h2>Simply create a SVG symbols file by dropping your icons here</h2>
      <Link href='/faqs'>
        <a>FAQ pages</a>
      </Link>
    </div>
  )
}

export default Index;
