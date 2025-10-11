#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

let connectionSettings = null;

async function getAccessToken() {
  // Check if we have a valid cached token
  if (connectionSettings && 
      connectionSettings.settings.expires_at && 
      new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    const token = connectionSettings.settings.access_token || 
                  connectionSettings.settings.oauth?.credentials?.access_token;
    if (token) return token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );

  const data = await response.json();
  connectionSettings = data.items?.[0];

  const accessToken = connectionSettings?.settings?.access_token || 
                      connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  
  return accessToken;
}

async function pushToGitHub() {
  try {
    const commitMessage = process.argv[2] || 'Update code';
    
    console.log('🔐 Getting GitHub access token...');
    const token = await getAccessToken();
    
    console.log('📡 Getting git remote URL...');
    const { stdout: remoteUrl } = await execAsync('git remote get-url origin');
    const cleanUrl = remoteUrl.trim();
    
    const urlMatch = cleanUrl.match(/https:\/\/github\.com\/(.+)/);
    if (!urlMatch) {
      throw new Error('Invalid GitHub remote URL');
    }
    
    const repoPath = urlMatch[1];
    const authenticatedUrl = `https://${token}@github.com/${repoPath}`;
    
    console.log('📝 Checking for changes...');
    const { stdout: status } = await execAsync('git status --porcelain');
    
    if (status.trim()) {
      console.log('➕ Adding changes...');
      await execAsync('git add -A');
      
      console.log('💾 Committing changes...');
      await execAsync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
      console.log('✅ Changes committed');
    } else {
      console.log('ℹ️  No changes to commit');
    }
    
    console.log('🚀 Pushing to GitHub...');
    await execAsync(`git push ${authenticatedUrl} main`, { 
      timeout: 30000,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0'
      }
    });
    
    console.log('✅ Successfully pushed to GitHub!');
    console.log(`📦 Repository: https://github.com/${repoPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

pushToGitHub();
