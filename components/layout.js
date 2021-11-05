import Link from 'next/link';

export default function Layout({ children, home }) {
  return (
    <div className="container mx-auto">
      <main>{children}</main>
      {!home && (
        <div className="ml-3">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
