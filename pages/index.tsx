import React from 'react';
import Link from 'next/link';

const Index = () => {
  // const getInitialProps = () => {
  //     const x = 0;
  // }
  console.log('Render Index.tsx');

  return (
    <div>
      <h1>Hello Next.js</h1>
      <Link href='/faqs'>
        <a>FAQ pages</a>
      </Link>
    </div>
  )
}

export default Index;
