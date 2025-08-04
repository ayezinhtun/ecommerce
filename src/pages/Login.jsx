import React, {useState} from 'react'
import { supabase } from '../supabaseClient';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if(!email || !password){
            alert('Please enter both email and password');
            return;
        }

        setLoading(true);
        const { error, data } = await supabase.auth.signInWithPassword({email, password});
        setLoading(false);

        if(error){
            alert(error.message);
        }else{
            onLogin(data.session);
        }
    }
  return (
    <div className='container mt-5' style={{ maxWidth: '400px' }}>
        <h2 className='mb-4 text-center'>Login</h2>


        <div className='mb-3'>
            <label htmlFor="" className='form-label'>Email Address</label>
            <input type="email" className='form-control' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
        </div>

        <div className='mb-4'>
            <label htmlFor="" className='form-label'>Password</label>
            <input type="password" className='form-control' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        </div>

        <button className='btn btn-primary w-100' onClick={handleLogin} disabled={loading}>
            {loading ? (
                <>
                <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>

                Logging in...
                </>
            ): (
                'Login'
            ) }

        </button>
    </div>
  )
}

export default Login
