import fs from 'fs';

console.log('🐾 Panther Budget Buddy - Setup\n');

// Check if .env.local exists
if (fs.existsSync('.env.local')) {
  console.log('.env.local already exists!\n');
  console.log('Run: npm install');
  console.log('Then: npm run dev\n');
} else {
  // Create .env.local from template
  const envTemplate = `# Supabase Configuration
# Get these from: https://supabase.com/dashboard → Settings → API

VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
`;

  fs.writeFileSync('.env.local', envTemplate);
  
  console.log('Created .env.local\n');
  console.log('Next steps:');
  console.log('1. Open .env.local');
  console.log('2. Add your Supabase credentials');
  console.log('   (Get them from: https://supabase.com/dashboard)');
  console.log('3. Run: npm install');
  console.log('4. Run: npm run dev\n');
}