'use client';

import { signUp } from '@/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type Inputs = {
  loginEmail: string;
  loginPassword: string;
  signupEmail: string;
  signupPassword: string;
  checkPassword: string;
  name: string;
};

export default function InputForm({ owner }: InputFormProps) {
  const [inputData, setInputData] = useState({
    loginEmail: '',
    loginPassword: '',
    signupEmail: '',
    signupPassword: '',
    checkPassword: '',
    name: '',
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setInputData({ ...inputData, [name]: value });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setError('signupEmail', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
    } else if (!emailPattern.test(email)) {
      setError('signupEmail', {
        type: 'pattern',
        message: '올바른 이메일 형식이 아닙니다.',
      });
    } else {
      clearErrors('signupEmail');
    }
  };

  const validatePassword = (pw: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;
    if (!pw) {
      setError('signupPassword', {
        type: 'required',
        message: '비밀번호를 입력해주세요.',
      });
    } else if (pw.length > 20) {
      setError('signupPassword', {
        type: 'maxLength',
        message: '최대 20자까지 입력가능합니다.',
      });
    } else if (pw.length < 8) {
      setError('signupPassword', {
        type: 'minLength',
        message: '최소 8자 이상 입력해주세요.',
      });
    } else if (!passwordPattern.test(pw)) {
      setError('signupPassword', {
        type: 'pattern',
        message: '영문자/숫자를 조합해주세요.',
      });
    } else {
      clearErrors('signupPassword');
    }
  };

  const comparePassword = (pw: string) => {
    if (!pw) {
      setError('checkPassword', {
        type: 'required',
        message: '비밀번호를 재입력해주세요.',
      });
    } else if (pw !== inputData.signupPassword) {
      setError('checkPassword', {
        type: 'compare',
        message: '비밀번호가 다릅니다.',
      });
    } else {
      clearErrors('checkPassword');
    }
  };

  const validateName = (name: string) => {
    if (name.length > 10) {
      setError('name', {
        type: 'maxLength',
        message: '최대 10자까지 입력가능합니다.',
      });
    } else {
      clearErrors('name');
    }
  };

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!inputData.loginEmail) {
      return alert('이메일을 입력해주세요.');
    }
    if (!inputData.loginPassword) {
      return alert('비밀번호를 입력해주세요.');
    }
    console.log('로그인');
  };

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (errors.signupEmail?.message || !inputData.signupEmail) {
      return alert('이메일을 확인해주세요.');
    }
    if (errors.signupPassword?.message || !inputData.signupPassword) {
      return alert('비밀번호를 확인해주세요.');
    }
    if (errors.checkPassword?.message || !inputData.checkPassword) {
      return alert('비밀번호 재입력을 확인해주세요.');
    }
    const { signupEmail, signupPassword, name } = inputData;
    const data = await signUp(signupEmail, signupPassword, name);
    // todo : 중간중간 에러 발생했을때(이미 존재하는 이메일 등) 페이지 이동 안하고 예외처리 필요
    router.push('/login');
  };

  switch (owner) {
    case 'login':
      return (
        <form className='flex flex-col' onSubmit={onLogin}>
          <input
            type='text'
            name='loginEmail'
            placeholder='이메일'
            className={inputData.loginEmail ? 'border-solid' : 'border-dashed'}
            value={inputData.loginEmail}
            onChange={handleChange}
          />
          <input
            type='password'
            name='loginPassword'
            placeholder='비밀번호'
            className={
              inputData.loginPassword ? 'border-solid' : 'border-dashed'
            }
            value={inputData.loginPassword}
            onChange={handleChange}
          />
          <div>
            <button className='button filled' type='submit'>
              로그인
            </button>
            <Link href='/signup'>
              <button className='button'>회원가입</button>
            </Link>
          </div>
        </form>
      );
    case 'signup':
      return (
        <form className='flex flex-col' onSubmit={onSignup}>
          <label htmlFor='signUpEmail'>
            이메일 <span className='orange font-bold'>*</span>
          </label>
          <Controller
            name='signupEmail'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                type='text'
                id='signupEmail'
                placeholder='이메일'
                className={
                  inputData.signupEmail ? 'border-solid' : 'border-dashed'
                }
                {...field}
                value={inputData.signupEmail}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(e);
                  validateEmail(e.target.value);
                }}
              />
            )}
          />
          <p className='orange h-4'>
            {errors.signupEmail ? errors.signupEmail.message : ' '}
          </p>

          <label htmlFor='signupPassword' className='mt-2'>
            비밀번호<span className='orange font-bold'>*</span>
          </label>
          <Controller
            name='signupPassword'
            control={control}
            defaultValue=''
            rules={{
              required: '비밀번호를 입력해주세요.',
              minLength: { value: 8, message: '최소 8자 이상 입력해주세요.' },
              maxLength: {
                value: 20,
                message: '최대 20자까지 입력가능합니다.',
              },
            }}
            render={({ field }) => (
              <input
                type='password'
                id='signupPassword'
                placeholder='비밀번호'
                className={
                  inputData.signupPassword ? 'border-solid' : 'border-dashed'
                }
                {...field}
                value={inputData.signupPassword}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(e);
                  validatePassword(e.target.value);
                }}
              />
            )}
          />
          <p className='orange h-4'>
            {errors.signupPassword ? errors.signupPassword.message : ' '}
          </p>

          <label htmlFor='checkPassword' className='mt-2'>
            비밀번호 재입력<span className='orange font-bold'>*</span>
          </label>
          <Controller
            name='checkPassword'
            control={control}
            defaultValue=''
            rules={{
              required: '비밀번호을 재입력해주세요.',
              minLength: { value: 8, message: '최소 8자 이상 입력해주세요.' },
              maxLength: {
                value: 20,
                message: '최대 20자까지 입력가능합니다.',
              },
              validate: {
                compare: (checkpw) =>
                  checkpw === inputData.signupPassword ||
                  '비밀번호가 다릅니다.',
              },
            }}
            render={({ field }) => (
              <input
                type='password'
                id='checkPassword'
                placeholder='비밀번호 재입력'
                className={
                  inputData.checkPassword ? 'border-solid' : 'border-dashed'
                }
                {...field}
                value={inputData.checkPassword}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(e);
                  comparePassword(e.target.value);
                }}
              />
            )}
          />
          <p className='orange h-4'>
            {errors.checkPassword ? errors.checkPassword.message : ' '}
          </p>

          <label htmlFor='name' className='mt-2'>
            필명
          </label>
          {/* todo : 사용자 이름 랜덤 텍스트 생성 후 플레이스 홀더로 넣기*/}
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                type='text'
                id='name'
                placeholder='사용자 이름'
                className={inputData.name ? 'border-solid' : 'border-dashed'}
                {...field}
                value={inputData.name}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(e);
                  validateName(e.target.value);
                }}
              />
            )}
          />
          <p className='orange h-4'>
            {errors.name ? errors.name.message : ' '}
            {!inputData.name &&
              '필명을 입력하지 않을 시 임의의 필명으로 설정됩니다.'}
          </p>

          <div>
            <button className='button filled' type='submit'>
              완료
            </button>
            <Link href='/login'>
              <button className='button'>취소</button>
            </Link>
          </div>
        </form>
      );
    default:
      return;
  }
}

interface InputFormProps {
  owner: 'login' | 'signup';
}
