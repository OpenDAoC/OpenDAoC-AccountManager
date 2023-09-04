import getConfig from 'next/config'

export default function Footer() {
    const { publicRuntimeConfig } = getConfig()
    return (
      <div className="w-full text-center">
        <p className="text-sm text-gray-500">
            {publicRuntimeConfig.siteFooter}
        </p>
      </div>
    );
  }
  