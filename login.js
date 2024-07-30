document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5678/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la connexion');
        }
  
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
  
        window.location.href = 'index.html';
    } catch (error) {
        alert('Erreur lors de la connexion, veuillez réessayer : ' + error.message);
    }
  });