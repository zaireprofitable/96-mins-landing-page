async function resendWelcome() {
  try {
    const response = await fetch('http://localhost:3000/api/resend-welcome', {
      method: 'POST'
    });
    
    const data = await response.json();
    console.log('Resend results:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

resendWelcome();
