// Validasi email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validasi password (minimal 8 karakter, ada huruf & angka)
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Validasi nomor telepon Indonesia
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, ''); // hapus spasi
  const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/;
  return phoneRegex.test(cleaned);
}

// Validasi student ID: harus 10 digit angka
export function isValidStudentId(studentId: string): boolean {
  const studentIdRegex = /^\d{10}$/;
  return studentIdRegex.test(studentId);
}

// CancelOrderValidator.ts
// export function canCancelOrder(order: Order, user: User): boolean {
//     if (user.role !== 'kitchen') return false;
//     if (order.status === 'incoming order' || order.status === 'order confirmed') return false;
//     if (order.isCanceled) return false;
  
//     return true;
// }
  

