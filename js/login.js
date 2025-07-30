function registerUser(email, senha) {
        fetch('postgresql://login_db_min7_user:cHK1PjUl7MIERiuMJpHcfKjR9oXSQp5u@dpg-d24lvfre5dus73fqhis0-a.oregon-postgres.render.com/login_db_min7', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, senha: userSenha })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    alert('Cadastro feito com sucesso!');
                } else {
                    alert('Erro no cadastro: ' + (data.error || ''));
                }
            });
    }