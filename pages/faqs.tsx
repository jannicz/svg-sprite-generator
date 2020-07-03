import React from 'react';
import Link from 'next/link';
import faqs from '../assets/faq.json';

const Faqs = () => {
  const faqList = Object.values(faqs);

  return (
    <div>
      <h1>FAQ</h1>
      <Link href='/'>
        <a>Back to Index</a>
      </Link>

      <ul>
        {
          faqList.map((e, i) =>
            i > 0 ?
            <li key={i}>
              <Link href='/faq/[i]' as={'/faq/' + i}>
                <a>{e.title}</a>
              </Link>
            </li> : null
          )
        }
      </ul>
    </div>
  );
}

export default Faqs;
