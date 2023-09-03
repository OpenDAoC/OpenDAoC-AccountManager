import config, { siteFooter } from '@/config';

export default function Footer() {
    return (
      <div className="w-full text-center">
        <p className="text-sm text-gray-500">
            {siteFooter}
        </p>
      </div>
    );
  }
  