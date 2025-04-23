// Mengecek apakah OTP sudah lengkap
export const isOTPComplete = (otp: string[], length: number): boolean => {
    return otp.length === length && otp.every((char) => char.trim() !== '');
};