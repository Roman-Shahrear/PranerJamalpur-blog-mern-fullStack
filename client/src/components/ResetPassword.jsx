import { useState } from 'react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch(`http://localhost:5173/api/auth/resetpassword/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      console.log(response.status, response.statusText);

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
