import React, {useState} from 'react'
import { supabase } from '../supabaseClient';

const Signup = ({onSignup}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if(!email || !password){
            alert('Please enter both email and password');
            return;
        }

        setLoading(true);
        const { error, data } = await supabase.auth.signUp({email, password});
        setLoading(false);

        if(error){
            console.log('Signup error:', error);

            alert(error.message);
            
        }else{
                    console.log('Signup data:', data);

            onSignup(data.session);
        }

    }
  return (
    <div className='container mt-5' style={{ maxWidth: '400px' }}>
        <h2 className='mb-4 text-center'>Sign Up</h2>


        <div className='mb-3'>
            <label htmlFor="" className='form-label'>Email Address</label>
            <input type="email" className='form-control' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
        </div>

        <div className='mb-4'>
            <label htmlFor="" className='form-label'>Password</label>
            <input type="password" className='form-control' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        </div>

        <button className='btn btn-primary w-100' onClick={handleSignup} disabled={loading}>
            {loading ? (
                <>
                <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>

                Signing up...
                </>
            ): (
                'Sign Up'
            ) }

        </button>
    </div>
  )
}

export default Signup
