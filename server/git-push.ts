import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ConnectionSettings {
  settings: {
    access_token?: string;
    oauth?: {
      credentials?: {
        access_token?: string;
      };
    };
    expires_at?: string;
  };
}

let connectionSettings: ConnectionSettings | null = null;

async function getAccessToken(): Promise<string> {
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
  connectionSettings = data.items?.[0] as ConnectionSettings;

  const accessToken = connectionSettings?.settings?.access_token || 
                      connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  
  return accessToken;
}

export async function pushToGitHub(commitMessage: string = 'Update code'): Promise<{ success: boolean; message: string }> {
  try {
    // Get GitHub access token
    const token = await getAccessToken();
    
    // Get git remote URL
    const { stdout: remoteUrl } = await execAsync('git remote get-url origin');
    const cleanUrl = remoteUrl.trim();
    
    // Parse the URL to inject the token
    const urlMatch = cleanUrl.match(/https:\/\/github\.com\/(.+)/);
    if (!urlMatch) {
      throw new Error('Invalid GitHub remote URL');
    }
    
    const repoPath = urlMatch[1];
    const authenticatedUrl = `https://${token}@github.com/${repoPath}`;
    
    // Check if there are changes to commit
    const { stdout: status } = await execAsync('git status --porcelain');
    
    if (status.trim()) {
      // Add all changes
      await execAsync('git add -A');
      
      // Commit changes
      await execAsync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
      console.log('✅ Changes committed');
    } else {
      console.log('ℹ️  No changes to commit');
    }
    
    // Push to GitHub using the authenticated URL
    await execAsync(`git push ${authenticatedUrl} main`, { 
      timeout: 30000,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0' // Disable password prompts
      }
    });
    
    console.log('✅ Pushed to GitHub successfully');
    
    return {
      success: true,
      message: 'Successfully pushed to GitHub'
    };
    
  } catch (error: any) {
    console.error('❌ Git push failed:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to push to GitHub'
    };
  }
}
