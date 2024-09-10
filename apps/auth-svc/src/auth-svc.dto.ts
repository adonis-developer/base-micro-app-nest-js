import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email là bắt buộc.' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#]{8,}$/,
    {
      message:
        'Mật khẩu phải bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt và nhiều hơn 8 kí tự.',
    },
  )
  password: string;
}
