import fetch from 'node-fetch';

const testEmails = [
  'test1@example.com',
  'test2@example.com',
  'test3@example.com'
];

async function testSignup(email: string) {
  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, formType: 'waitlist' })
    });

    const data = await response.json();
    console.log(`Signup test for ${email}:`, data);
    return data;
  } catch (error) {
    console.error(`Error testing signup for ${email}:`, error);
    return null;
  }
}

async function runTests() {
  console.log('Starting signup tests...\n');
  
  for (const email of testEmails) {
    console.log(`Testing signup for: ${email}`);
    await testSignup(email);
    // Add a small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('-------------------\n');
  }
  
  console.log('All signup tests completed!');
}

// Make sure the development server is running before executing tests
console.log('Make sure your Next.js development server is running on http://localhost:3000\n');
runTests();
