'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      setError('signupEmail', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
    } else if (!emailPattern.test(email)) {
      setError('signupEmail', {
        type: 'pattern',
        message: '이메일 형식이 아닙니다.',
      });
    } else {
      clearErrors('signupEmail');
    }
  };

  const validatePassword = (pw: string) => {
    if (!pw) {
      setError('signupPassword', {
        type: 'required',
        message: '비밀번호를 입력해주세요.',
      });
    } else if (8 <= pw.length && pw.length <= 20) {
      clearErrors('signupPassword');
    } else if (pw.length > 20) {
      setError('signupPassword', {
        type: 'maxLength',
        message: '최대 20자까지 입력가능합니다.',
      });
    } else {
      setError('signupPassword', {
        type: 'minLength',
        message: '최소 8자 이상 입력해주세요.',
      });
    }
  };

  const comparePassword = (pw: string) => {
    if (!pw) {
      setError('checkPassword', {
        type: 'required',
        message: '비밀번호를 입력해주세요.',
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

  switch (owner) {
    case 'login':
      return (
        <form className='flex flex-col'>
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
            <button className='button filled'>로그인</button>
            <Link href='/signup'>
              <button className='button'>회원가입</button>
            </Link>
          </div>
        </form>
      );
    case 'signup':
      return (
        <form className='flex flex-col'>
          <label htmlFor='signUpEmail'>이메일</label>
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
          {errors.signupEmail && (
            <p className='orange'>{errors.signupEmail.message}</p>
          )}

          <label htmlFor='signupPassword'>비밀번호</label>
          {/* todo : 비밀번호 특수문자 및 필수 조합 필요 */}
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
          {errors.signupPassword && (
            <p className='orange'>{errors.signupPassword.message}</p>
          )}

          <label htmlFor='checkPassword'>비밀번호 확인</label>
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
                placeholder='비밀번호 확인'
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
          {errors.checkPassword && (
            <p className='orange'>{errors.checkPassword.message}</p>
          )}

          <label htmlFor='name'>별명</label>
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
          {errors.name && <p className='orange'>{errors.name.message}</p>}

          <div>
            <button className='button filled'>완료</button>
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
