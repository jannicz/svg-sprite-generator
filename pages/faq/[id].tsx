import { useRouter } from 'next/router'
import React, { useEffect } from 'react';
import Link from 'next/link';
import faqs from '../../assets/faq.json';

const Faq = () => {
  const router = useRouter();
  const queryId = router.query && router.query.id ? Number(router.query.id) : 0;

  useEffect(() => {
    console.log('FAQ useEffect... router.query.id =>', router.query.id , 'faqEntry =>', faqs[queryId]);
  }, []);

  // FIXME Workaround because no server side data yet
  if (!faqs[queryId]) {
    return <p>empty...</p>;
  }

  const entry: { title: string, content: string } = faqs[queryId];

  return (
    <>
      <h1>FAQ</h1>
      <Link href='/faqs'>
        <a>Back to FAQ List</a>
      </Link>
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
      <pre>FAQ id: {queryId}</pre>
    </>
  )
}

export default Faq;
