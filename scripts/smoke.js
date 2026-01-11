(async () => {
  const base = 'http://localhost:3000';
  try {
    console.log('Registering user...');
    let res = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password', name: 'Test User' })
    });
    console.log('Register status:', res.status);
    let body = await res.json().catch(() => null);
    console.log(body);

    console.log('Logging in...');
    res = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' })
    });
    console.log('Login status:', res.status);
    body = await res.json();
    console.log(body);

    const token = body.token;
    if (!token) return console.error('No token returned');

    console.log('Creating item...');
    res = await fetch(`${base}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: 'First item', description: 'Created by smoke test' })
    });
    console.log('Create status:', res.status);
    body = await res.json().catch(() => null);
    console.log(body);

    console.log('Fetching items...');
    res = await fetch(`${base}/items`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Get items status:', res.status);
    body = await res.json();
    console.log(body);
  } catch (err) {
    console.error('Smoke test error', err);
  }
})();