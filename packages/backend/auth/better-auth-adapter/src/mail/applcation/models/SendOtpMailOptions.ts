export interface SendOtpMailOptions {
  email: string;
  otp: string;
  type: 'sign-in' | 'email-verification' | 'forget-password';
}
