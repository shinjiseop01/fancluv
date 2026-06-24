/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  output: 'standalone',
  swcMinify: true,
  // 모든 페이지를 동적 렌더링으로 설정
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // 정적 생성 완전 비활성화
  staticPageGenerationTimeout: 0,
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // 빌드 시 정적 생성 스킵
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
