class AuthService {
  async signUp(signUpDto: SignUpRequest): Promise<GetUserResponse> {
    return new Promise((resolve, reject) => resolve(new GetUserResponse()));
  }
}
