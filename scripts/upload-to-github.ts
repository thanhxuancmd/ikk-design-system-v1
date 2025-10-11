import { createGitHubRepo } from '../server/github-upload';

async function main() {
  try {
    console.log('🚀 Tạo GitHub repository...');
    
    const repo = await createGitHubRepo(
      'ikk-design-system-v1',
      'IKK Design System - Complete design system platform for SOOPLIVE with admin management, Vietnamese localization, and pink branding',
      false
    );
    
    console.log('✅ Repository đã được tạo thành công!');
    console.log(`📦 Repository: ${repo.html_url}`);
    console.log(`🔗 Clone URL: ${repo.clone_url}`);
    console.log(`📋 SSH URL: ${repo.ssh_url}`);
    
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
}

main();
